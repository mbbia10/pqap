import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/Nu0F1Cd.png' }} // fundo galáxia
      style={styles.container}
    >
      <Image source={require('../../assets/wizard.png')} style={styles.wizard} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.text}>Continuar...</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  wizard: { width: 220, height: 220, resizeMode: 'contain', marginBottom: 40 },
  button: {
    backgroundColor: '#ff9ae0',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  text: { color: 'black', fontSize: 18, fontWeight: 'bold' },
});
