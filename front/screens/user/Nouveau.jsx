import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Nouveau = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Antoine Martin - Police Municipale</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Accident matériel. </Text>
              <Text style={styles.time}>il y a 12 minutes</Text>
            </View>

            <TouchableOpacity>
            <Text style={styles.seeMore}>Voir plus</Text>
            </TouchableOpacity>

          </View>
        </View>
        <Image
          style={styles.image}
          source={{ uri: 'https://via.placeholder.com/80x80' }}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Stéphanie Leroy - Pompier</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Accident matériel. </Text>
              <Text style={styles.time}>il y a 2 heures</Text>
            </View>

            <TouchableOpacity>
            <Text style={styles.seeMore}>Voir plus</Text>
            </TouchableOpacity>

          </View>
        </View>
        <Image
          style={styles.image}
          source={{ uri: 'https://via.placeholder.com/80x80' }}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Cédric Da Lucas - Agent de la route</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Accident physique. </Text>
              <Text style={styles.time}>il y a 5 heures</Text>
            </View>

            <TouchableOpacity>
            <Text style={styles.seeMore}>Voir plus</Text>
            </TouchableOpacity>

          </View>
        </View>
        <Image
          style={styles.image}
          source={{ uri: 'https://via.placeholder.com/80x80' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 60,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 25,
    display: 'flex',
  },
  card: {
    width: 318,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    display: 'flex',
  },
  cardContent: {
    flex: 1,
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 14,
    display: 'flex',
  },
  title: {
    alignSelf: 'stretch',
    color: '#161616',
    fontSize: 15,
    fontWeight: '500',
  },
  subtitleContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  subtitle: {
    color: '#161616',
    fontSize: 14,
    fontWeight: '400',
  },
  time: {
    color: '#A5B1C2',
    fontSize: 12,
    fontWeight: '400',
  },
  seeMore: {
    textAlign: 'right',
    color: '#161616',
    fontSize: 13,
    fontWeight: '700',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  separator: {
    width: 328,
    height: 1,
    marginBottom: 10,
    backgroundColor: '#EEEEEE',
  },
});

export default Nouveau;
