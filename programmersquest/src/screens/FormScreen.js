// src/screens/FormScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FormScreen({ navigation }) {
  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#240046']} style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Quiz Wizard 🧙‍♂️</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate('SignupScreen')}
      >
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { color:'#fff', fontSize:24, fontWeight:'bold', marginBottom:40, textAlign:'center' },
  button: {
    backgroundColor:'#7e22ce',
    paddingVertical:15,
    paddingHorizontal:50,
    borderRadius:30,
    marginVertical:10
  },
  signupButton: {
    backgroundColor:'#5e17eb'
  },
  buttonText: { color:'#fff', fontSize:18, fontWeight:'700', textAlign:'center' },
});
