import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour stocker les informations de connexion
  const storeCredentials = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error storing credentials:', error);
    }
  };

  // Fonction pour récupérer les informations de connexion
  const getCredentials = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error getting credentials:', error);
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      // console.log(response.config.data)
      if (response.status == 200) {
        // Authentification réussie, naviguer vers la page d'accueil
        const token = response.data.token;
        storeCredentials(token);
        Alert.alert('Bienvenue sur RoSa');
        navigation.navigate('Home');

      } else {
        Alert.alert('Erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion.');
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ROSA</Text>
        <Image style={styles.logoImage} marginLeft={'auto'} marginRight={'auto'} source={require('../assets/logo.png')} alt="Logo"/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom"
          placeholderTextColor="rgba(46, 46, 46, 1)"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="**************"
          placeholderTextColor="rgba(22, 22, 22, 1)"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.forgotPassword} >
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginTop: 187,
    marginBottom: 30,
    
  },
  logoImage: {
    width: 130,
    height: 150,
    marginTop: 40,
    marginBottom: 40,
  },
  logoText: {
    color: '#EB627A',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(22, 22, 22, 0.15)',
    justifyContent: 'flex-start',
  },
  input: {
    height: 55,
    padding: 15,
    fontSize: 14,
    fontWeight: '200',
    color: '#161616',
    borderColor : 'rgba(46, 46, 46, 0.15)'
  },

  
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4B7BEC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  forgotPassword: {
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#0060FF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
  },
});

export default Login;
