import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 10,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#240046']}
      style={styles.container}
    >
      <Animated.Image
        source={require('../../assets/wizard.png')}
        style={[styles.wizard, { transform: [{ translateY: floatAnim }] }]}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Continuar...</Text>
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
  wizard: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '75%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    textAlign: 'center',
    color: '#fff',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  button: {
    backgroundColor: '#7e22ce',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});
