// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../supabase';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignup = async () => {
    if (!username || !password) return Alert.alert('Preencha todos os campos');
    if (password !== confirm) return Alert.alert('Senhas não coincidem');

    const { data: existing } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (existing) return Alert.alert('Usuário já existe!');

    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password }]);

    if (error) return Alert.alert('Erro ao criar usuário', error.message);

    Alert.alert('Conta criada com sucesso!');
    navigation.navigate('LoginScreen');
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#240046']} style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput style={styles.input} placeholder="Usuário" placeholderTextColor="#ccc" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#ccc" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirme a senha" placeholderTextColor="#ccc" secureTextEntry value={confirm} onChangeText={setConfirm} />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.linkText}>Já tem conta? Faça login</Text>
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
