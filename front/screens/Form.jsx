import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity , Image, ScrollView} from 'react-native';
import { Icon } from '@rneui/themed';


const Form = ({ navigation }) => {
  const meteo = [
    { name: 'soleil', source: require('../assets/Icon/soleil.png') },
    { name: 'clair', source: require('../assets/Icon/clair.png') },
    { name: 'nuageux', source: require('../assets/Icon/nuageux.png') },    
    { name: 'pluie', source: require('../assets/Icon/pluie.png') },    
    { name: 'orage', source: require('../assets/Icon/orage.png') },    
    { name: 'neige', source: require('../assets/Icon/neige.png') },    
    // { name: 'tempete', source: require('../assets/Icon/tempete.png') },   
    // { name: 'tempete', source: require('../assets/Icon/tempete.png') },   
    // { name: 'tempete', source: require('../assets/Icon/tempete.png') },      

    ];

    const vis = [
      { name: 'Crepuscule ou aube', source: require('../assets/Icon/aube.png') },
      { name: 'Nuit avec eclairage allume', source: require('../assets/Icon/allume.png') },
      { name: 'Nuit avec eclairage eteint', source: require('../assets/Icon/eclairage.png') },    
      { name: 'Nuit sans eclairage', source: require('../assets/Icon/nuit.png') },    
      { name: 'Plein jour', source: require('../assets/Icon/soleil.png') }
  
      ];
  const [selectedMeteo, setSelectedMeteo] = useState(null);
  const [selectedVis, setselectedVis] = useState(null);

  const handleIconPress = (meteoName, visName) => {
    setSelectedMeteo(meteoName);
    setselectedVis(visName);
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
            <Text style={{ color: 'black', fontSize: 34, fontFamily: 'Marianne', fontWeight: '700', lineHeight: 41 }}>Formulaire</Text>
          </View>

          <View style={{ alignSelf: 'stretch', flexDirection: 'row', paddingLeft: 40, paddingRight: 40, paddingTop: 20, paddingBottom: 20, margin: 16, backgroundColor: '#F1F1F1', borderRadius: 10, borderWidth: 1.5, borderStyle:'dashed', borderColor: 'black', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Image
            source={require('../assets/Icon/photo.png')}
            style={{ width: 40, height: 41 }}
            />
            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'Marianne', fontWeight: '700', lineHeight: 25 }}>Ajouter des photos</Text>
            
            {/* Autres éléments du formulaire */}
          </View>
          
          <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginBottom: 16,  justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <View style={{ width: '15%'}}>
              <View style={{ width: 50, height: 71, position: 'relative' }}>
                <View style={{ width: 50, height: 45.80, left: 0, top: 25.20, position: 'absolute' }}>
                  <View style={{ width: 50, height: 45.80, left: 0, top: 0, position: 'absolute', backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8' }} />
                  <View style={{ width: 20, height: 22, left: 16.50, top: 11.60, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput style={{ color: '#BCC5CB', fontSize: 14, fontFamily: 'Marianne', fontWeight: '400', justifyContent: 'center' }} placeholder='00'/>
                  </View>
                </View>
                  <Text style={{ width: 50, left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 16 }}>Jour</Text>
              </View>
            </View>
            
            <View style={{ width: '15%'}}>
              <View style={{ width: 50, height: 71, position: 'relative' }}>
                <View style={{ width: 50, height: 45.80, left: 0, top: 25.20, position: 'absolute' }}>
                  <View style={{ width: 50, height: 45.80, left: 0, top: 0, position: 'absolute', backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8' }} />
                  <View style={{ width: 20, height: 22, left: 16.50, top: 11.60, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput style={{ color: '#BCC5CB', fontSize: 14, fontFamily: 'Marianne', fontWeight: '400', justifyContent: 'center' }} placeholder='00'/>
                  </View>
                </View>
                  <Text style={{ width: 50, left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 16 }}>Mois</Text>
              </View>
            </View>

            <View style={{ width: '23%'}}>
              <View style={{ width: 50, height: 71, position: 'relative' }}>
                <View style={{ width: 50, height: 45.80, top: 25.20, position: 'absolute' }}>
                  <View style={{ width: 80, height: 45.80, left: 0, top: 0, position: 'absolute', backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8' }} />
                  <View style={{ width: 80, height: 22, top: 11.60, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput style={{ color: '#BCC5CB', fontSize: 14, fontFamily: 'Marianne', fontWeight: '400', justifyContent: 'center' }} placeholder='0000'/>
                  </View>
                </View>
                  <Text style={{ width: 80,  position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 16 }}>Année</Text>
              </View>
            </View>

            <View style={{ width: '20%'}}>
              <View style={{ width: 50, height: 71, position: 'relative' }}>
                <View style={{ width: 50, height: 45.80, top: 25.20, position: 'absolute' }}>
                  <View style={{ width: 80, height: 45.80, left: 0, top: 0, position: 'absolute', backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8' }} />
                  <View style={{ width: 80, height: 22, top: 11.60, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TextInput style={{ color: '#BCC5CB', fontSize: 14, fontFamily: 'Marianne', fontWeight: '400', justifyContent: 'center'}} placeholder='00:00'/>
                  </View>
                </View>
                  <Text style={{ width: 80,  position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 16 }}>Heure</Text>
              </View>
            </View>
          </View>
          
          <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '700', lineHeight: 25 }}>Lieu</Text>
          <View style={{ width: 358, height: 64, position: 'relative', marginBottom: 16}}>
            <Text style={{ width: 358, height: 16, left: 0, top: 48, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 12, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 16, marginTop : 8 }}>0/100</Text>
            <TextInput style={{ width: 358, height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', paddingLeft: 12, color: '#BCC5CB', fontSize: 14, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 18 }} placeholder="Rentrez le lieu de l'accident" />
          </View>          

          <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '700', lineHeight: 18 }}>Type de véhicule</Text>
          <View style={{ width: 358, height: 64, position: 'relative', marginBottom: 16}}>
            <Text style={{ width: 358, height: 16, left: 0, top: 48, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 12, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 16, marginTop : 8}}>0/100</Text>
            <TextInput style={{ width: 358, height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', paddingLeft: 12, color: '#BCC5CB', fontSize: 14, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 18 }}  placeholder="Décrivez les différents véhicules impliqués" />
          </View>

          <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '700', lineHeight: 18 }}>Type de collision</Text>
          <View style={{ width: 358, height: 64, position: 'relative', marginBottom: 16}}>
            <Text style={{ width: 358, height: 16, left: 0, top: 48, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 12, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 16, marginTop : 8}}>0/100</Text>
            <TextInput style={{ width: 358, height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', paddingLeft: 12, color: '#BCC5CB', fontSize: 14, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 18 }}  placeholder="Expliquer le type de colision" />
          </View>


          <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '700', lineHeight: 18 }}>Météo</Text>
          {/* Autres éléments du formulaire */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, marginLeft:'auto', marginRight: 'auto', gap:20}}>
            {meteo.map((icon) => (
            <TouchableOpacity key={icon.name} onPress={() => handleIconPress(selectedVis, icon.name)} style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
              source={icon.source}
              style={{ width: 40, height: 41, tintColor: selectedMeteo === icon.name ? 'black' : 'gray' }}
              />
              <Text style={{ color: selectedMeteo === icon.name ? 'black' : 'gray', fontSize: 14, fontFamily: 'Marianne', fontWeight: '500', lineHeight: 37.50, wordWrap: 'break-word'}}>{icon.name}</Text>
            </TouchableOpacity>
            ))}
            </View>

          <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '700', lineHeight: 18 }}>Visibilité</Text>
          {/* Autres éléments du formulaire */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16, gap:20 }}>
            {vis.map((icon) => (
            <TouchableOpacity key={icon.name} onPress={() => handleIconPress(selectedMeteo, icon.name)} style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
              source={icon.source}
              style={{ width: 25, height: 26, tintColor: selectedVis === icon.name ? 'black' : 'gray' }}
              />
              <Text style={{ color: selectedVis === icon.name ? 'black' : 'gray', justifyContent: 'center', fontSize: 14, fontFamily: 'Marianne', fontWeight: '500', lineHeight: 37.50, wordWrap: 'break-word'}}>{icon.name}</Text>
            </TouchableOpacity>
            ))}
          </View>

          <Text style={{ marginTop: 10, color: 'black', fontSize: 16, fontFamily: 'Marianne', fontWeight: '700', lineHeight: 18, marginTop : 16}}>Commentaire</Text>
          <View style={{ width: 358, height: 64, position: 'relative' }}>
            <Text style={{ width: 358, height: 16, left: 0, top: 48, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 12, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 16, marginTop : 8}}>0/100</Text>
            <TextInput style={{ width: 358, height: 46, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#CDD4D8', paddingLeft: 12, color: '#BCC5CB', fontSize: 14, fontFamily: 'Marianne', fontWeight: '400', lineHeight: 18 }}  placeholder="Ajouter un commentaire" />
          </View>

          <TouchableOpacity style={{ alignSelf: 'stretch', padding: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4B7BEC', borderRadius: 10, marginTop: 25, marginBottom : 44 }}>
            <Text style={{ color: 'white', fontSize: 17, fontFamily: 'Marianne', fontWeight: '700' }}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}
export default Form;
