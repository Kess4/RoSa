import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import { Icon } from '@rneui/themed';
import * as Location from 'expo-location';
import { reverseGeocodeAsync } from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Importez le date picker modal
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

const Form = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    requestPermissions();
  }, []);
  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: cameraRollStatus } = await MediaLibrary.requestPermissionsAsync();
      if (cameraStatus !== 'granted' || cameraRollStatus !== 'granted') {
        console.log('Camera or camera roll permission denied');
      } else {
        console.log('Camera and camera roll permission granted');
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Camera roll permission denied');
      } else {
        console.log('Camera roll permission granted');
      }
    }
  };
  // Fonction pour prendre une photo
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const meteo = [
    { name: 'soleil', source: require('../../assets/Icon/soleil.png') },
    { name: 'clair', source: require('../../assets/Icon/clair.png') },
    { name: 'nuageux', source: require('../../assets/Icon/nuageux.png') },
    { name: 'pluie', source: require('../../assets/Icon/pluie.png') },
    { name: 'orage', source: require('../../assets/Icon/orage.png') },
    { name: 'neige', source: require('../../assets/Icon/neige.png') },
  ];

  const vis = [
    { name: 'Crepuscule ou aube', source: require('../../assets/Icon/aube.png') },
    { name: 'Nuit avec eclairage allume', source: require('../../assets/Icon/allume.png') },
    { name: 'Nuit avec eclairage eteint', source: require('../../assets/Icon/eclairage.png') },
    { name: 'Nuit sans eclairage', source: require('../../assets/Icon/nuit.png') },
    { name: 'Plein jour', source: require('../../assets/Icon/soleil.png') },
  ];

  const [selectedMeteo, setSelectedMeteo] = useState(null);
  const [selectedVis, setSelectedVis] = useState(null);
  const [location, setLocation] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      reverseGeocode(location.coords.latitude, location.coords.longitude); 
    })();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      let addressList = await reverseGeocodeAsync({ latitude, longitude });
      if (addressList && addressList.length > 0) {
        // Recherchez l'adresse qui contient des informations sur la ville
        const cityAddress = addressList.find(address => address.city);
        if (cityAddress) {
          setLocation(cityAddress.city);
        } else {
          // Si aucune adresse ne contient d'informations sur la ville, utilisez le premier résultat
          setLocation(addressList[0].name);
        }
      } else {
        console.log('Aucune adresse trouvée pour les coordonnées fournies');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse : ', error);
    }
  };
  

  const handleIconPress = (meteoName, visName) => {
    setSelectedMeteo(meteoName);
    setSelectedVis(visName);
    setFormData({ 
      ...formData, 
      meteo: meteoName, // Utilisez la variable meteoName au lieu de name
      visibilite: visName // Utilisez la variable visName au lieu de name
    });

  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  
  const handleConfirmTime = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };
  
  const [formData, setFormData] = useState({
    date: '',
    heure: '',
    lieu: '',
    femme: null,
    homme: null,
    blesse: null,
    deces: null,
    type_de_vehicule: '',
    type_de_collision: '',
    meteo: '',
    qualite_de_la_surface: '',
    visibilite: '',
    commentaire: '',
    image: null,
    longitude: null,
    latitude: null
  });
  const [incidentIncrement, setIncidentIncrement] = useState(0);

  const generateIncidentNumber = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const incidentNumber = `${year}0000` + incidentIncrement;
    return incidentNumber;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Générer le numéro d'incident
    const n_incident = generateIncidentNumber();
  
    try {
      const response = await axios.post('http://localhost:3000/post/form', { ...formData, n_incident });
      console.log('Réponse du serveur:', response.data);
      setIncidentIncrement(incidentIncrement + 1);

      setFormData({ // Réinitialiser le formulaire après soumission réussie
        ...formData,
        n_incident,
        date: '',
        heure: '',
        lieu: '',
        femme: null,
        homme: null,
        blesse: null,
        deces: null,
        type_de_vehicule: '',
        type_de_collision: '',
        meteo: '',
        qualite_de_la_surface: '',
        visibilite: '',
        commentaire: '',
        image: null,
        longitude: null,
        latitude: null
      });
      Alert.alert('Merci pour votre envoi');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setAlert('error'); // Afficher une alerte d'erreur
    }
  };

  // Fonction pour mettre à jour les données du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: '5%', paddingTop: '20%' }}>
      <View style={{ flex: 1 }}>
        <View style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', gap: 16 }}>
          <View style={{ alignSelf: 'stretch', alignItems: 'center', flexDirection: 'row', gap: 16 }}>
            <Icon
            name='arrow-back-outline' 
            type='ionicon'
            size={40}
            onPressIn={() => navigation.goBack()}
            />
            <Text style={{ color: 'black', fontSize: 34, fontWeight: '700', lineHeight: 41 }}>Formulaire</Text>
          </View>

          <View style={{ alignSelf: 'stretch', paddingLeft: 40, paddingRight: 40, paddingTop: 20, paddingBottom: 20, margin: 16, backgroundColor: '#F1F1F1', borderRadius: 10, borderWidth: 1.5, borderStyle:'dashed', borderColor: 'black', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Icon
            name='add-photo-alternate' 
            type='material-icons-outlined'
            size={40}
            />
            
            <TouchableOpacity onPress={takePhoto} style={{ marginBottom: 20 }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '700', lineHeight: 25 }}>Ajouter des photos</Text>
            </TouchableOpacity>
            
            {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} value={formData.image} />}

            {/* Autres éléments du formulaire */}
          </View>
          
          <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginBottom: 16, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity style= {{display: 'flex', justifyContent: 'center', alignItems:'center', width:'50%', height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', color: '#BCC5CB' }} onPress={showDatePicker}>
              <Text style={{ color: 'black', fontSize: 16, fontWeight: '400', lineHeight: 16, }}>Date : {selectedDate ? selectedDate.toDateString() : 'Sélectionner'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
              value={formData.date} 
            />
            
              <TouchableOpacity style= {{display: 'flex', justifyContent: 'center', alignItems:'center', width:'50%', height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', color: '#BCC5CB' }} onPress={showTimePicker}>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '400', lineHeight: 16, }}> Heure : {selectedTime ? selectedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Sélectionner '}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
                value={formData.heure} 

              />

            </View>

            <Text style={{ color: 'black', fontSize: 16, fontWeight: '700', lineHeight: 18 }}>Lieu</Text>
            <TouchableOpacity onPress={reverseGeocode} style={{ alignSelf: 'stretch', marginBottom: 16 }}>
              <TextInput
                value={formData.lieu}
                onChangeText={(text) => setFormData({ ...formData, lieu: text })}
                style={{ width: '100%', height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', paddingLeft: 12, color: 'black', fontSize: 14, fontWeight: '400', lineHeight: 18 }}
                placeholder="Rentrez le lieu de l'accident"
              />
            </TouchableOpacity>

            <Text style={{ color: 'black', fontSize: 16, fontWeight: '700', lineHeight: 18 }}>Nombre de personne(s) accidentée(s)</Text>
            <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between', alignItems: 'center', paddingRight:20}}>
              <View style={{ width: 50, height: 71, position: 'relative' }}>
                <View style={{ width: 50, height: 45.80, top: 25.20, position: 'absolute' }}>
                  <View style={{ width: 70, height: 45.80, position: 'absolute', backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8' }} />
                  <View style={{ width: 20, height: 22, left: 16.50, top: 11.60, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput 
                    value={formData.femme}
                    onChangeText={(text) => setFormData({ ...formData, femme: text })}
                    style={{ fontSize: 14, fontWeight: '400', justifyContent: 'center' }} placeholder='00'/>
                  </View>
                </View>
                  <Text style={{ width: 90, position: 'absolute', color: 'black', fontSize: 16, fontWeight: '400', lineHeight: 16 }}>Femme(s)</Text>
              </View>

              <View style={{ width: 50, height: 71, position: 'relative' }}>
                <View style={{ width: 50, height: 45.80, left: 0, top: 25.20, position: 'absolute' }}>
                  <View style={{ width: 70, height: 45.80, position: 'absolute', backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8' }} />
                  <View style={{ width: 20, height: 22, left: 16.50, top: 11.60, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput                     
                    value={formData.homme}
                    onChangeText={(text) => setFormData({ ...formData, homme: text })}
                    style={{ color: 'black', fontSize: 14, fontWeight: '400', justifyContent: 'center' }} placeholder='00'/>
                  </View>
                </View>
                  <Text style={{ width: 90, left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 16, fontWeight: '400', lineHeight: 16 }}>Homme(s)</Text>
              </View>
            
              <View style={{ width: 50, height: 71, position: 'relative' }}>
                <View style={{ width: 50, height: 45.80, left: 0, top: 25.20, position: 'absolute' }}>
                  <View style={{ width: 70, height: 45.80, left: 0, top: 0, position: 'absolute', backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8' }} />
                  <View style={{ width: 20, height: 22, left: 16.50, top: 11.60, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput 
                    value={formData.blesse}
                    onChangeText={(text) => setFormData({ ...formData, blesse: text })}
                    style={{ fontSize: 14, fontWeight: '400', justifyContent: 'center' }} placeholder='00'/>
                  </View>
                </View>
                  <Text style={{ width: 90, left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 16, fontWeight: '400', lineHeight: 16 }}>Bléssé(s)</Text>
              </View>

              <View style={{ width: 50, height: 71, position: 'relative' }}>
                <View style={{ width: 50, height: 45.80, left: 0, top: 25.20, position: 'absolute' }}>
                  <View style={{ width: 70, height: 45.80, left: 0, top: 0, position: 'absolute', backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8' }} />
                  <View style={{ width: 20, height: 22, left: 16.50, top: 11.60, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput style={{ fontSize: 14, fontWeight: '400', justifyContent: 'center' }} placeholder='00'/>
                  </View>
                </View>
                  <Text                     
                  value={formData.deces}
                  onChangeText={(text) => setFormData({ ...formData, deces: text })}
                  style={{ width: 90, left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 16, fontWeight: '400', lineHeight: 16 }}>Décès</Text>
              </View>

            </View>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '700', lineHeight: 18 }}>Type de véhicule</Text>
          <View style={{ width: 358, height: 64, position: 'relative', marginBottom: 16}}>
            <Text style={{ width: 358, height: 16, left: 0, top: 48, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 12, fontWeight: '400', lineHeight: 16, marginTop : 8}}>0/100</Text>
            <TextInput                     
            value={formData.type_de_vehicule}
            onChangeText={(text) => setFormData({ ...formData, type_de_vehicule: text })}
            style={{ width: 358, height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', paddingLeft: 12, fontSize: 14, fontWeight: '400', lineHeight: 18 }}  placeholder="Décrivez les différents véhicules impliqués" />
          </View>

          <Text style={{ color: 'black', fontSize: 16, fontWeight: '700', lineHeight: 18 }}>Type de collision</Text>
          <View style={{ width: 358, height: 64, position: 'relative', marginBottom: 16}}>
            <Text style={{ width: 358, height: 16, left: 0, top: 48, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 12, fontWeight: '400', lineHeight: 16, marginTop : 8}}>0/100</Text>
            <TextInput                     
            value={formData.type_de_collision}
            onChangeText={(text) => setFormData({ ...formData, type_de_collision: text })}
            style={{ width: 358, height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', paddingLeft: 12, fontSize: 14, fontWeight: '400', lineHeight: 18 }}  placeholder="Expliquer le type de colision" />
          </View>


          <Text style={{ color: 'black', fontSize: 16, fontWeight: '700', lineHeight: 18 }}>Météo</Text>
          {/* Autres éléments du formulaire */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, marginLeft:'auto', marginRight: 'auto', gap:20}}>
            {meteo.map((icon) => (
            <TouchableOpacity key={icon.name} onPress={() => handleIconPress(icon.name, selectedVis)} style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
              source={icon.source}
              style={{ width: 40, height: 41, tintColor: selectedMeteo === icon.name ? 'black' : 'gray' }}
              />
              <Text style={{ color: selectedMeteo === icon.name ? 'black' : 'gray', fontSize: 14, fontWeight: '500', lineHeight: 37.50,}}>{icon.name}</Text>
            </TouchableOpacity>
            ))}
            </View>

          <Text style={{ color: 'black', fontSize: 16, fontWeight: '700', lineHeight: 18 }}>Visibilité</Text>
          {/* Autres éléments du formulaire */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16, gap:20 }}>
            {vis.map((icon) => (
            <TouchableOpacity key={icon.name} onPress={() => handleIconPress(selectedMeteo, icon.name) } style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
              source={icon.source}
              style={{ width: 25, height: 26, tintColor: selectedVis === icon.name ? 'black' : 'gray' }}
              />
              <Text style={{ color: selectedVis === icon.name ? 'black' : 'gray', justifyContent: 'center', fontSize: 14, fontWeight: '500', lineHeight: 37.50}}>{icon.name}</Text>
            </TouchableOpacity>
            ))}
          </View>

          <Text style={{ marginTop: 10, color: 'black', fontSize: 16, fontWeight: '700', lineHeight: 18, marginTop : 16}}>Commentaire</Text>
          <View style={{ width: 358, height: 64, position: 'relative' }}>
            <Text style={{ width: 358, height: 16, left: 0, top: 48, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 12, fontWeight: '400', lineHeight: 16, marginTop : 8}}>0/100</Text>
            <TextInput 
             value={formData.commentaire}
             onChangeText={(text) => setFormData({ ...formData, commentaire: text })}
             style={{ width: 358, height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', paddingLeft: 12, fontSize: 14, fontWeight: '400', lineHeight: 18 }}  placeholder="Ajouter un commentaire" />
          </View>

          <TouchableOpacity style={{ alignSelf: 'stretch', padding: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4B7BEC', borderRadius: 10, marginTop: 25, marginBottom: 44 }} onPress={handleSubmit}>
            <Text style={{ color: 'white', fontSize: 17, fontWeight: '700' }}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}
export default Form;
