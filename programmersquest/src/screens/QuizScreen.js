import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Image,
  Easing,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width, height } = Dimensions.get('window');

export default function QuizScreen({ navigation }) {
  // Animações
  const floatAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const confettiRef = useRef(null);

  // Estados
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // Perguntas
  const questions = [
    {
      question: '🧙‍♂️ O que é programação?',
      options: [
        'Dar comandos para computadores',
        'Fazer café',
        'Desenhar gráficos',
        'Navegar na internet',
      ],
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
      options: [
        'Transformar aprendizado em jogo',
        'Jogar videogame',
        'Escrever livros',
        'Criar planilhas',
      ],
      answer: 0,
      hint: 'Tornar atividades mais divertidas como um jogo!',
    },
    {
      question: '🔧 O que é um componente em React?',
      options: [
        'Peça de computador',
        'Bloco de construção reutilizável',
        'Tipo de variável',
        'Função matemática',
      ],
      answer: 1,
      hint: 'São como peças de Lego que formam a interface!',
    },
  ];

  // Timer
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

  // Animações
  useEffect(() => {
    // Animação flutuante
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { 
          toValue: -10, 
          duration: 1500, 
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
        }),
        Animated.timing(floatAnim, { 
          toValue: 10, 
          duration: 1500, 
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
        }),
      ])
    ).start();

    // Barra de progresso
    Animated.timing(progressAnim, {
      toValue: ((current + 1) / questions.length) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Reset para nova pergunta
    setTimeLeft(15);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [current]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
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

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      if (confettiRef.current) {
        confettiRef.current.start();
      }
      setShowResult(true);
    }
  };

  const getOptionStyle = (index) => {
    if (selectedOption === null) return styles.optionButton;
    
    if (index === questions[current].answer) {
      return [styles.optionButton, styles.correctOption];
    }
    
    if (index === selectedOption && !isCorrect) {
      return [styles.optionButton, styles.wrongOption];
    }
    
    return [styles.optionButton, styles.disabledOption];
  };

  // Elementos flutuantes de fundo
  const floatingElements = [
    { name: 'rocket', color: '#ff6f61', top: '15%', left: '10%' },
    { name: 'code-slash', color: '#6a5acd', top: '25%', left: '85%' },
    { name: 'star', color: '#ffd700', top: '65%', left: '15%' },
    { name: 'game-controller', color: '#32cd32', top: '75%', left: '80%' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.gradient}>
        
        {/* Confetti */}
        {showResult && (
          <ConfettiCannon
            ref={confettiRef}
            count={200}
            origin={{ x: width / 2, y: 0 }}
            autoStart={true}
            fadeOut={true}
          />
        )}

        {/* Elementos flutuantes de fundo */}
        {floatingElements.map((element, i) => (
          <Animated.View
            key={i}
            style={[
              styles.floatingIcon,
              {
                top: element.top,
                left: element.left,
                transform: [{ translateY: floatAnim }],
              }
            ]}
          >
            <Ionicons name={element.name} size={28} color={element.color} />
          </Animated.View>
        ))}

        {/* Cabeçalho */}
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
                      outputRange: ['0%', '100%']
                    }) 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {current + 1}/{questions.length}
            </Text>
          </View>

          <View style={[
            styles.timerContainer,
            timeLeft < 6 && styles.timerCriticalContainer
          ]}>
            <Ionicons name="time" size={16} color={timeLeft < 6 ? "#ff4444" : "#ffd700"} />
            <Text style={[
              styles.timerText, 
              timeLeft < 6 && styles.timerCritical
            ]}>
              {timeLeft}s
            </Text>
          </View>
        </View>

        {/* Conteúdo Principal */}
        <View style={styles.content}>
          
          {/* Mago */}
          <Animated.View style={[styles.wizardContainer, { transform: [{ translateY: floatAnim }] }]}>
            <Image
              source={require('../../assets/wizard.png')}
              style={styles.wizard}
            />
            <View style={styles.wizardSpeech}>
              <Text style={styles.wizardText}>
                {showResult ? 
                  (score === questions.length ? 'Perfeito! 🎉' : 'Bom trabalho! 👏') : 
                  'Responde aí! 🧙‍♂️'}
              </Text>
            </View>
          </Animated.View>

          {/* Quiz */}
          {!showResult ? (
            <Animated.View 
              style={[
                styles.quizBox, 
                { 
                  transform: [{ translateX: shakeAnim }]
                }
              ]}
            >
              <Text style={styles.question}>{questions[current].question}</Text>
              
              {/* Dica */}
              <View style={styles.hintBox}>
                <Ionicons name="help-circle" size={16} color="#6a5acd" />
                <Text style={styles.hintText}>{questions[current].hint}</Text>
              </View>

              {/* Opções */}
              <View style={styles.optionsContainer}>
                {questions[current].options.map((opt, i) => (
                  <Pressable
                    key={i}
                    style={({ pressed }) => [
                      getOptionStyle(i),
                      { transform: [{ scale: pressed ? 0.98 : 1 }] },
                    ]}
                    onPress={() => handleAnswer(i)}
                    disabled={selectedOption !== null}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                    {selectedOption === i && (
                      <Ionicons 
                        name={isCorrect ? "checkmark-circle" : "close-circle"} 
                        size={24} 
                        color="#fff" 
                        style={styles.optionIcon}
                      />
                    )}
                  </Pressable>
                ))}
              </View>
            </Animated.View>
          ) : (
            <View style={styles.quizBox}>
              <Text style={styles.resultTitle}>🎊 Parabéns! 🎊</Text>
              
              <View style={styles.resultStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{score}</Text>
                  <Text style={styles.statLabel}>Acertos</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{maxCombo}</Text>
                  <Text style={styles.statLabel}>Max Combo</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {Math.round((score / questions.length) * 100)}%
                  </Text>
                  <Text style={styles.statLabel}>Precisão</Text>
                </View>
              </View>

              {/* Medalha */}
              <View style={styles.medalContainer}>
                <Ionicons 
                  name={score === questions.length ? "trophy" : score >= questions.length / 2 ? "medal" : "star"} 
                  size={60} 
                  color={score === questions.length ? "#ffd700" : score >= questions.length / 2 ? "#c0c0c0" : "#cd7f32"} 
                />
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.menuButton,
                  { transform: [{ scale: pressed ? 0.95 : 1 }] },
                ]}
                onPress={() => navigation.navigate('Menu')}
              >
                <Ionicons name="home" size={24} color="#fff" />
                <Text style={styles.menuButtonText}>Voltar ao Menu</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.restartButton,
                  { transform: [{ scale: pressed ? 0.95 : 1 }] },
                ]}
                onPress={() => {
                  setCurrent(0);
                  setScore(0);
                  setShowResult(false);
                  setCombo(0);
                  setMaxCombo(0);
                }}
              >
                <Ionicons name="refresh" size={24} color="#6a11cb" />
                <Text style={styles.restartButtonText}>Jogar Novamente</Text>
              </Pressable>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  floatingIcon: {
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scoreContainer: {
    alignItems: 'center',
    minWidth: 60,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  comboText: {
    fontSize: 12,
    color: '#ff6f61',
    fontWeight: '600',
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6a11cb',
    borderRadius: 3,
  },
  progressText: {
    color: '#fff',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    minWidth: 60,
    justifyContent: 'center',
  },
  timerCriticalContainer: {
    backgroundColor: 'rgba(255, 68, 68, 0.2)',
  },
  timerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  timerCritical: {
    color: '#ff4444',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  wizardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  wizard: { 
    width: 120, 
    height: 120, 
    resizeMode: 'contain',
  },
  wizardSpeech: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 15,
    marginTop: 8,
  },
  wizardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  quizBox: {
    backgroundColor: 'rgba(255, 241, 214, 0.95)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  hintText: {
    color: '#6a5acd',
    fontSize: 12,
    marginLeft: 8,
    fontStyle: 'italic',
    flex: 1,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#6a11cb',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctOption: {
    backgroundColor: '#27ae60',
  },
  wrongOption: {
    backgroundColor: '#e74c3c',
  },
  disabledOption: {
    backgroundColor: '#bdc3c7',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    flex: 1,
  },
  optionIcon: {
    position: 'absolute',
    right: 15,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  medalContainer: {
    marginBottom: 25,
  },
  menuButton: {
    backgroundColor: '#6a11cb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  restartButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#6a11cb',
  },
  restartButtonText: {
    color: '#6a11cb',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});