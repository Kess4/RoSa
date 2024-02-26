import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


// import Svg from 'react-native-svg';

function Init ({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ROSA</Text>
        <Image style={styles.logoImage} source={require('../assets/logo.png')} alt="Logo"/>
      </View>
      <TouchableOpacity onPressIn={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
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
    width: 230,
    height: 265,
    marginTop: 40,
    marginBottom: 40,
    
  },
  logoText: {
    color: '#EB627A',
    fontSize: 40,
    fontFamily: 'Marianne',
    fontWeight: '800',
    letterSpacing: 16,
    wordWrap: 'break-word',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  
  button: {
    width: '50%',
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
    fontFamily: 'Marianne',
    fontWeight: '700',
  },
});

export default Init;
