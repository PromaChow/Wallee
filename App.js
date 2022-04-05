import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Icon,
  Center,
  Text,
  Spinner,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

//********** Test ********

import {IncomeJournal} from './src/journal';
import Transaction from './src/transaction';
const testTransaction = new Transaction(200, 'user');

const before = new Date();
console.log(before.getTime());

//*********** Test ********

export default App = () => {
  return (
    <NativeBaseProvider>
      <Center bg="info.400" flex={1}>
        <Icon as={FontAwesome} name="rocket" color="danger.600" />
        <Text fontSize="xl">{testTransaction.amount}</Text>
        <Text fontSize="xl">{testTransaction.originator}</Text>
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
