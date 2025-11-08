// src/screens/MenuScreen.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Mesma lista de avatares do ProfileScreen
const AVATAR_OPTIONS = [
  { id: 1, icon: 'person', name: '👤', color: '#667eea' },
  { id: 2, icon: 'rocket', name: '🚀', color: '#ff6b6b' },
  { id: 3, icon: 'game-controller', name: '🎮', color: '#4ecdc4' },
  { id: 4, icon: 'code-slash', name: '💻', color: '#f5576c' },
  { id: 5, icon: 'star', name: '⭐', color: '#ffd93d' },
  { id: 6, icon: 'planet', name: '🪐', color: '#9b59b6' },
  { id: 7, icon: 'shield', name: '🛡️', color: '#3498db' },
  { id: 8, icon: 'diamond', name: '💎', color: '#1abc9c' },
];

export default function MenuScreen({ navigation, route }) {
  const user = route?.params?.user ?? null;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-300)).current;

  // Função para pegar o avatar do usuário
  const getUserAvatar = () => {
    if (!user?.avatar) return AVATAR_OPTIONS[0]; // Avatar padrão
    return AVATAR_OPTIONS.find(avatar => avatar.id === user.avatar) || AVATAR_OPTIONS[0];
  };

  const currentAvatar = getUserAvatar();

  useEffect(() => {
    // Animação de flutuação do mago
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [floatAnim]);

  // Função para abrir/fechar o menu lateral
  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const buttons = [
    {
      title: 'O que é programação e por que ela é importante',
      colors: ['#667eea', '#764ba2'],
      icon: 'code-slash',
      screen: 'Bege',
      emoji: '💻'
    },
    {
      title: 'Gamificação e jogos educacionais',
      colors: ['#11998e', '#38ef7d'],
      icon: 'game-controller',
      screen: 'Verde',
      emoji: '🎮'
    },
    {
      title: 'Teoria da Aprendizagem',
      colors: ['#f5576c', '#f093fb'],
      icon: 'flame',
      screen: 'Marrom',
      emoji: '📚'
    },
  ];

  const handleNavigation = (btn) => {
    if (btn.screen === 'Verde') {
      navigation.navigate(btn.screen, { user });
    } else {
      navigation.navigate(btn.screen);
    }
  };

  const menuOptions = [
    {
      title: 'Histórico e Evolução',
      icon: 'bar-chart',
      screen: 'HistoryScreen',
      color: '#4ecdc4'
    },
    {
      title: 'Configurações',
      icon: 'settings',
      screen: 'SettingsScreen',
      color: '#ff6b6b'
    },
    {
      title: 'Perfil',
      icon: 'person',
      screen: 'ProfileScreen',
      color: '#667eea'
    },
  ];

  const handleMenuNavigation = (screen) => {
    toggleSidebar();
    setTimeout(() => {
      navigation.navigate(screen, { user });
    }, 300);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#1a1a2e', '#16213e']}
        style={styles.mainContent}
      >
        {/* Header com botão hamburger */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={toggleSidebar}
          >
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.content}>
          {/* Elementos decorativos */}
          <View style={styles.decorationCircle1} />
          <View style={styles.decorationCircle2} />
          
          {/* Header com boas-vindas */}
          <Animated.View style={[
            styles.welcomeContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}>
            <Text style={styles.welcomeText}>
              {user ? `Bem-vindo, ${user.username}!` : 'Bem-vindo!'}
            </Text>
            <Text style={styles.subtitle}>Escolha sua jornada de aprendizado</Text>
          </Animated.View>

          {/* Mago animado */}
          <Animated.Image
            source={require('../../assets/wizard.png')}
            style={[
              styles.wizard,
              { transform: [{ translateY: floatAnim }] }
            ]}
          />

          {/* Cards animados */}
          <Animated.View style={[
            styles.cardsContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}>
            {buttons.map((btn, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.cardWrapper,
                  {
                    transform: [{
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      })
                    }]
                  }
                ]}
              >
                <Pressable
                  style={({ pressed }) => [
                    styles.card,
                    { 
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    },
                  ]}
                  onPress={() => handleNavigation(btn)}
                >
                  <LinearGradient
                    colors={btn.colors}
                    style={styles.cardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.cardContent}>
                      <View style={styles.iconContainer}>
                        <Ionicons name={btn.icon} size={28} color="#fff" />
                        <Text style={styles.emoji}>{btn.emoji}</Text>
                      </View>
                      <Text style={styles.cardText}>{btn.title}</Text>
                    </View>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            ))}
          </Animated.View>

          {/* Footer */}
          <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
            <Text style={styles.footerText}>
              Sua aventura no conhecimento começa aqui! 🌟
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Menu Lateral */}
      {sidebarVisible && (
        <TouchableOpacity 
          style={styles.overlay}
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}
      
      <Animated.View 
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f0c29']}
          style={styles.sidebarGradient}
        >
          {/* Header do Sidebar com Avatar */}
          <View style={styles.sidebarHeader}>
            <View style={styles.userInfo}>
              <View style={[styles.avatarContainer, { backgroundColor: currentAvatar.color }]}>
                <Text style={styles.avatarText}>{currentAvatar.name}</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user?.username || 'Usuário'}</Text>
                <Text style={styles.userStatus}>Online 🟢</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={toggleSidebar}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Opções do Menu */}
          <View style={styles.menuOptions}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuNavigation(option.screen)}
              >
                <View style={[styles.menuIcon, { backgroundColor: option.color }]}>
                  <Ionicons name={option.icon} size={22} color="#fff" />
                </View>
                <Text style={styles.menuText}>{option.title}</Text>
                <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer do Sidebar */}
          <View style={styles.sidebarFooter}>
            <Text style={styles.sidebarFooterText}>
              Programmer's Quest 🧙‍♂️
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  menuButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
  },
  decorationCircle1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(247, 87, 108, 0.1)',
  },
  wizard: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  card: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  emoji: {
    fontSize: 20,
    marginLeft: 5,
  },
  cardText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Sidebar Styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    zIndex: 100,
  },
  sidebarGradient: {
    flex: 1,
    paddingTop: 60,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userStatus: {
    color: '#94a3b8',
    fontSize: 12,
  },
  closeButton: {
    padding: 5,
    marginTop: -5,
  },
  menuOptions: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sidebarFooter: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  sidebarFooterText: {
    color: '#94a3b8',
    fontSize: 14,
    fontStyle: 'italic',
  },
});