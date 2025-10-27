import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function QuizScreen({ navigation }) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const optionAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Mago flutuante
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 10, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Animação de entrada das opções
    Animated.timing(optionAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const questions = [
    {
      question: 'O que é programação?',
      options: [
        'Dar comandos para computadores',
        'Fazer café',
        'Desenhar gráficos',
        'Navegar na internet',
      ],
      answer: 0,
    },
    {
      question: 'Qual linguagem é usada no React Native?',
      options: ['Python', 'JavaScript', 'C++', 'HTML'],
      answer: 1,
    },
    {
      question: 'O que é gamificação?',
      options: [
        'Transformar aprendizado em jogo',
        'Jogar videogame',
        'Escrever livros',
        'Criar planilhas',
      ],
      answer: 0,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    if (index === questions[current].answer) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else setShowResult(true);
    optionAnim.setValue(0);
    Animated.timing(optionAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  // Ícones flutuantes de fundo
  const floatingIcons = [
    { name: 'rocket', color: '#ff6f61', top: 50, left: 30 },
    { name: 'code-slash', color: '#6a5acd', top: 120, left: width - 60 },
    { name: 'star', color: '#ffd700', top: 200, left: width / 2 },
  ];

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      {/* Ícones flutuantes */}
      {floatingIcons.map((icon, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            top: icon.top,
            left: icon.left,
            transform: [{ translateY: floatAnim }],
          }}
        >
          <Ionicons name={icon.name} size={28} color={icon.color} />
        </Animated.View>
      ))}

      {/* Mago flutuante */}
      <Animated.Image
        source={require('../../assets/wizard.png')}
        style={[styles.wizard, { transform: [{ translateY: floatAnim }] }]}
      />

      {!showResult ? (
        <Animated.View style={[styles.quizBox, { opacity: optionAnim }]}>
          <Text style={styles.question}>{questions[current].question}</Text>
          {questions[current].options.map((opt, i) => (
            <Pressable
              key={i}
              style={({ pressed }) => [
                styles.optionButton,
                { transform: [{ scale: pressed ? 0.95 : 1 }] },
              ]}
              onPress={() => handleAnswer(i)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </Pressable>
          ))}
        </Animated.View>
      ) : (
        <Animated.View style={[styles.quizBox, { opacity: optionAnim }]}>
          <Text style={styles.question}>
            🎉 Parabéns! Você marcou {score} de {questions.length}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.optionButton,
              { backgroundColor: '#32cd32', transform: [{ scale: pressed ? 0.95 : 1 }] },
            ]}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.optionText}>Voltar ao Menu</Text>
          </Pressable>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  wizard: { width: 160, height: 160, resizeMode: 'contain', marginBottom: 20 },
  quizBox: {
    backgroundColor: 'rgba(255, 241, 214, 0.95)',
    borderRadius: 25,
    padding: 25,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  question: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  optionButton: {
    backgroundColor: '#ff6f61',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 25,
    marginVertical: 6,
  },
  optionText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: '600' },
});
