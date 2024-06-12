import { Alert, VStack, HStack, IconButton, CloseIcon, Box, Text, Center, NativeBaseProvider } from "native-base";
import {View} from 'react-native';
import * as React from "react";


function Info() {
  return (
  <NativeBaseProvider>
    <View>
      <Center>
        <Alert maxW="400" status="info" colorScheme="info">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  Information
                </Text>
              </HStack>
              <IconButton variant="unstyled" _focus={{borderWidth: 0}} icon={<CloseIcon size="3" />} _icon={{color: "coolGray.600"}} />
            </HStack>
            <Box pl="6" _text={{color: "coolGray.600"}}>
              <Text>
                Plusieurs routes départementales recouverte d’une couche de béton  lumineux, un revêtement plus écolo
              </Text>
            </Box>
          </VStack>
        </Alert>
      </Center>
    </View>
  </NativeBaseProvider>
  );
}

export default Info;