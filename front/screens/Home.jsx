import React,  { useState, useEffect }  from 'react';
import { View,StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import MapView from 'react-native-map-clustering';
import {Marker, PROVIDER_GOOGLE, Callout  } from 'react-native-maps';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import ProfilePopup from './ProfilePopup';

const Home = ({ navigation }) => {

  const [accidents, setAccidents] = useState([]);
  
  const [showOptions, setShowOptions] = useState(false);
  const [optionsOpacity] = useState(new Animated.Value(0));
  const [iconColor, setIconColor] = useState('#3867D6');
  const [iconSize, setIconSize] = useState(45);

  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/accidents');
        console.log(response.data)
        setAccidents(response.data);
      } catch (error) {
        console.error('Error fetching accidents:', error);
      };
    };  
    fetchAccidents();
  }, []);

  useEffect(() => {
    Animated.timing(optionsOpacity, {
      toValue: showOptions ? 1 : 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [showOptions]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setIconColor(showOptions ? '#3867D6' : '#EB3B5A')
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={silverMapStyle}
        initialRegion={{
          latitude: 44.85855961835391,
          longitude: -0.5813889738864102,
          latitudeDelta: 0.422,
          longitudeDelta: 0.221,
        }}
        >
        
        {accidents.map((accident, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: parseFloat(accident.latitude), longitude: parseFloat(accident.longitude) }}
            title={`Accident ${index + 1}`}
            description={`Date: ${accident.date}, Heure: ${accident.heure}`}
          >
            <View style={styles.circle}>
              <View style={styles.accident} />
            </View>
          </Marker>
          ))}
      </MapView>

      <View style={{alignItems:'center', gap:10,right: 50, bottom: 45, position: 'absolute'}}>
      {showOptions && (
        <Animated.View style={{ opacity: optionsOpacity, gap:10}}>
         <View style={{ width: 40, height: 40, backgroundColor: '#3867D6', borderRadius: 9999, justifyContent: 'center'}}>
            <Icon name='person' color='white' size={30}  onPress={toggleProfilePopup}/>
          </View>
          <View style={{ width: 40, height: 40, backgroundColor: '#3867D6', borderRadius: 9999, justifyContent: 'center'}}>
            <Icon name='description' color='white' size={25} onPress={() => navigation.navigate('Form')} />
          </View>
        </Animated.View>
      )}
        <View style={{ width: 40, height: 40, backgroundColor: iconColor, borderRadius: 9999, justifyContent: 'center'}}>
        <Icon
          name={showOptions ? 'close' : 'add'}
          color='white'
          size={35}
          onPress={toggleOptions}
        />
        </View>
      </View>
      <ProfilePopup navigation={navigation} visible={isProfilePopupVisible} onClose={toggleProfilePopup} />

    </View>
  );
};

const silverMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 200
  },

  accident: {
    backgroundColor: "rgba(235, 59, 90, 1)",
    width: 30,
    height: 30,
    position: "absolute",
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderRadius: 200,
    borderWidth : 4,
    borderColor : "#ffffff",
    zIndex: 2
  }

});

export default Home;

