import React, {useState} from 'react';
import {
  NativeBaseProvider,
  Modal,
  Input,
  FormControl,
  Button,
  Box,
  Icon,
  Center,
  Text,
  Spinner,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

//********** Test ********

import {IncomeJournal} from './src/journal';
import Transaction from './src/transaction';
import Calculator from './src/components/Calculator';
const testTransaction = new Transaction(200, 'user');

//*********** Test ********

export default App = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <NativeBaseProvider>
      <Center bg="tertiary.400"></Center>
      <Box flex="1" width="100%">
        <Calculator />
      </Box>
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
