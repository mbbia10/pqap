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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// 🔹 IA - Gerador de Perguntas Automático
class QuizAI {
  constructor() {
    this.usedQuestions = new Set();
    this.questionTemplates = [
      {
        topic: 'Variáveis',
        templates: [
          {
            question: '📦 O que é uma variável em programação?',
            options: ['Uma caixa que guarda dados', 'Um tipo de loop', 'Um erro no código', 'Um comando de impressão'],
            answer: 0,
            hint: 'Pense em como guardamos informações para usar depois!'
          },
          {
            question: '🎯 Para que usamos variáveis?',
            options: ['Guardar valores para reutilizar', 'Criar animações', 'Conectar à internet', 'Fazer cálculos matemáticos apenas'],
            answer: 0,
            hint: 'Elas armazenam dados temporariamente!'
          }
        ]
      },
      {
        topic: 'Loops',
        templates: [
          {
            question: '🔄 O que é um loop em programação?',
            options: ['Repetir ações automaticamente', 'Um tipo de variável', 'Um erro comum', 'Uma função matemática'],
            answer: 0,
            hint: 'Pense em fazer a mesma tarefa várias vezes!'
          },
          {
            question: '🌀 Quando usamos loops?',
            options: ['Para repetir tarefas', 'Para declarar variáveis', 'Para fazer comentários', 'Para conectar bancos de dados'],
            answer: 0,
            hint: 'Quando precisamos executar o mesmo código múltiplas vezes!'
          }
        ]
      },
      {
        topic: 'Condições',
        templates: [
          {
            question: '🎯 O que são condições (if/else)?',
            options: ['Tomar decisões no código', 'Repetir ações', 'Armazenar dados', 'Criar funções'],
            answer: 0,
            hint: 'Pense em "SE isso ENTÃO aquilo"!'
          },
          {
            question: '🤔 Quando usamos condições if/else?',
            options: ['Para tomar decisões baseadas em condições', 'Para repetir código', 'Para organizar variáveis', 'Para fazer cálculos'],
            answer: 0,
            hint: 'Quando o programa precisa escolher entre diferentes caminhos!'
          }
        ]
      },
      {
        topic: 'Funções',
        templates: [
          {
            question: '📦 O que é uma função em programação?',
            options: ['Um bloco de código reutilizável', 'Um tipo de variável', 'Um erro no programa', 'Um comando de loop'],
            answer: 0,
            hint: 'Pense em uma receita que pode ser usada várias vezes!'
          },
          {
            question: '🚀 Por que usamos funções?',
            options: ['Para organizar e reutilizar código', 'Para criar variáveis', 'Para fazer o programa rodar mais rápido', 'Para conectar à internet'],
            answer: 0,
            hint: 'Elas evitam repetição de código!'
          }
        ]
      },
      {
        topic: 'Arrays',
        templates: [
          {
            question: '📚 O que é um array?',
            options: ['Uma lista de valores', 'Um tipo de loop', 'Uma função matemática', 'Um comando condicional'],
            answer: 0,
            hint: 'Pense em uma lista de compras!'
          },
          {
            question: '🎯 Para que usamos arrays?',
            options: ['Guardar múltiplos valores relacionados', 'Fazer cálculos complexos', 'Criar interfaces gráficas', 'Conectar bancos de dados'],
            answer: 0,
            hint: 'Útil para guardar grupos de dados similares!'
          }
        ]
      }
    ];
  }

  // Gerar pergunta única baseada no histórico
  generateQuestion() {
    let availableTemplates = [];
    
    // Coletar todos os templates disponíveis
    this.questionTemplates.forEach(topic => {
      topic.templates.forEach(template => {
        const questionKey = template.question;
        if (!this.usedQuestions.has(questionKey)) {
          availableTemplates.push({
            ...template,
            topic: topic.topic
          });
        }
      });
    });

    // Se não há mais perguntas disponíveis, reiniciar o histórico
    if (availableTemplates.length === 0) {
      this.usedQuestions.clear();
      return this.generateQuestion(); // Recursão para gerar nova pergunta
    }

    // Escolher template aleatório
    const randomTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
    
    // Gerar variações únicas
    const variations = this.generateVariations(randomTemplate);
    const selectedVariation = variations[Math.floor(Math.random() * variations.length)];

    // Marcar como usada
    this.usedQuestions.add(randomTemplate.question);

    return {
      ...selectedVariation,
      topic: randomTemplate.topic,
      id: Date.now() + Math.random() // ID único
    };
  }

  // Gerar variações da mesma pergunta
  generateVariations(template) {
    const variations = [template]; // Incluir a original
    
    // Variação 1: Diferentes opções (mantendo a resposta correta)
    if (template.options.length >= 4) {
      const newOptions = [...template.options];
      // Embaralhar opções (mantendo track da resposta correta)
      for (let i = newOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
      }
      const newAnswer = newOptions.indexOf(template.options[template.answer]);
      
      variations.push({
        ...template,
        question: template.question + ' 🎲', // Adicionar emoji para indicar variação
        options: newOptions,
        answer: newAnswer
      });
    }

    // Variação 2: Diferente formulação (para templates específicos)
    if (template.topic === 'Variáveis') {
      variations.push({
        question: '💾 Em programação, o que é uma variável?',
        options: ['Um local para armazenar dados', 'Um tipo de loop', 'Um método de impressão', 'Um comando condicional'],
        answer: 0,
        hint: 'É como uma gaveta que guarda informações!'
      });
    }

    return variations;
  }

  // Gerar múltiplas perguntas únicas
  generateUniqueQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
      questions.push(this.generateQuestion());
    }
    return questions;
  }
}

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
  const [questions, setQuestions] = useState([]);
  const [quizAI] = useState(new QuizAI());
  const [questionsCount] = useState(10); // Número de perguntas por quiz

  // 🔹 Inicializar perguntas
  useEffect(() => {
    generateNewQuiz();
  }, []);

  const generateNewQuiz = () => {
    const newQuestions = quizAI.generateUniqueQuestions(questionsCount);
    setQuestions(newQuestions);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(15);
    setCombo(0);
    setMaxCombo(0);
  };

  // 🔹 Timer
  useEffect(() => {
    if (showResult || timeLeft <= 0 || questions.length === 0) return;
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
  }, [timeLeft, showResult, questions]);

  const handleTimeUp = () => {
    Vibration.vibrate(200);
    nextQuestion();
  };

  // 🔹 Animações
  useEffect(() => {
    if (questions.length === 0) return;

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
  }, [current, questions]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleAnswer = (index) => {
    if (selectedOption !== null || questions.length === 0) return;
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

      allScores[user].push({
        score,
        total: questions.length,
        maxCombo,
        date: new Date().toISOString(),
        percentage: Math.round((score / questions.length) * 100)
      });

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
    if (selectedOption === null || questions.length === 0) return styles.optionButton;
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
            <Text style={styles.resultPercentage}>
              ({Math.round((score / questions.length) * 100)}%)
            </Text>
            <Text style={styles.resultCombo}>Combo Máximo: {maxCombo}x</Text>
            
            <Pressable 
              style={styles.homeButton}
              onPress={generateNewQuiz}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.homeButtonText}>🔄 Novo Quiz</Text>
            </Pressable>

            <Pressable 
              style={[styles.homeButton, styles.secondaryButton]}
              onPress={() => navigation.navigate('HistoryScreen', { user })}
            >
              <Ionicons name="stats-chart" size={20} color="#fff" />
              <Text style={styles.homeButtonText}>📊 Ver Histórico</Text>
            </Pressable>

            <Pressable 
              style={[styles.homeButton, styles.tertiaryButton]}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="home" size={20} color="#fff" />
              <Text style={styles.homeButtonText}>🏠 Voltar ao Início</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // 🔹 Tela de carregamento
  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.gradient}>
          <View style={styles.loadingContainer}>
            <Ionicons name="construct" size={60} color="#ffd700" />
            <Text style={styles.loadingText}>Gerando perguntas únicas...</Text>
            <Text style={styles.loadingSubtext}>Preparando seu quiz personalizado! 🚀</Text>
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

        {/* 🔹 SEÇÃO PRINCIPAL COM PERGUNTAS E OPÇÕES */}
        <Animated.View 
          style={[styles.content, { transform: [{ translateX: shakeAnim }] }]}
        >
          <View style={styles.topicBadge}>
            <Text style={styles.topicText}>{questions[current].topic}</Text>
          </View>

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
  
  // 🔹 Estilos do conteúdo principal
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    marginBottom: 50 
  },
  topicBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  topicText: {
    color: '#ffd700',
    fontSize: 12,
    fontWeight: 'bold',
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
    marginBottom: 5,
  },
  resultPercentage: {
    color: '#00e676',
    fontSize: 18,
    marginBottom: 15,
    opacity: 0.8,
  },
  resultCombo: {
    color: '#ffd700',
    fontSize: 20,
    marginBottom: 40,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3949ab',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 12,
    minWidth: 200,
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: '#6a5acd',
  },
  tertiaryButton: {
    backgroundColor: '#ff6f61',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // 🔹 Estilos de carregamento
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  loadingSubtext: {
    color: '#ffd700',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});