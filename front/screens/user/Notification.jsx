import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Text } from 'react-native';
import Nouveau from './Nouveau';
import Info from './Info';
import { Icon } from '@rneui/themed';

const Tab = createMaterialTopTabNavigator();

function Notifications({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name='chevron-back-outline'
          type='ionicon'
          size={35}
          onPress={() => navigation.goBack()}
          containerStyle={styles.icon}
        />
        <Text style={styles.headerText}>Informations</Text>
      </View>
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16, fontWeight: '600' },
            tabBarIndicatorStyle: { backgroundColor: '#3867D6' },
          }}
        >
          <Tab.Screen name="Nouveaux" component={Nouveau} />
          <Tab.Screen name="Activités" component={Info} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20, // Add space between header and tab navigator
  },
  icon: {
    position: 'absolute',
    left: 0,
  },
  headerText: {
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 41,
  },
  tabContainer: {
    flex: 1,
  },
});

export default Notifications;
