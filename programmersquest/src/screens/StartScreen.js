import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // foguete, código, etc.
import { useRef, useEffect } from 'react';

export default function StartScreen({ navigation }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient colors={['#3b82f6', '#7e22ce']} style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Ionicons name="planet" size={90} color="#fff" />
      </Animated.View>

      <Text style={styles.title}>🚀 Programmer’s Quest</Text>
      <Text style={styles.subtitle}>A jornada do mago programador começa!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Form')}
      >
        <Ionicons name="code-slash" size={22} color="#fff" />
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0ff',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#7e22ce',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
