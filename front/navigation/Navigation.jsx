// Importe les dépendances nécessaires
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitScreen from '../screens/Init';
import LoginScreen from '../screens/Login';
import FormScreen from '../screens/Form';
import HomeScreen from '../screens/Home';

// Crée un objet Stack Navigator
const Stack = createNativeStackNavigator();

// Définis la navigation
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Init"  screenOptions={{headerShown: false}}>
        <Stack.Screen name="Init" component={InitScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Form' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
