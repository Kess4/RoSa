import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitScreen from '../screens/Init';
import LoginScreen from '../screens/Login';
import FormScreen from '../screens/Form';
import HomeScreen from '../screens/Home';
import LoaderScreen from '../screens/Loader';
import ProfilePopup from '../screens/ProfilePopup';

// Créer un objet Stack Navigator
const Stack = createNativeStackNavigator();

// Créer un composant pour gérer la navigation et la vérification du token
const AuthNavigator = ({ navigation }) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        // Récupérer le token depuis le stockage local
        const token = await AsyncStorage.getItem('token');
        // Définir le token dans l'état local
        setUserToken(token);
        // Rediriger vers la page Init si le token est null ou undefined
        if (!userToken) {
          navigation.navigate('Init');
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    };

    fetchUserToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loader" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Form' }} />
            <Stack.Screen name="ProfilePopup" component={ProfilePopup} options={{ title: 'ProfilePopup' }} />
            <Stack.Screen name="Loader" component={LoaderScreen} options={{ title: 'Loader' }} />
            <Stack.Screen name="Init" component={InitScreen} options={{ title: 'Welcome' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
