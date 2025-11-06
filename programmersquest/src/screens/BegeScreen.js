import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function TheoryScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentTopic, setCurrentTopic] = useState(0);

  // Tópicos de teoria
  const topics = [
    {
      title: "🧙‍♂️ O Que é Programação?",
      icon: 'code-slash',
      color: '#ff6f61',
      content: [
        "💡 Programação é como dar instruções para um computador",
        "🎯 É a linguagem que usamos para conversar com as máquinas", 
        "🚀 Transformamos ideias em aplicativos, jogos e sites",
        "🧩 Cada instrução é um passo para resolver um problema"
      ],
      analogy: "Imagine que você está ensinando um robô a fazer um sanduíche. Cada comando que você dá é uma linha de código!"
    },
    {
      title: "🔤 Linguagens de Programação",
      icon: 'chatbubbles',
      color: '#6a5acd',
      content: [
        "🌐 JavaScript - Para websites interativos",
        "🐍 Python - Fácil de aprender e muito poderosa",
        "☕ Java - Usada em apps Android e sistemas grandes",
        "📱 Swift - Para criar apps iPhone",
        "🎮 C# - Muito usada em jogos"
      ],
      analogy: "Assim como temos português, inglês e espanhol, os computadores entendem JavaScript, Python, Java e muitas outras linguagens!"
    },
    {
      title: "📝 Conceitos Básicos",
      icon: 'school',
      color: '#32cd32',
      content: [
        "🔤 Variáveis - Como caixinhas que guardam informações",
        "🔄 Loops - Repetem ações automaticamente", 
        "🎯 Condições - Tomam decisões (SE... ENTÃO...)",
        "📦 Funções - Conjuntos de instruções reutilizáveis",
        "🎮 Eventos - Acontecem quando você clica ou toca"
      ],
      analogy: "Pense em fazer um bolo: variáveis são os ingredientes, loops misturam, condições verificam se está assado e funções são as receitas!"
    },
    {
      title: "🚀 Por Que Aprender?",
      icon: 'rocket',
      color: '#ffa500',
      content: [
        "💡 Desenvolve o pensamento lógico",
        "🎯 Ensina a resolver problemas complexos",
        "🚀 Cria oportunidades de carreira incríveis", 
        "🧩 Transforma você em criador de tecnologia",
        "🌍 Ajuda a entender o mundo digital"
      ],
      analogy: "Aprender programação é como ganhar superpoderes - você pode criar qualquer coisa que imaginar no mundo digital!"
    },
    {
      title: "🎮 Onde Usamos Programação?",
      icon: 'game-controller',
      color: '#ff1493',
      content: [
        "📱 Aplicativos no celular",
        "🎮 Jogos e entretenimento", 
        "🏠 Casas inteligentes e IoT",
        "🚗 Carros autônomos",
        "🏥 Sistemas médicos e saúde",
        "💰 Bancos e fintechs"
      ],
      analogy: "Da hora que você acorda (despertador no celular) até dormir (streaming de filmes), a programação está em tudo ao seu redor!"
    }
  ];

  useEffect(() => {
    // Animação de entrada suave
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const nextTopic = () => {
    setCurrentTopic((prev) => (prev + 1) % topics.length);
  };

  const prevTopic = () => {
    setCurrentTopic((prev) => (prev - 1 + topics.length) % topics.length);
  };

  const currentTopicData = topics[currentTopic];

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.mainTitle}>🎓 Escola de Programação</Text>
            <Text style={styles.subtitle}>Aprenda a teoria de forma divertida!</Text>
          </View>

          {/* Cartão Principal do Tópico */}
          <View style={styles.topicCard}>
            {/* Cabeçalho do Tópico */}
            <View style={[styles.topicHeader, { backgroundColor: currentTopicData.color }]}>
              <Ionicons name={currentTopicData.icon} size={32} color="#fff" />
              <Text style={styles.topicTitle}>{currentTopicData.title}</Text>
            </View>

            {/* Conteúdo Principal */}
            <View style={styles.topicContent}>
              {/* Lista de Pontos Principais */}
              <View style={styles.pointsContainer}>
                {currentTopicData.content.map((point, index) => (
                  <View key={index} style={styles.pointItem}>
                    <View style={[styles.pointBullet, { backgroundColor: currentTopicData.color }]} />
                    <Text style={styles.pointText}>{point}</Text>
                  </View>
                ))}
              </View>

              {/* Analogia Educativa */}
              <View style={styles.analogyBox}>
                <Text style={styles.analogyIcon}>💭</Text>
                <Text style={styles.analogyText}>{currentTopicData.analogy}</Text>
              </View>
            </View>
          </View>

          {/* Navegação entre Tópicos */}
          <View style={styles.navigation}>
            <Pressable style={styles.navButton} onPress={prevTopic}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
              <Text style={styles.navButtonText}>Anterior</Text>
            </Pressable>
            
            <View style={styles.progress}>
              <Text style={styles.progressText}>
                {currentTopic + 1}/{topics.length}
              </Text>
            </View>
            
            <Pressable style={styles.navButton} onPress={nextTopic}>
              <Text style={styles.navButtonText}>Próximo</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </Pressable>
          </View>

          {/* Divisor Visual */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Pronto para testar seu conhecimento?</Text>
            <View style={styles.dividerLine} />
          </View>

          

          {/* Dica Final */}
          <View style={styles.tipBox}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>
              Estude bem a teoria antes do quiz! Cada tópico te prepara para as perguntas que virão.
            </Text>
          </View>

        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    padding: 20,
    minHeight: height,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffd700',
    textAlign: 'center',
    fontWeight: '500',
  },
  topicCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 25,
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
    flex: 1,
  },
  topicContent: {
    padding: 20,
  },
  pointsContainer: {
    marginBottom: 20,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pointBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    marginRight: 12,
  },
  pointText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    flex: 1,
    fontWeight: '500',
  },
  analogyBox: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4169e1',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  analogyIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  analogyText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 18,
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3949ab',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 6,
    fontSize: 14,
  },
  progress: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: '#ffd700',
    fontWeight: 'bold',
    marginHorizontal: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00c853',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  quizButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  tipIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  tipText: {
    color: '#ffd700',
    fontSize: 13,
    flex: 1,
    fontWeight: '500',
  },
});