import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Login = ({ navigation }) => {
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
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="**************"
          placeholderTextColor="rgba(22, 22, 22, 1)"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPressIn={() => navigation.navigate('Form')} style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPressIn={() => navigation.goBack()} style={styles.forgotPassword} >
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
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
    width: 130,
    height: 150,
    marginTop: 40,
    marginBottom: 40,
  },
  logoText: {
    color: '#EB627A',
    fontSize: 40,
    fontFamily: 'Marianne',
    fontWeight: '800',
    letterSpacing: 16,
    wordWrap: 'break-word'
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
    fontFamily: 'Marianne',
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
    fontFamily: 'Marianne',
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
    fontFamily: 'Marianne',
    fontWeight: '700',
    lineHeight: 22,
  },
});

export default Login;
