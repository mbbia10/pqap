import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

export default function BegeScreen() {
  return (
    <View style={[styles.container, { backgroundColor: '#f4a460' }]}>
      <ImageBackground
        source={{ uri: 'https://i.imgur.com/Y1BrJ4W.png' }} // imagem do topo do mapa (opcional)
        style={styles.top}
      />
      <Text style={styles.text}>
        Programação é o processo de criar instruções para que os computadores executem tarefas...
      </Text>
      <Image source={require('../../assets/wizard.png')} style={styles.wizard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  text: { fontSize: 16, color: '#000', textAlign: 'justify', marginVertical: 20 },
  top: { width: '100%', height: 80, resizeMode: 'cover' },
  wizard: { width: 160, height: 160, resizeMode: 'contain', marginTop: 'auto' },
});
