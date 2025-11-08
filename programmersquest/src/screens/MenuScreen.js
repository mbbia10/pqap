import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function MenuScreen({ navigation, route }) {
  const user = route?.params?.user ?? null;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Animação de flutuação do mago
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [floatAnim]);

  const buttons = [
    {
      title: 'O que é programação e por que ela é importante',
      colors: ['#667eea', '#764ba2'],
      icon: 'code-slash',
      screen: 'Bege',
      emoji: '💻'
    },
    {
      title: 'Gamificação e jogos educacionais',
      colors: ['#11998e', '#38ef7d'],
      icon: 'game-controller',
      screen: 'Verde',
      emoji: '🎮'
    },
    {
      title: 'Teoria da Aprendizagem',
      colors: ['#f5576c', '#f093fb'],
      icon: 'flame',
      screen: 'Marrom',
      emoji: '📚'
    },
  ];

  const handleNavigation = (btn) => {
    if (btn.screen === 'Verde') {
      navigation.navigate(btn.screen, { user });
    } else {
      navigation.navigate(btn.screen);
    }
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      {/* Elementos decorativos */}
      <View style={styles.decorationCircle1} />
      <View style={styles.decorationCircle2} />
      
      {/* Header com boas-vindas */}
      <Animated.View style={[
        styles.header,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <Text style={styles.welcomeText}>
          {user ? `Bem-vindo, ${user.username}!` : 'Bem-vindo!'}
        </Text>
        <Text style={styles.subtitle}>Escolha sua jornada de aprendizado</Text>
      </Animated.View>

      {/* Mago animado - USANDO A IMAGEM ORIGINAL */}
      <Animated.Image
        source={require('../../assets/wizard.png')}
        style={[
          styles.wizard,
          { transform: [{ translateY: floatAnim }] }
        ]}
      />

      {/* Cards animados */}
      <Animated.View style={[
        styles.cardsContainer,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        {buttons.map((btn, index) => (
          <Animated.View
            key={index}
            style={[
              styles.cardWrapper,
              {
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  })
                }]
              }
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.card,
                { 
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  shadowOpacity: pressed ? 0.3 : 0.5,
                },
              ]}
              onPress={() => handleNavigation(btn)}
            >
              <LinearGradient
                colors={btn.colors}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={btn.icon} size={28} color="#fff" />
                    <Text style={styles.emoji}>{btn.emoji}</Text>
                  </View>
                  <Text style={styles.text}>{btn.title}</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        ))}
      </Animated.View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>
          Sua aventura no conhecimento começa aqui! 🌟
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  decorationCircle1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(247, 87, 108, 0.1)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
  },
  wizard: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  card: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    borderRadius: 20,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  emoji: {
    fontSize: 20,
    marginLeft: 5,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});