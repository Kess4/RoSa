import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text, Easing, TouchableOpacity } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import FilterPopup from './Filtre';

const UserHome = ({ navigation }) => {
  const [accidents, setAccidents] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [optionsOpacity] = useState(new Animated.Value(0));
  const [iconColor, setIconColor] = useState('#3867D6');
  const [iconSize, setIconSize] = useState(45);
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [filters, setFilters] = useState({});

  const toggleFilterPopup = () => {
    setIsFilterPopupVisible(!isFilterPopupVisible);
  };

  const applyFilters = (filters) => {
    setFilters(filters);
    // Implement the logic to filter the accidents based on the applied filters
  };

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/accidents');
        setAccidents(response.data);
      } catch (error) {
        console.error('Error fetching accidents:', error);
      }
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
    setIconColor(showOptions ? '#3867D6' : '#EB3B5A');
  };

  const filteredAccidents = accidents.filter(accident => {
    if (filters.surface && accident.qualite_de_la_surface !== filters.surface) return false;
    if (filters.visibilite && accident.visibilite !== filters.visibilite) return false;
    if (filters.meteo && accident.meteo !== filters.meteo) return false;
    return true;
  });

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
        {filteredAccidents.map((accident, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: parseFloat(accident.latitude), longitude: parseFloat(accident.longitude) }}
            title={`Accident ${index + 1}`}
            description={`Collision: ${accident.type_de_collision},\nLieu: ${accident.commune} ${accident.code_postal},\nIndice: ${accident.indice_risque_id}`}
          >
            <View style={styles.circle}>
              <View style={styles.accident} />
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={{ right: 20, top: 80, position: 'absolute' }}>
        <View style={{ width: 50, height: 50, borderRadius: 9999, justifyContent: 'center' }}>
          <Icon
            name='notifications'
            type='ionicon'
            color='black'
            size={30}
            onPress={() => navigation.navigate('Notif')}
          />
        </View>
      </View>

      <View style={{ left: 20, top: 80, position: 'absolute' }}>
        <View style={{ width: 50, height: 50, borderRadius: 9999, justifyContent: 'center' }}>
          <Icon
            name='chevron-back'
            type='ionicon'
            color='black'
            size={35}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      <View style={{ bottom: 40, position: 'absolute' }}>
        <TouchableOpacity onPress={toggleFilterPopup} style={styles.button}>
          <Icon
            name='filter'
            type='ionicon'
            color='white'
            size={25}
          />
          <Text style={styles.buttonText}>Filtrer</Text>
        </TouchableOpacity>
      </View>

      <FilterPopup visible={isFilterPopupVisible} onClose={toggleFilterPopup} onApplyFilters={applyFilters} />
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

  button: {
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#4B7BEC',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  buttonText: {
    textAlign: 'justify',
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    flexWrap: 'wrap',
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

export default UserHome;
