// src/screens/LoginScreen.js
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

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async () => {
    if (!username || !password) {
      shake();
      return Alert.alert('Ops! 😅', 'Preencha todos os campos para continuar');
    }

    setIsLoading(true);
    animateButton();

    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !user) {
        shake();
        Alert.alert('Oops! 🔐', 'Usuário ou senha incorretos. Tente novamente!');
        return;
      }

      // Sucesso - navegar para Menu
      navigation.navigate('Menu', { user });

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
          
          {/* Header com emoji reduzido */}
          <Animated.View style={[
            styles.header,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}>
            <Text style={styles.emoji}></Text>
            <Text style={styles.title}>Bem-vindo de Volta!</Text>
            <Text style={styles.subtitle}>
              Que bom te ver novamente!
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
              <Text style={styles.inputLabel}>👤 Usuário</Text>
              <TextInput 
                style={styles.input}
                placeholder="Digite seu usuário..."
                placeholderTextColor="#94a3b8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Input Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>🔒 Senha</Text>
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

            {/* Botão de Login menor */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity 
                style={[
                  styles.button,
                  isLoading && styles.buttonDisabled
                ]}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isLoading ? ['#94a3b8', '#64748b'] : ['#7664daff', '#527ceeff']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {isLoading ? (
                    <Text style={styles.buttonText}>🔄 Entrando...</Text>
                  ) : (
                    <Text style={styles.buttonText}> Entrar</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Link para Cadastro */}
            <TouchableOpacity 
              style={styles.linkContainer}
              onPress={() => navigation.navigate('SignupScreen')}
            >
              <Text style={styles.linkText}>
                Não tem conta? <Text style={styles.linkBold}>Criar agora</Text>
              </Text>
            </TouchableOpacity>

          </Animated.View>

          {/* Footer menor */}
          <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
            <Text style={styles.footerText}>
              Sua jornada espera! ⚔️
            </Text>
          </Animated.View>

        </KeyboardAvoidingView>

        {/* Elementos decorativos menores */}
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
    marginBottom: 30, // Reduzido
  },
  emoji: {
    fontSize: 40, // Reduzido (era 50)
    marginBottom: 12, // Reduzido
  },
  title: { 
    color: '#fff', 
    fontSize: 24, // Reduzido (era 28)
    fontWeight: 'bold', 
    marginBottom: 8, // Reduzido
    textAlign: 'center'
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 14, // Reduzido (era 16)
    textAlign: 'center',
    lineHeight: 20, // Reduzido
  },
  formContainer: {
    width: '100%',
    maxWidth: 350, // Reduzido
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16, // Reduzido
  },
  inputLabel: {
    color: '#e2e8f0',
    fontSize: 13, // Reduzido
    fontWeight: '600',
    marginBottom: 6, // Reduzido
    marginLeft: 4, // Reduzido
  },
  input: { 
    width: '100%', 
    padding: 14, // Reduzido (era 18)
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1.5, // Reduzido
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12, // Reduzido
    color: '#fff',
    fontSize: 15, // Reduzido
    fontWeight: '500',
  },
  button: {
    width: '60%', // Reduzido (era 100%)
    borderRadius: 16, // Reduzido
    marginTop: 8, // Reduzido
    shadowColor: '#ff6b6b',
    shadowOffset: {
      width: 0,
      height: 6, // Reduzido
    },
    shadowOpacity: 0.25, // Reduzido
    shadowRadius: 8, // Reduzido
    elevation: 6, // Reduzido
  },
  buttonDisabled: {
    shadowColor: '#64748b',
  },
  gradientButton: {
    paddingVertical: 14, // Reduzido (era 18)
    paddingHorizontal: 25, // Reduzido
    borderRadius: 16, // Reduzido
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, // Reduzido (era 18)
    fontWeight: '700',
    letterSpacing: 0.3, // Reduzido
  },
  linkContainer: {
    marginTop: 20, // Reduzido
    padding: 8, // Reduzido
  },
  linkText: {
    color: '#cbd5e1',
    fontSize: 14, // Reduzido
    textAlign: 'center',
  },
  linkBold: {
    color: '#4ecdc4',
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 30, // Reduzido
    alignItems: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 12, // Reduzido
    textAlign: 'center',
    fontStyle: 'italic',
  },
  decorationCircle1: {
    position: 'absolute',
    top: -40, // Reduzido
    right: -40, // Reduzido
    width: 120, // Reduzido
    height: 120, // Reduzido
    borderRadius: 60, // Reduzido
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -25, // Reduzido
    left: -25, // Reduzido
    width: 80, // Reduzido
    height: 80, // Reduzido
    borderRadius: 40, // Reduzido
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
});