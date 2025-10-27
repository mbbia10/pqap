import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function BegeScreen() {
  // Mago flutuante
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Criar refs para 15 ícones
  const iconAnims = Array.from({ length: 15 }, () => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    // Mago flutuante
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 10, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Ícones flutuando de forma independente
    iconAnims.forEach(anim => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -20 + Math.random() * 10,
            duration: 2500 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 20 + Math.random() * 10,
            duration: 2500 + Math.random() * 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  // Posições e cores dos 15 ícones
  const icons = [
    { name: 'code-slash', color: '#ff6f61', top: 50, left: 30 },
    { name: 'rocket', color: '#6a5acd', top: 100, left: width - 60 },
    { name: 'laptop', color: '#ffa500', top: height / 2 - 100, left: 50 },
    { name: 'bug', color: '#ff4500', top: 200, left: width / 2 - 20 },
    { name: 'chatbubble-ellipses', color: '#20b2aa', top: 300, left: width - 80 },
    { name: 'star', color: '#ffd700', top: 150, left: width / 3 },
    { name: 'desktop', color: '#7fffd4', top: 250, left: width / 4 },
    { name: 'globe', color: '#1e90ff', top: 400, left: width / 2 + 30 },
    { name: 'game-controller', color: '#ff1493', top: 100, left: width / 2 + 40 },
    { name: 'analytics', color: '#00ffff', top: 220, left: width - 100 },
    { name: 'git-branch', color: '#ff6347', top: 350, left: 40 },
    { name: 'server', color: '#9400d3', top: 180, left: width - 60 },
    { name: 'rocket-outline', color: '#1e90ff', top: 60, left: width / 2 },
    { name: 'hammer', color: '#ff8c00', top: 280, left: width / 3 },
    { name: 'planet', color: '#32cd32', top: 420, left: width - 120 },
  ];

  return (
    <LinearGradient
      colors={['#042346ff', '#604060']} // fundo bege escuro com roxo
      style={styles.container}
    >
      {/* Ícones animados */}
      {icons.map((icon, index) => (
        <Animated.View
          key={index}
          style={[
            styles.icon,
            {
              top: icon.top,
              left: icon.left,
              transform: [{ translateY: iconAnims[index] }],
            },
          ]}
        >
          <Ionicons name={icon.name} size={30} color={icon.color} />
        </Animated.View>
      ))}

      {/* Caixa central do texto */}
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Programação é o processo de criar instruções para que os computadores executem tarefas. 
          Hoje, é essencial para criar tecnologias, aplicativos, jogos, inteligência artificial e automação. 
          Com programação, transformamos ideias em soluções digitais, resolvemos problemas complexos e impulsionamos 
          a inovação na sociedade.
        </Text>
      </View>

      {/* Mago flutuante */}
      <Animated.Image
        source={require('../../assets/wizard.png')}
        style={[styles.wizard, { transform: [{ translateY: floatAnim }] }]}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textBox: {
    backgroundColor: 'rgba(255, 241, 214, 0.9)',
    padding: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
    marginVertical: 20,
    width: '90%',
    zIndex: 1, // garante que a caixa fique acima do fundo, mas ícones podem passar por cima
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 22,
  },
  wizard: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginTop: 20,
    zIndex: 2, // mago acima da caixa
  },
  icon: {
    position: 'absolute',
    zIndex: 0, // ícones ficam atrás do mago, podem passar parcialmente pela caixa
  },
});
