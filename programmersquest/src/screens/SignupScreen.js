// src/screens/SignupScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Animated, 
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../supabase';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Animações
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [shakeAnim] = useState(new Animated.Value(0));
  const [buttonScale] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const handleSignup = async () => {
    if (!username || !password || !confirm) {
      shake();
      return Alert.alert('Ops! 😅', 'Preencha todos os campos para continuar');
    }

    if (password !== confirm) {
      shake();
      return Alert.alert('Atenção! 🔒', 'As senhas não coincidem. Tente novamente!');
    }

    if (password.length < 4) {
      shake();
      return Alert.alert('Senha Fraca! 💪', 'Use pelo menos 4 caracteres para sua senha.');
    }

    setIsLoading(true);
    animateButton();

    try {
      // Verificar se usuário já existe
      const { data: existing } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (existing) {
        shake();
        Alert.alert('Usuário Indisponível! 😢', 'Este nome de usuário já está em uso. Tente outro!');
        return;
      }

      // Criar novo usuário
      const { data, error } = await supabase
        .from('users')
        .insert([{ username, password }]);

      if (error) {
        Alert.alert('Erro! 😵', 'Não foi possível criar sua conta. Tente novamente!');
        return;
      }

      // Sucesso!
      Alert.alert(
        'Parabéns! 🎉', 
        'Sua conta foi criada com sucesso! Agora faça login para começar sua aventura.',
        [
          {
            text: 'Fazer Login',
            onPress: () => navigation.navigate('LoginScreen')
          }
        ]
      );

    } catch (error) {
      Alert.alert('Erro', 'Algo deu errado. Tente novamente!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient 
        colors={['#0f0c29', '#1a1a2e', '#16213e']} 
        style={styles.container}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          
          {/* Header */}
          <Animated.View style={[
            styles.header,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}>
            <Text style={styles.emoji}></Text>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>
              Junte-se à nossa aventura!{'\n'}
              Crie sua conta em segundos
            </Text>
          </Animated.View>

          {/* Formulário */}
          <Animated.View style={[
            styles.formContainer,
            { 
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { translateX: shakeAnim }
              ]
            }
          ]}>
            
            {/* Input Usuário */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}> Escolha um Usuário</Text>
              <TextInput 
                style={styles.input}
                placeholder="Digite seu nome de usuário..."
                placeholderTextColor="#94a3b8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Input Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}> Crie uma Senha</Text>
              <TextInput 
                style={styles.input}
                placeholder="Digite sua senha..."
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            {/* Input Confirmar Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirme sua Senha</Text>
              <TextInput 
                style={styles.input}
                placeholder="Digite a senha novamente..."
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
                autoCapitalize="none"
              />
            </View>

            {/* Botão de Cadastro - MENOR e SEM EMOJI */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity 
                style={[
                  styles.button,
                  isLoading && styles.buttonDisabled
                ]}
                onPress={handleSignup}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isLoading ? ['#94a3b8', '#64748b'] : ['#4ecdc4', '#44a08d']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {isLoading ? (
                    <Text style={styles.buttonText}>Criando Conta...</Text>
                  ) : (
                    <Text style={styles.buttonText}>Cadastrar</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Link para Login */}
            <TouchableOpacity 
              style={styles.linkContainer}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.linkText}>
                Já tem uma conta? <Text style={styles.linkBold}>Fazer Login</Text>
              </Text>
            </TouchableOpacity>

          </Animated.View>

          {/* Dicas de segurança */}
          <Animated.View style={[styles.tips, { opacity: fadeAnim }]}>
            <Text style={styles.tipsTitle}>💡 Dicas Rápidas:</Text>
            <Text style={styles.tipsText}>• Use pelo menos 4 caracteres</Text>
            <Text style={styles.tipsText}>• Escolha um nome único</Text>
            <Text style={styles.tipsText}>• Anote sua senha em local seguro</Text>
          </Animated.View>

        </KeyboardAvoidingView>

        {/* Elementos decorativos */}
        <View style={styles.decorationCircle1} />
        <View style={styles.decorationCircle2} />
        
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: { 
    width: '100%', 
    padding: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  button: {
    width: '50%', // MENOR - era 60%
    borderRadius: 14, // MENOR
    marginTop: 8,
    shadowColor: '#4ecdc4',
    shadowOffset: {
      width: 0,
      height: 4, // MENOR
    },
    shadowOpacity: 0.2, // MENOR
    shadowRadius: 6, // MENOR
    elevation: 4, // MENOR
  },
  buttonDisabled: {
    shadowColor: '#64748b',
  },
  gradientButton: {
    paddingVertical: 12, // MENOR - era 14
    paddingHorizontal: 20, // MENOR
    borderRadius: 14, // MENOR
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 15, // MENOR - era 16
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  linkContainer: {
    marginTop: 20,
    padding: 8,
  },
  linkText: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
  },
  linkBold: {
    color: '#ff6b6b',
    fontWeight: '700',
  },
  tips: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    width: '100%',
    maxWidth: 350,
  },
  tipsTitle: {
    color: '#4ecdc4',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  tipsText: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 4,
  },
  decorationCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -25,
    left: -25,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
});