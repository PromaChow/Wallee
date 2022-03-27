import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Icon,
  Center,
  Text,
  Spinner,
} from 'native-base';
import Test from 'react-native-vector-icons/FontAwesome';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NativeBaseProvider>
      <Center bg="info.400" flex={1}>
        <Icon as={Test} name="rocket" color="danger.600" />
        <Text fontSize="xl">Hello World</Text>
      </Center>
    </NativeBaseProvider>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
