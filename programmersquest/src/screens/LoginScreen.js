// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../supabase';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) return Alert.alert('Preencha todos os campos');

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !user) return Alert.alert('Usuário ou senha incorretos');

    // Passar usuário completo para QuizScreen
    navigation.navigate('Menu', { user });

  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#240046']} style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Usuário" placeholderTextColor="#ccc" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#ccc" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.linkText}>Criar conta</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({ 
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { color:'#fff', fontSize:24, fontWeight:'bold', marginBottom:30 },
  input: { width:'80%', padding:15, borderWidth:1, borderColor:'#fff', borderRadius:10, marginVertical:10, color:'#fff' },
  button: { backgroundColor:'#7e22ce', padding:15, borderRadius:10, marginTop:10, width:'80%' },
  buttonText: { color:'#fff', fontSize:16, textAlign:'center', fontWeight:'600' },
  linkText: { color:'#7e22ce', marginTop:20, fontSize:14 }
});
