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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function MarromScreen() {
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Ícones animados
  const icons = [
    { name: 'school', color: '#d2691e', top: 30, left: 20 },
    { name: 'book', color: '#8b4513', top: 80, left: width - 60 },
    { name: 'trophy', color: '#ffd700', top: 180, left: 50 },
    { name: 'rocket', color: '#6a5acd', top: 150, left: width / 2 },
    { name: 'code-slash', color: '#ff6f61', top: 250, left: width / 3 },
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
            toValue: -15 + Math.random() * 10,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 15 + Math.random() * 10,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <LinearGradient
      colors={['#23086dff', '#3b033bff']}
      style={styles.container}
    >
      {/* Ícones animados */}
      {icons.map((icon, index) => (
        <Animated.View
          key={index}
          style={[styles.icon, { top: icon.top, left: icon.left, transform: [{ translateY: iconAnims[index] }] }]}
        >
          <Ionicons name={icon.name} size={30} color={icon.color} />
        </Animated.View>
      ))}

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {/* Texto 1 */}
        <View style={styles.textBox}>
          <Text style={styles.text}>
            O projeto Programmer's Quest surgiu na ETEC Bento Quirino a partir das dificuldades que os alunos enfrentavam em programação. 
            O objetivo era criar uma maneira divertida e interativa de aprender programação, usando jogos, desafios e recompensas.
          </Text>
        </View>

        {/* Imagem do meio */}
        <Image
          source={require('../../assets/bento-quirino.jpeg')}
          style={styles.middleImage}
        />

        {/* Texto 2 */}
        <View style={styles.textBox}>
          <Text style={styles.text}>
            Os integrantes do projeto são Maria Beatriz, Kenzo e William, estudantes que adoram o curso de SDS e se dedicam a criar experiências educacionais inovadoras. 
            Eles aplicam programação e criatividade para engajar outros alunos e estimular a inovação.
          </Text>
        </View>

        <Image
          source={require('../../assets/i3.jpeg')}
          style={styles.middleImage}
        />

        {/* Seção Como Jogar */}
        <Text style={styles.sectionTitle}>Como Jogar</Text>

        <View style={styles.stepBox}>
          <Image
            source={require('../../assets/tutorial1.jpeg')} // substitua pela sua imagem real
            style={styles.stepImage}
          />
          <Text style={styles.stepText}>
            1️⃣ Entre em nosso site e coloque seu nome
          </Text>
        </View>

        <View style={styles.stepBox}>
          <Image
            source={require('../../assets/tutorial2.jpeg')}
            style={styles.stepImage}
          />
          <Text style={styles.stepText}>
            2️⃣ Escolha uma matéria para praticar
          </Text>
        </View>

        <View style={styles.stepBox}>
          <Image
            source={require('../../assets/tutorial3.jpeg')}
            style={styles.stepImage}
          />
          <Text style={styles.stepText}>
            3️⃣ Agora jogue e aprenda!
          </Text>
        </View>

        {/* Botão Saiba Mais */}
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL('https://www.instagram.com/programmersquest/')}
        >
          <Text style={styles.buttonText}>Saiba Mais</Text>
        </Pressable>

        {/* Mago flutuante */}
        <Animated.Image
          source={require('../../assets/wizard.png')}
          style={[styles.wizard, { transform: [{ translateY: floatAnim }] }]}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  textBox: {
    backgroundColor: 'rgba(255, 241, 214, 0.95)',
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  text: { fontSize: 16, color: '#333', textAlign: 'justify', lineHeight: 22 },
  middleImage: { width: '90%', height: 180, resizeMode: 'cover', marginVertical: 15, borderRadius: 15 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffd700',
    marginVertical: 20,
    textAlign: 'center',
  },
  stepBox: {
    backgroundColor: 'rgba(255, 241, 214, 0.95)',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  stepImage: {
    width: '90%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#6a5acd',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 30,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  wizard: { width: 160, height: 160, resizeMode: 'contain', marginTop: 20 },
  icon: { position: 'absolute', zIndex: 0 },
});
