import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function TheoryScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentTopic, setCurrentTopic] = useState(0);

  // Tópicos teóricos bem explicados
  const topics = [
    {
      title: "🧙‍♂️ O Que é Programação?",
      icon: 'code-slash',
      color: '#ff6f61',
      description: "A magia de conversar com computadores",
      content: [
        {
          type: "definition",
          title: "📚 Definição Simples",
          content: "Programação é o processo de criar instruções (código) para que computadores executem tarefas específicas.",
          emoji: "💡"
        },
        {
          type: "analogy",
          title: "🍪 Analogia: Receita de Bolo",
          content: "Assim como uma receita ensina cada passo para fazer um bolo, o código ensina o computador passo a passo como realizar uma tarefa.",
          example: "📝 Exemplo:\n1. Pegue os ingredientes\n2. Misture tudo\n3. Asse por 30 min\n= Código de um bolo!",
          emoji: "📖"
        },
        {
          type: "example",
          title: "🎮 Exemplo no Mundo Real",
          content: "Quando você joga um game e pressiona 'ESPAÇO' para pular, por trás há um código que diz:",
          code: "SE botão ESPAÇO pressionado ENTÃO\n  personagem.pular()",
          emoji: "🚀"
        },
        {
          type: "importance",
          title: "🌟 Por Que é Importante?",
          content: "A programação está em TUDO ao nosso redor: celulares, carros, redes sociais, bancos, hospitais... Ela move o mundo digital!",
          emoji: "🌍"
        }
      ]
    },
    {
      title: "🔤 Linguagens de Programação",
      icon: 'chatbubbles',
      color: '#6a5acd',
      description: "Os diferentes idiomas dos computadores",
      content: [
        {
          type: "concept",
          title: "🗣️ O que são?",
          content: "Assim como humanos falam português, inglês ou espanhol, os computadores entendem linguagens específicas de programação.",
          emoji: "💬"
        },
        {
          type: "languages",
          title: "📚 Principais Linguagens",
          items: [
            {
              name: "JavaScript",
              purpose: "Websites interativos",
              example: "Facebook, Google, Netflix",
              emoji: "🌐",
              color: "#f7df1e"
            },
            {
              name: "Python",
              purpose: "IA, dados e ciência",
              example: "Instagram, Spotify, NASA",
              emoji: "🐍",
              color: "#3776ab"
            },
            {
              name: "Java",
              purpose: "Apps Android e sistemas",
              example: "WhatsApp, Minecraft",
              emoji: "☕",
              color: "#007396"
            },
            {
              name: "Swift",
              purpose: "Apps iPhone/iPad",
              example: "Uber, Airbnb",
              emoji: "📱",
              color: "#fa7343"
            }
          ],
          emoji: "🎯"
        },
        {
          type: "comparison",
          title: "🎯 Escolhendo a Linguagem",
          content: "Cada linguagem é como uma ferramenta diferente: você usa martelo para pregos e chave de fenda para parafusos!",
          tip: "💡 Dica: Comece com Python ou JavaScript - são mais fáceis para iniciantes!",
          emoji: "🛠️"
        }
      ]
    },
    {
      title: "📦 Variáveis e Dados",
      icon: 'cube',
      color: '#32cd32',
      description: "Aprendendo a guardar informações",
      content: [
        {
          type: "concept",
          title: "🎁 O que são Variáveis?",
          content: "São como CAIXINHAS que guardam informações para usar depois no programa.",
          emoji: "📦"
        },
        {
          type: "examples",
          title: "📝 Exemplos Práticos",
          items: [
            {
              variable: "idade",
              value: "12",
              type: "Número",
              description: "Guarda sua idade"
            },
            {
              variable: "nome",
              value: "'Maria'",
              type: "Texto",
              description: "Guarda seu nome"
            },
            {
              variable: "estaChovendo",
              value: "false",
              type: "Verdadeiro/Falso",
              description: "Diz se está chovendo"
            }
          ],
          emoji: "✨"
        },
        {
          type: "code",
          title: "💻 Como usamos no código?",
          content: "No JavaScript, criamos variáveis assim:",
          example: `let pontuacao = 100\nlet nomeJogador = "João"\nlet temVidas = true`,
          explanation: "Agora o computador sabe que João tem 100 pontos e ainda tem vidas!",
          emoji: "👨‍💻"
        }
      ]
    },
    {
      title: "🔄 Loops e Repetições",
      icon: 'refresh',
      color: '#ffa500',
      description: "Fazendo tarefas repetitivas automaticamente",
      content: [
        {
          type: "concept",
          title: "🌀 O que são Loops?",
          content: "São comandos que repetem ações automaticamente, sem precisarmos escrever a mesma coisa várias vezes.",
          emoji: "⚡"
        },
        {
          type: "realWorld",
          title: "🌍 Exemplo do Dia a Dia",
          content: "Imagine ensinar um robô a subir escadas:",
          analogy: "Em vez de:\n'Suba 1 degrau'\n'Suba 1 degrau'\n'Suba 1 degrau'...\n\nUsamos loop:\n'REPITA 10 vezes: Suba 1 degrau'",
          emoji: "🏠"
        },
        {
          type: "example",
          title: "🎮 Exemplo em Jogos",
          content: "Para desenhar um quadrado no jogo:",
          code: `repita 4 vezes {\n  ande 10 passos\n  vire 90 graus\n}`,
          explanation: "O loop faz o personagem andar e virar 4 vezes, formando um quadrado perfeito!",
          emoji: "🔲"
        },
        {
          type: "benefits",
          title: "✅ Vantagens dos Loops",
          content: "• Economizam tempo\n• Evitam erros\n• Tornam o código mais organizado\n• Funcionam para qualquer quantidade",
          emoji: "🎯"
        }
      ]
    },
    {
      title: "🎯 Condições e Decisões",
      icon: 'git-branch',
      color: '#ff1493',
      description: "Ensinando o computador a tomar decisões",
      content: [
        {
          type: "concept",
          title: "🤔 O que são Condições?",
          content: "São regras do tipo SE-ENTÃO-SENÃO que fazem o programa tomar decisões inteligentes.",
          emoji: "🎲"
        },
        {
          type: "realLife",
          title: "🌦️ Exemplo do Mundo Real",
          content: "Pense em como você se veste:",
          analogy: "SE estiver chovendo ENTÃO\n  leve guarda-chuva\nSENÃO\n  use óculos de sol",
          emoji: "👕"
        },
        {
          type: "codeExample",
          title: "💻 No Código",
          content: "Em um jogo de plataforma:",
          code: `se (personagem.noAr()) {\n  aplicarGravidade()\n} senao {\n  permitirPulo()\n}`,
          explanation: "O código decide: se estiver no ar, cai; se estiver no chão, pode pular!",
          emoji: "🎮"
        },
        {
          type: "importance",
          title: "🚀 Por Que São Importantes?",
          content: "As condições tornam os programas INTELIGENTES! Eles podem reagir diferente a cada situação, como um assistente pessoal digital.",
          examples: "• Sites que lembram seu login\n• Apps que mostram conteúdo personalizado\n• Jogos com IA que reagem aos seus movimentos",
          emoji: "🌟"
        }
      ]
    }
  ];

  useEffect(() => {
    // Animação de entrada suave
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [currentTopic]);

  const nextTopic = () => {
    setCurrentTopic((prev) => (prev + 1) % topics.length);
  };

  const prevTopic = () => {
    setCurrentTopic((prev) => (prev - 1 + topics.length) % topics.length);
  };

  const currentTopicData = topics[currentTopic];

  const renderContentItem = (item, index) => {
    switch (item.type) {
      case "languages":
        return (
          <View key={index} style={styles.languagesContainer}>
            {item.items.map((lang, langIndex) => (
              <View key={langIndex} style={[styles.langCard, { borderLeftColor: lang.color }]}>
                <Text style={styles.langEmoji}>{lang.emoji}</Text>
                <View style={styles.langInfo}>
                  <Text style={styles.langName}>{lang.name}</Text>
                  <Text style={styles.langPurpose}>{lang.purpose}</Text>
                  <Text style={styles.langExample}>Ex: {lang.example}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case "examples":
        return (
          <View key={index} style={styles.examplesContainer}>
            {item.items.map((example, exIndex) => (
              <View key={exIndex} style={styles.exampleCard}>
                <View style={styles.exampleHeader}>
                  <Text style={styles.exampleVariable}>{example.variable}</Text>
                  <Text style={styles.exampleValue}>{example.value}</Text>
                </View>
                <Text style={styles.exampleType}>{example.type}</Text>
                <Text style={styles.exampleDescription}>{example.description}</Text>
              </View>
            ))}
          </View>
        );

      case "code":
        return (
          <View key={index} style={styles.codeContainer}>
            <Text style={styles.codeLabel}>{item.content}</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{item.example}</Text>
            </View>
            <Text style={styles.codeExplanation}>{item.explanation}</Text>
          </View>
        );

      default:
        return (
          <View key={index} style={styles.contentItem}>
            <Text style={styles.contentText}>{item.content}</Text>
            {item.example && (
              <View style={styles.exampleBox}>
                <Text style={styles.exampleText}>{item.example}</Text>
              </View>
            )}
            {item.analogy && (
              <View style={styles.analogyBox}>
                <Text style={styles.analogyText}>{item.analogy}</Text>
              </View>
            )}
            {item.tip && (
              <View style={styles.tipBox}>
                <Text style={styles.tipText}>{item.tip}</Text>
              </View>
            )}
          </View>
        );
    }
  };

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
            <Text style={styles.subtitle}>Aprenda teoria de forma clara e divertida!</Text>
          </View>

          {/* Cartão do Tópico */}
          <View style={styles.topicCard}>
            {/* Cabeçalho */}
            <View style={[styles.topicHeader, { backgroundColor: currentTopicData.color }]}>
              <Ionicons name={currentTopicData.icon} size={32} color="#fff" />
              <View style={styles.topicHeaderText}>
                <Text style={styles.topicTitle}>{currentTopicData.title}</Text>
                <Text style={styles.topicDescription}>{currentTopicData.description}</Text>
              </View>
            </View>

            {/* Conteúdo Teórico */}
            <View style={styles.topicContent}>
              {currentTopicData.content.map((item, index) => (
                <View key={index} style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionEmoji}>{item.emoji}</Text>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                  </View>
                  {renderContentItem(item, index)}
                </View>
              ))}
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
              <Text style={styles.progressLabel}>Tópicos</Text>
            </View>
            
            <Pressable style={styles.navButton} onPress={nextTopic}>
              <Text style={styles.navButtonText}>Próximo</Text>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </Pressable>
          </View>

          {/* Divisor Visual */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>💡 Conhecimento adquirido!</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Botão para Quiz */}
          <Pressable 
            style={styles.quizButton}
            onPress={() => navigation.navigate('Quiz')}
          >
            <Ionicons name="trophy" size={24} color="#fff" />
            <Text style={styles.quizButtonText}>Testar Meu Conhecimento! 🎯</Text>
          </Pressable>

          {/* Dica Final */}
          <View style={styles.finalTip}>
            <Text style={styles.finalTipEmoji}>🌟</Text>
            <Text style={styles.finalTipText}>
              Revise os tópicos quantas vezes quiser! A prática leva à perfeição.
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
    padding: 25,
  },
  topicHeaderText: {
    flex: 1,
    marginLeft: 15,
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  topicContent: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  contentItem: {
    marginBottom: 15,
  },
  contentText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
  exampleBox: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
    marginTop: 10,
  },
  exampleText: {
    fontSize: 14,
    color: '#2e7d32',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  analogyBox: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
    marginTop: 10,
  },
  analogyText: {
    fontSize: 14,
    color: '#1565c0',
    lineHeight: 18,
  },
  tipBox: {
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
    marginTop: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#e65100',
    fontWeight: '500',
  },
  languagesContainer: {
    marginTop: 10,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginVertical: 6,
    borderLeftWidth: 4,
  },
  langEmoji: {
    fontSize: 20,
    marginRight: 15,
  },
  langInfo: {
    flex: 1,
  },
  langName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  langPurpose: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  langExample: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  examplesContainer: {
    marginTop: 10,
  },
  exampleCard: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  exampleVariable: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  exampleValue: {
    fontSize: 14,
    color: '#e91e63',
    fontWeight: 'bold',
  },
  exampleType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  exampleDescription: {
    fontSize: 12,
    color: '#888',
  },
  codeContainer: {
    marginTop: 10,
  },
  codeLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  codeBlock: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  codeText: {
    color: '#f8f8f2',
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  codeExplanation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 8,
    fontSize: 16,
  },
  progress: {
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    minWidth: 80,
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  progressLabel: {
    color: '#ccc',
    fontSize: 10,
    marginTop: 2,
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
    marginHorizontal: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00c853',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  quizButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  finalTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  finalTipEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  finalTipText: {
    color: '#ffd700',
    fontSize: 14,
    flex: 1,
    fontWeight: '500',
    lineHeight: 18,
  },
});