import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';

export default function FormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/Nu0F1Cd.png' }}
      style={styles.container}
    >
      <Image source={require('../../assets/wizard.png')} style={styles.wizard} />
      <TextInput
        style={styles.input}
        placeholder="digite seu nome"
        placeholderTextColor="#000"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="digite sua idade"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text style={styles.buttonText}>Continuar...</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  wizard: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 30 },
  input: {
    backgroundColor: '#ffb6e1',
    width: '70%',
    padding: 12,
    borderRadius: 25,
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#ff9ae0',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: { color: 'black', fontWeight: 'bold', fontSize: 18 },
});
