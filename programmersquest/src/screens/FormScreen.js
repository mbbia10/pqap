// src/screens/FormScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function FormScreen({ navigation }) {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [stars] = useState(Array(20).fill(0));

  // Animação de pulso contínua no título
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handlePressIn = (buttonType) => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const renderStars = () => {
    return stars.map((_, index) => {
      const left = Math.random() * width;
      const top = Math.random() * height;
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.6 + 0.2;
      
      return (
        <View
          key={index}
          style={[
            styles.star,
            {
              left,
              top,
              width: size,
              height: size,
              opacity,
            },
          ]}
        />
      );
    });
  };

  return (
    <LinearGradient 
      colors={['#0f0c29', '#1a1a2e', '#16213e']} 
      style={styles.container}
    >
      {/* Estrelas de fundo */}
      {renderStars()}
      
      {/* Elementos decorativos */}
      <View style={styles.decorationCircle1} />
      <View style={styles.decorationCircle2} />
      <View style={styles.decorationCircle3} />

      <Animated.View style={[
        styles.content,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        {/* Logo/Título animado */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Text style={styles.emoji}>🌟</Text>
        </Animated.View>
        
        <Text style={styles.title}>Bem-vindo à</Text>
        <Text style={styles.appName}>Aventura Mágica</Text>
        
        <Text style={styles.subtitle}>
          Descubra um mundo de diversão{'\n'}e desafios incríveis!
        </Text>

        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('LoginScreen')}
              onPressIn={() => handlePressIn('login')}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#5b3d81ff', '#212c6dff']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.emojiButton}></Text>
                <Text style={styles.buttonText}>Entrar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={[styles.button, styles.signupButton]}
            onPress={() => navigation.navigate('SignupScreen')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1a8079ff', '#3e93b4ff']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.emojiButton}></Text>
              <Text style={styles.buttonText}>Começar Agora</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🎮</Text>
            <Text style={styles.featureText}>Jogos Divertidos</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🏆</Text>
            <Text style={styles.featureText}>Desafios</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>⭐</Text>
            <Text style={styles.featureText}>Conquistas</Text>
          </View>
        </View>
      </Animated.View>

      {/* Footer animado */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>
          Sua aventura épica começa aqui! 🚀
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20
  },
  star: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  decorationCircle1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  decorationCircle3: {
    position: 'absolute',
    top: '30%',
    left: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '300',
    letterSpacing: 1,
  },
  appName: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 2,
  },
  subtitle: {
    color: '#d8b4fe',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '400',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    width: 280,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emojiButton: {
    fontSize: 20,
    marginRight: 10,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700', 
    letterSpacing: 0.5
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  featureText: {
    color: '#c4b5fd',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center'
  },
  footerText: {
    color: '#a5b4fc',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500'
  }
});