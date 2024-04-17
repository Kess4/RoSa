import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Image, Text, StyleSheet } from 'react-native';

const Loader = ({ navigation }) => {
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Init');
      }
    };

    const timer = setTimeout(() => {
      checkLoggedIn();
    }, 3200); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/splash.png')}
          style={styles.image}
        />
      </View>
      <ActivityIndicator size="large" color="#EB627A" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  content: {
    alignItems: 'center',
    marginBottom: 20 // Ajoute de l'espace entre le contenu et l'indicateur de chargement
  },
  image: {
    width: 450,
    height: 450,
  },
  logoText: {
    color: '#EB627A',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 16,
  },
});

export default Loader;
