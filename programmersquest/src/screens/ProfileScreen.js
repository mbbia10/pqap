// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabase';

const { width, height } = Dimensions.get('window');

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

export default function ProfileScreen({ navigation, route }) {
  const user = route?.params?.user ?? null;
  const [username, setUsername] = useState(user?.username || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 1);
  const [isLoading, setIsLoading] = useState(false);
  
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleSaveProfile = async () => {
    if (!username.trim()) {
      Alert.alert('Ops! 😅', 'Por favor, digite um nome de usuário.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          username: username.trim(),
          avatar: selectedAvatar,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select();

      if (error) throw error;

      Alert.alert(
        'Perfil Atualizado! 🎉',
        'Suas informações foram salvas com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro! 😵', 'Não foi possível salvar as alterações. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Tem certeza? 🗑️',
      'Esta ação não pode ser desfeita. Sua conta e todos os dados serão permanentemente excluídos.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir Conta',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', user.id);

              if (error) throw error;

              Alert.alert(
                'Conta Excluída! 👋',
                'Sua conta foi excluída com sucesso.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('StartScreen')
                  }
                ]
              );
            } catch (error) {
              Alert.alert('Erro!', 'Não foi possível excluir a conta.');
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      {/* Elementos decorativos */}
      <View style={styles.decorationCircle1} />
      <View style={styles.decorationCircle2} />

      {/* Header */}
      <Animated.View style={[
        styles.header,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Meu Perfil</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Seção do Avatar */}
        <Animated.View style={[
          styles.section,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Text style={styles.sectionTitle}>Escolha seu Avatar 🎭</Text>
          <Text style={styles.sectionSubtitle}>
            Selecione um ícone que te representa
          </Text>
          
          <View style={styles.avatarGrid}>
            {AVATAR_OPTIONS.map((avatar) => (
              <TouchableOpacity
                key={avatar.id}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar.id && styles.avatarSelected,
                  { backgroundColor: avatar.color }
                ]}
                onPress={() => setSelectedAvatar(avatar.id)}
              >
                <Text style={styles.avatarEmoji}>{avatar.name}</Text>
                {selectedAvatar === avatar.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Seção de Informações Pessoais */}
        <Animated.View style={[
          styles.section,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Text style={styles.sectionTitle}>Informações Pessoais 📝</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>👤 Nome de Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome de usuário..."
              placeholderTextColor="#94a3b8"
              value={username}
              onChangeText={setUsername}
              maxLength={20}
            />
            <Text style={styles.charCount}>{username.length}/20</Text>
          </View>
        </Animated.View>

        {/* Seção de Estatísticas */}
        {user && (
          <Animated.View style={[
            styles.section,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Minhas Estatísticas 📊</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>🎯</Text>
                <Text style={styles.statLabel}>Nível</Text>
                <Text style={styles.statValue}>1</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>⭐</Text>
                <Text style={styles.statLabel}>Pontos</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>🏆</Text>
                <Text style={styles.statLabel}>Conquistas</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Botões de Ação */}
        <Animated.View style={[
          styles.actionsSection,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.buttonDisabled]}
            onPress={handleSaveProfile}
            disabled={isLoading}
          >
            <LinearGradient
              colors={isLoading ? ['#94a3b8', '#64748b'] : ['#4ecdc4', '#44a08d']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="save" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Ionicons name="trash" size={20} color="#ff6b6b" />
            <Text style={styles.deleteButtonText}>Excluir Conta</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorationCircle1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 20,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarOption: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  avatarSelected: {
    transform: [{ scale: 1.1 }],
  },
  avatarEmoji: {
    fontSize: 28,
  },
  selectedIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4ecdc4',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  charCount: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    marginBottom: 5,
  },
  statLabel: {
    color: '#cbd5e1',
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsSection: {
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    shadowColor: '#64748b',
  },
  gradientButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  deleteButtonText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
  },
});