import Tuto from './screens/tuto';
import Login from './screens/login'; // Adjust the path based on your project structure
import { StyleSheet, Text, View, } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Other components or content in your main App component */}
      <Login></Login>,
      <Tuto />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
