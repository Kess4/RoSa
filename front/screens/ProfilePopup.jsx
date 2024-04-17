import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Image, Alert } from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePopup = ({navigation, visible, onClose }) => {

  const handleLogout = async () => {
    // Afficher un message de confirmation
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          onPress: async () => {
            try {
              // Supprimer le token du stockage local
              await AsyncStorage.removeItem('token');
              onClose();
              // Rediriger vers la page de connexion
              navigation.navigate('Init');
            } catch (error) {
              console.error('Erreur lors de la déconnexion :', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
          <View style={styles.closeIconContainer}>
          <Icon name='close' size={22} onPress={onClose}/>
          </View>
          <Image
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtXd88d7KfEkhwgUDH8WEia3DgXDwPoE1wz32hrD76Aw&s'
            style={{ width: 60, height: 60 }}
            />
          <Text style={styles.name}>tomdurant@GOUV.FR</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>Identifiant :xxxxx</Text>
            <Text style={styles.description}>Gendarmerie</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '80%',
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  closeIconContainer: {
    alignSelf: 'stretch',
    height: 50,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: 10,
  },
  closeIcon: {
    width: 13.17,
    height: 13.06,
    borderWidth: 2,
    borderColor: 'black',
  },
  name: {
    color: 'black',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 25,
  },
  descriptionContainer: {
    textAlign: 'center',
  },
  description: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 35,
    textAlign: 'center'
  },
  logoutButton: {
    width: 200.08,
    height: 43,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#EB3B5A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    textAlign: 'justify',
    color: 'white',
    fontSize: 14,
    fontWeight: '700'
  },
});

export default ProfilePopup;
