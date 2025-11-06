// src/screens/HistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../supabase';

export default function HistoryScreen({ route }) {
  const { user } = route.params;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setHistory(data);
    };

    loadHistory();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
      <Text style={styles.score}>Pontuação: {item.score}/{item.total_questions}</Text>
      <Text style={styles.combo}>Combo Máximo: {item.max_combo}x</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#240046']} style={styles.container}>
      <Text style={styles.title}>Histórico de {user.username}</Text>
      {history.length === 0 ? (
        <Text style={styles.noData}>Nenhuma partida jogada ainda!</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  noData: { color: '#ccc', fontSize: 16, textAlign: 'center', marginTop: 50 },
  card: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 15, marginBottom: 15 },
  date: { color: '#ffd700', fontWeight: '600', marginBottom: 5 },
  score: { color: '#00e676', fontSize: 18, marginBottom: 5 },
  combo: { color: '#ff8c00', fontSize: 16, marginBottom: 5 }
});
