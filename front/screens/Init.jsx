import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Button, Image, Svg} from "native-base";


// import Svg from 'react-native-svg';

function Init ({navigation}) {
  return (

    <NativeBaseProvider>
    <View style={{width: '100%', height: '100%', paddingLeft: 43, paddingRight: 43, paddingTop: 187, paddingBottom: 187, background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 35, display: 'inline-flex'}}>
      <View style={{paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'flex'}}>
        <Text style={{textAlign: 'justify', color: '#EB3B5A', fontSize: 40, fontWeight: '800', letterSpacing: 16, wordWrap: 'break-word'}}>ROSA</Text>
      </View>
      <View style={{width: 240, height: 276.88, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <Image marginLeft={'auto'} marginRight={'auto'} source={require('../assets/logo.png')} alt="Logo"/>
      </View>
        <Button type="submit" onPressIn={() => navigation.navigate('Login')} style={{width: '150px', height: '50px', paddingLeft: 26, paddingRight: 26, paddingTop: 14, paddingBottom: 14, backgroundColor: '#4B7BEC', borderRadius: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <Text style={{textAlign: 'justify', color: 'white', fontSize: 17, fontWeight: '700', wordWrap: 'break-word'}}>Commencer</Text> 
        </Button>     
    </View>
    </NativeBaseProvider>
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

export default Init;