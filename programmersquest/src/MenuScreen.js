import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/Nu0F1Cd.png' }}
      style={styles.container}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#f4a460' }]}
        onPress={() => navigation.navigate('Bege')}
      >
        <Text style={styles.text}>O que é programação e por que ela é importante</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#4caf50' }]}
        onPress={() => navigation.navigate('Verde')}
      >
        <Text style={styles.text}>Gamificação e jogos educacionais</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#8B4513' }]}
        onPress={() => navigation.navigate('Marrom')}
      >
        <Text style={styles.text}>Como surgiu o Programmer's Quest</Text>
      </TouchableOpacity>

      <Image source={require('../../assets/wizard.png')} style={styles.wizard} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    width: '80%',
    padding: 18,
    borderRadius: 20,
    marginVertical: 10,
  },
  text: { color: '#000', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  wizard: { width: 180, height: 180, resizeMode: 'contain', marginTop: 30 },
});
