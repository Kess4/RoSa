import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import axios from 'axios';
import Card from './component/Card';

const Info = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/infos');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  const encours = data.filter(item => item.etat === 'en cours');
  const done = data.filter(item => item.etat === 'terminé');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>En cours</Text>
      </View>

      {encours.map((item, index) => (
        <Card
          key={index}
          type={item.tag.toLowerCase()}
          date={item.date}
          title={item.titre}
          subtitle={item.subtitle}
          // summary={item.resume}
        />
      ))}

      <View style={styles.header}>
        <Text style={styles.headerText}>Terminé</Text>
      </View>

      {done.map((item, index) => (
        <Card
          key={index}
          type={item.tag.toLowerCase()}
          date={item.date}
          title={item.titre}
          subtitle={item.subtitle}
          // summary={item.resume}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 30,
    flexGrow: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 42,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#161616',
  },
});

export default Info;
