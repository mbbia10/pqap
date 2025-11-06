import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoryScreen({ route }) {
  const { user } = route.params;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const allScores = JSON.parse(await AsyncStorage.getItem('scores')) || {};
      const userScores = allScores[user] || [];
      // ordenar do mais recente para o mais antigo
      userScores.sort((a, b) => new Date(b.date) - new Date(a.date));
      setHistory(userScores);
    };
    loadHistory();
  }, []);

  const renderItem = ({ item, index }) => {
    const prevScore = index < history.length - 1 ? history[index + 1].score : null;
    const evolution = prevScore !== null ? (item.score > prevScore ? 'Subiu 👍' : item.score < prevScore ? 'Caiu 👎' : 'Igual 😐') : '—';

    return (
      <View style={styles.card}>
        <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
        <Text style={styles.score}>Pontuação: {item.score}</Text>
        <Text style={styles.combo}>Combo Máximo: {item.maxCombo}x</Text>
        <Text style={styles.evolution}>Evolução: {evolution}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#240046']} style={styles.container}>
      <Text style={styles.title}>Histórico de {user}</Text>
      {history.length === 0 ? (
        <Text style={styles.noData}>Nenhuma partida jogada ainda!</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
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
  combo: { color: '#ff8c00', fontSize: 16, marginBottom: 5 },
  evolution: { color: '#32cd32', fontWeight: '600' },
});
