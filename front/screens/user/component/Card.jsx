import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

const Card = ({ type, date, title, subtitle, summary }) => {
  let iconName, iconBackground, cardBackground, titleText;

  switch (type) {
    case 'info':
      iconName = 'info';
      iconBackground = styles.iconBackgroundInfo;
      cardBackground = styles.cardBackgroundInfo;
      titleText = 'INFORMATION';
      break;
    case 'travaux':
      iconName = 'construction';
      iconBackground = styles.iconBackgroundTravaux;
      cardBackground = styles.cardBackgroundTravaux;
      titleText = 'TRAVAUX';
      break;
    case 'prévention':
      iconName = 'warning';
      iconBackground = styles.iconBackgroundPrevention;
      cardBackground = styles.cardBackgroundPrevention;
      titleText = 'PREVENTION';
      break;
    default:
      iconName = 'info';
      iconBackground = styles.iconBackgroundDefault;
      cardBackground = styles.cardBackgroundDefault;
      titleText = 'INFO';
      break;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconBackground, iconBackground]}>
          <Icon name={iconName} color="white" size={24} />
        </View>
      </View>
      <View style={[styles.cardContent, cardBackground]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{titleText}</Text>
          <Text style={styles.cardDate}>{new Date(date).toLocaleDateString()}</Text>
        </View>
        {/* <Text style={styles.cardSummary}>{summary}</Text> */}
        {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        <TouchableOpacity>
          <Text style={styles.cardLink}>Voir plus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackgroundInfo: {
    backgroundColor: '#2D98DA',
  },
  iconBackgroundTravaux: {
    backgroundColor: '#4B6584',
  },
  iconBackgroundPrevention: {
    backgroundColor: '#8854D0',
  },
  iconBackgroundDefault: {
    backgroundColor: '#CCCCCC',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
    padding: 20,
    borderRadius: 10,
    
  },
  cardBackgroundInfo: {
    backgroundColor: 'rgba(45, 152, 218, 0.10)',
  },
  cardBackgroundTravaux: {
    backgroundColor: 'rgba(75, 101, 132, 0.10)',
  },
  cardBackgroundPrevention: {
    backgroundColor: 'rgba(136, 84, 208, 0.10)',
  },
  cardBackgroundDefault: {
    backgroundColor: 'rgba(204, 204, 204, 0.10)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  cardDate: {
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginTop: 20,
    marginBottom: 10
  },
  cardLink: {
    fontSize: 13,
    fontWeight: '700',
    color: 'black',
    textAlign: 'right',
    marginTop: 10,
  },
});

export default Card;
