import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function MenuScreen({ navigation }) {
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
  }, [floatAnim]);

  const buttons = [
    {
      title: 'O que é programação e por que ela é importante',
      color: '#f4a460',
      icon: 'code-slash',
      screen: 'Bege',
    },
    {
      title: 'Gamificação e jogos educacionais',
      color: '#4caf50',
      icon: 'game-controller',
      screen: 'Verde',
    },
    {
      title: "Como surgiu o Programmer's Quest",
      color: '#8B4513',
      icon: 'flame',
      screen: 'Marrom',
    },
  ];

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#240046']}
      style={styles.container}
    >
      <Animated.Image
        source={require('../../assets/wizard.png')}
        style={[styles.wizard, { transform: [{ translateY: floatAnim }] }]}
      />

      <View style={styles.cardsContainer}>
        {buttons.map((btn, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: btn.color, opacity: pressed ? 0.9 : 1 },
            ]}
            onPress={() => navigation.navigate(btn.screen)}
          >
            <Ionicons name={btn.icon} size={26} color="#fff" />
            <Text style={styles.text}>{btn.title}</Text>
          </Pressable>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wizard: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  cardsContainer: {
    width: '90%',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 10,
    gap: 12,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
