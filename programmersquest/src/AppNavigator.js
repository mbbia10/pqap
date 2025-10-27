import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import FormScreen from './screens/FormScreen';
import MenuScreen from './screens/MenuScreen';
import BegeScreen from './screens/BegeScreen';
import VerdeScreen from './screens/VerdeScreen';
import MarromScreen from './screens/MarromScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Form" component={FormScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Bege" component={BegeScreen} />
      <Stack.Screen name="Verde" component={VerdeScreen} />
      <Stack.Screen name="Marrom" component={MarromScreen} />
    </Stack.Navigator>
  );
}
