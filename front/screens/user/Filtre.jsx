import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const FilterPopup = ({ visible, onClose, onApplyFilters }) => {
  const [selectedSurface, setSelectedSurface] = useState('');
  const [selectedVisibilite, setSelectedVisibilite] = useState('');
  const [selectedMeteo, setSelectedMeteo] = useState('');

  const applyFilters = () => {
    onApplyFilters({
      surface: selectedSurface,
      visibilite: selectedVisibilite,
      meteo: selectedMeteo,
    });
    onClose();
  };

  const toggleOption = (value, selectedValue, setSelectedValue) => {
    if (selectedValue === value) {
      setSelectedValue(''); // Deselect if already selected
    } else {
      setSelectedValue(value);
    }
  };

  const renderOption = (label, value, selectedValue, setSelectedValue) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedValue === value && styles.selectedOptionButton
      ]}
      onPress={() => toggleOption(value, selectedValue, setSelectedValue)}
    >
      <Text style={[
        styles.optionButtonText,
        selectedValue === value && styles.selectedOptionButtonText
      ]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Filtres</Text>
          
          <View style={styles.section}>
            <Text style={styles.label}>Surface</Text>
            <View style={styles.optionsContainer}>
              {renderOption('Normale', 'Normale', selectedSurface, setSelectedSurface)}
              {renderOption('Verglacee', 'Verglacee', selectedSurface, setSelectedSurface)}
              {renderOption('Mouillee', 'Mouillee', selectedSurface, setSelectedSurface)}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.label}>Luminosité</Text>
            <View style={styles.optionsContainer}>
              {renderOption('Nuit avec éclairage', 'Nuit avec éclairage', selectedVisibilite, setSelectedVisibilite)}
              {renderOption('Nuit sans éclairage', 'Nuit sans éclairage', selectedVisibilite, setSelectedVisibilite)}
              {renderOption('Crépuscule ou Aube', 'Crépuscule ou Aube', selectedVisibilite, setSelectedVisibilite)}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Météo</Text>
            <View style={styles.optionsContainer}>
              {renderOption('Normale', 'Normale', selectedMeteo, setSelectedMeteo)}
              {renderOption('Pluvieux', 'Pluie', selectedMeteo, setSelectedMeteo)}
              {renderOption('Autre', 'Autre', selectedMeteo, setSelectedMeteo)}
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={applyFilters}>
            <Text style={styles.buttonText}>Filtrer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
  },
  selectedOptionButton: {
    backgroundColor: '#4B6584',
    borderColor: '#4B6584',
  },
  optionButtonText: {
    color: '#333',
    textAlign: 'center',
  },
  selectedOptionButtonText: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4B7BEC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  closeButtonText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default FilterPopup;
