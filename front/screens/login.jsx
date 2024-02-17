import * as React from "react";
import { View, Text, setState} from "react-native";
import { NativeBaseProvider, Box, Center, Select, CheckIcon, Heading, VStack, FormControl, Link, Input, Button, HStack, Image, Icon, Pressable, Flex} from "native-base";
import { MaterialIcons } from "@expo/vector-icons"; 



const Tuto = ({navigation}) => {
  
//   const [Email, setUserEmail] = React.useState('');
//   const [Password, setUserPassword] = React.useState('');
//     const handleLogin = (credentials) => {
//       credentials.preventDefault();
//       console.log(Email, Password);
  
//       axios
//         .post('http://172.20.10.2:3000/user')
//         .then((response) => {
//           console.log(response);
//           if(response.status === 200) {
//             console.log("login successful")
//             }
//         }).catch((error) => {
//           console.error(error);
//         })
//     }
    return <NativeBaseProvider>
     <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <View style={{paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'flex'}}>
            <Text style={{textAlign: 'justify', color: '#EB3B5A', fontSize: 40, fontWeight: '800', letterSpacing: 16, wordWrap: 'break-word'}}>ROSA</Text>
      </View>
      <View style={{width: 240, height: 276.88, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <Image marginLeft={'auto'} marginRight={'auto'} source={require('../assets/logo.png')} alt="Logo"/>
      </View>
  
          <VStack space={3} mt="5">
            <FormControl>
              <Input InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="Nom d'utilisateur" onChangeText={(Email) =>
                  setUserEmail(Email)}
              />
              <Input mt="3" InputLeftElement={<Icon as={<MaterialIcons name="visibility-off" />} size={5} ml="2" color="muted.400" />}  type={"password"} placeholder="Mot de passe" onChangeText={(Password) => setUserPassword(Password)}></Input>
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
                Mot de passe oublié ?
              </Link>
            </FormControl>
            <Button type="submit" onPressIn={() => navigation.navigate('Form')} style={{width: '150px', height: '50px', paddingLeft: 26, paddingRight: 26, paddingTop: 14, paddingBottom: 14, backgroundColor: '#4B7BEC', borderRadius: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <Text style={{textAlign: 'justify', color: 'white', fontSize: 17, fontWeight: '700', wordWrap: 'break-word'}}>Se connecter</Text> 
            </Button>  
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  };

export default Tuto;