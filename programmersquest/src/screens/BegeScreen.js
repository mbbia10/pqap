import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Pressable,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function BegeScreen() {
  // Mago flutuante
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Ícones com posições e cores
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
    { name: 'football', color: '#ff4500', top: height - 180, left: 30 },
    { name: 'cloud', color: '#87cefa', top: height - 160, left: width / 4 },
    { name: 'sunny', color: '#ffd700', top: height - 140, left: width / 2 - 20 },
    { name: 'moon', color: '#dda0dd', top: height - 160, left: width / 2 + 50 },
    { name: 'rainy', color: '#00ced1', top: height - 120, left: width - 60 },
    { name: 'flower', color: '#ff69b4', top: height - 140, left: width / 3 },
    { name: 'paw', color: '#8b4513', top: height - 100, left: width / 2 - 50 },
    { name: 'leaf', color: '#32cd32', top: height - 90, left: width / 2 + 30 },
    { name: 'flash', color: '#ffeb3b', top: height - 150, left: width - 100 },
    { name: 'heart', color: '#ff1493', top: height - 130, left: width - 40 },
    { name: 'happy', color: '#ffa500', top: height - 110, left: width / 5 },
  ];

  // Animated.Values para cada ícone (mesmo tamanho do array icons)
  const iconAnims = useRef(icons.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animação do mago
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 10, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Animação de todos os ícones
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

  return (
    <LinearGradient
      colors={['#042346ff', '#604060']} // fundo degradê escuro
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

        {/* Botão Saiba Mais */}
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL('https://pt.wikipedia.org/wiki/Programação')}
        >
          <Text style={styles.buttonText}>Saiba Mais</Text>
        </Pressable>
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
    zIndex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 22,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#6a5acd',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wizard: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginTop: 20,
    zIndex: 2,
  },
  icon: {
    position: 'absolute',
    zIndex: 0,
  },
});
