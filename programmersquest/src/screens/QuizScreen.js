import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Easing,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function QuizScreen({ navigation, route }) {
  const { user } = route.params;

  // 🔹 Animações
  const floatAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const confettiRef = useRef(null);

  // 🔹 Estados
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // 🔹 Perguntas
  const questions = [
    {
      question: '🧙‍♂️ O que é programação?',
      options: ['Dar comandos para computadores', 'Fazer café', 'Desenhar gráficos', 'Navegar na internet'],
      answer: 0,
      hint: 'É como ensinar um robô a realizar tarefas!',
    },
    {
      question: '⚛️ Qual linguagem é usada no React Native?',
      options: ['Python', 'JavaScript', 'C++', 'HTML'],
      answer: 1,
      hint: 'A mesma linguagem usada em websites interativos!',
    },
    {
      question: '🎮 O que é gamificação?',
      options: ['Transformar aprendizado em jogo', 'Jogar videogame', 'Escrever livros', 'Criar planilhas'],
      answer: 0,
      hint: 'Tornar atividades mais divertidas como um jogo!',
    },
    {
      question: '🔧 O que é um componente em React?',
      options: ['Peça de computador', 'Bloco de construção reutilizável', 'Tipo de variável', 'Função matemática'],
      answer: 1,
      hint: 'São como peças de Lego que formam a interface!',
    },
  ];

  // 🔹 Timer
  useEffect(() => {
    if (showResult || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleTimeUp = () => {
    Vibration.vibrate(200);
    nextQuestion();
  };

  // 🔹 Animações
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(floatAnim, { toValue: 10, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();

    Animated.timing(progressAnim, {
      toValue: ((current + 1) / questions.length) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeLeft(15);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [current]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleAnswer = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const correct = index === questions[current].answer;
    setIsCorrect(correct);

    if (correct) {
      Vibration.vibrate(100);
      setScore(score + 1);
      setCombo(combo + 1);
      setMaxCombo(Math.max(maxCombo, combo + 1));
    } else {
      Vibration.vibrate(400);
      shake();
      setCombo(0);
    }

    setTimeout(nextQuestion, 1500);
  };

  const saveScore = async () => {
    try {
      const allScores = JSON.parse(await AsyncStorage.getItem('scores')) || {};
      if (!allScores[user]) allScores[user] = [];
      allScores[user].push(score);
      await AsyncStorage.setItem('scores', JSON.stringify(allScores));
    } catch (e) {
      console.log('Erro ao salvar pontuação', e);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      confettiRef.current?.start();
      setShowResult(true);
      saveScore();
    }
  };

  const getOptionStyle = (index) => {
    if (selectedOption === null) return styles.optionButton;
    if (index === questions[current].answer) return [styles.optionButton, styles.correctOption];
    if (index === selectedOption && !isCorrect) return [styles.optionButton, styles.wrongOption];
    return [styles.optionButton, styles.disabledOption];
  };

  const floatingElements = [
    { name: 'rocket', color: '#ff6f61', top: '15%', left: '10%' },
    { name: 'code-slash', color: '#6a5acd', top: '25%', left: '85%' },
    { name: 'star', color: '#ffd700', top: '65%', left: '15%' },
    { name: 'game-controller', color: '#32cd32', top: '75%', left: '80%' },
  ];

  // 🔹 Tela de resultados
  if (showResult) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.gradient}>
          <ConfettiCannon
            ref={confettiRef}
            count={200}
            origin={{ x: width / 2, y: 0 }}
            autoStart
            fadeOut
          />
          
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>🎉 Quiz Concluído!</Text>
            <Text style={styles.resultScore}>Pontuação: {score}/{questions.length}</Text>
            <Text style={styles.resultCombo}>Combo Máximo: {maxCombo}x</Text>
            
            <Pressable 
              style={styles.homeButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.homeButtonText}>🏠 Voltar ao Início</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.gradient}>
        {floatingElements.map((e, i) => (
          <Animated.View
            key={i}
            style={[styles.floatingIcon, { top: e.top, left: e.left, transform: [{ translateY: floatAnim }] }]}
          >
            <Ionicons name={e.name} size={28} color={e.color} />
          </Animated.View>
        ))}

        <View style={styles.header}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>⭐ {score}</Text>
            <Text style={styles.comboText}>🔥 {combo}x</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{current + 1}/{questions.length}</Text>
          </View>

          <View style={[styles.timerContainer, timeLeft < 6 && styles.timerCriticalContainer]}>
            <Ionicons name="time" size={16} color={timeLeft < 6 ? "#ff4444" : "#ffd700"} />
            <Text style={[styles.timerText, timeLeft < 6 && styles.timerCritical]}>
              {timeLeft}s
            </Text>
          </View>
        </View>

        {/* 🔹 SEÇÃO PRINCIPAL COM PERGUNTAS E OPÇÕES (ADICIONADA) */}
        <Animated.View 
          style={[styles.content, { transform: [{ translateX: shakeAnim }] }]}
        >
          <Text style={styles.questionText}>
            {questions[current].question}
          </Text>
          
          <Text style={styles.hintText}>
            💡 Dica: {questions[current].hint}
          </Text>

          <View style={styles.optionsContainer}>
            {questions[current].options.map((option, index) => (
              <Pressable
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswer(index)}
                disabled={selectedOption !== null}
              >
                <Text style={styles.optionText}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

      </LinearGradient>
    </View>
  );
}

// 🔹 Estilos completos
const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, width: '100%', height: '100%', justifyContent: 'space-between' },
  floatingIcon: { position: 'absolute', opacity: 0.3 },
  header: { marginTop: 50, paddingHorizontal: 20 },
  scoreContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  scoreText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  comboText: { color: '#ffd700', fontSize: 18 },
  progressContainer: { marginTop: 10 },
  progressBar: { height: 8, backgroundColor: '#444', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#00e676' },
  progressText: { color: '#fff', marginTop: 4, textAlign: 'center' },
  timerContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  timerCriticalContainer: { backgroundColor: '#660000' },
  timerText: { color: '#ffd700', marginLeft: 4, fontWeight: 'bold' },
  timerCritical: { color: '#ff4444' },
  
  // 🔹 NOVOS ESTILOS ADICIONADOS
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    marginBottom: 50 
  },
  questionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  hintText: {
    color: '#ffd700',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#3949ab',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  correctOption: {
    backgroundColor: '#00c853',
  },
  wrongOption: {
    backgroundColor: '#ff1744',
  },
  disabledOption: {
    backgroundColor: '#555',
    opacity: 0.7,
  },
  
  // 🔹 Estilos para tela de resultados
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultScore: {
    color: '#00e676',
    fontSize: 24,
    marginBottom: 10,
  },
  resultCombo: {
    color: '#ffd700',
    fontSize: 20,
    marginBottom: 40,
  },
  homeButton: {
    backgroundColor: '#3949ab',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});