import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function VerdeScreen({ navigation, route }) {
  const user = route?.params?.user ?? null; // ← recebe o user da MenuScreen

  return (
    <LinearGradient
      colors={['#00c853', '#43a047', '#2e7d32']}
      style={styles.container}
    >
      <Text style={styles.title}>Gamificação e Jogos Educacionais</Text>

      <Text style={styles.subtitle}>
        {user ? `Bem-vindo, ${user}!` : 'Bem-vindo!'}
      </Text>

      <Text style={styles.text}>
        A gamificação usa elementos de jogos em contextos não lúdicos, como a
        educação, para tornar o aprendizado mais envolvente e motivador.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('QuizScreen', { user })}
      >
        <Text style={styles.buttonText}>Iniciar Quiz</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#c8e6c9',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#e8f5e9',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1b5e20',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
