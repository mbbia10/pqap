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

export default function MarromScreen() {
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Ícones animados
  const icons = [
    { name: 'school', color: '#d2691e', top: 50, left: 30 },
    { name: 'book', color: '#8b4513', top: 100, left: width - 60 },
    { name: 'trophy', color: '#ffd700', top: 200, left: 50 },
    { name: 'rocket', color: '#6a5acd', top: 150, left: width / 2 },
    { name: 'code-slash', color: '#ff6f61', top: 250, left: width / 3 },
    { name: 'analytics', color: '#ff1493', top: 300, left: width / 2 + 40 },
    { name: 'chatbubble-ellipses', color: '#20b2aa', top: 350, left: width - 80 },
    { name: 'globe', color: '#1e90ff', top: 400, left: width / 2 + 30 },
    { name: 'laptop', color: '#ffa500', top: height / 2 - 100, left: 70 },
    { name: 'desktop', color: '#7fffd4', top: 420, left: 40 },
    { name: 'happy', color: '#ff69b4', top: height - 180, left: 30 },
    { name: 'heart', color: '#ff1493', top: height - 160, left: width / 4 },
    { name: 'planet', color: '#32cd32', top: height - 140, left: width / 2 - 20 },
    { name: 'server', color: '#9400d3', top: height - 160, left: width / 2 + 50 },
    { name: 'rocket-outline', color: '#1e90ff', top: height - 120, left: width - 60 },
  ];

  const iconAnims = useRef(icons.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Mago flutuante
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 10, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Animação dos ícones
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
      colors={['#a0522d', '#604060']} // marrom → roxo
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

      {/* Caixa central */}
      <View style={styles.textBox}>
        <Text style={styles.text}>
          O Programmer's Quest surgiu como um projeto educacional inovador, combinando programação e gamificação. 
          O objetivo é ensinar conceitos de tecnologia e desenvolvimento de forma divertida e interativa, 
          utilizando jogos, desafios e recompensas para engajar os alunos. 
          Desde sua criação, tem inspirado estudantes a aprenderem programação e a aplicarem suas habilidades 
          em projetos reais, estimulando criatividade e inovação.
        </Text>

        {/* Botão Saiba Mais */}
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL('https://pt.wikipedia.org/wiki/Programação')} // Pode mudar para site do projeto
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
