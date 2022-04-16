import React, {useState} from 'react';
import {
  NativeBaseProvider,
  Fab,
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
import JournalView from './src/components/JournalView';
import Calculator from './src/components/Calculator';
const testTransaction = new Transaction(200, 'user');

const colorNames = [
  'secondary',
  'tertiary',
  'danger',
  'success',
  'info',
  'rose',
  'teal',
  'emerald',
  'cyan',
];

const colorValues = [200, 400, 600];
const bgColors = [];
const fgColors = [];

colorValues.forEach(number => {
  colorNames.forEach(name => {
    bgColors.push(`${name}.${number}`);
    fgColors.push(`${name}.${number + 100}`);
  });
});

//*********** Test ********

export default App = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <NativeBaseProvider>
      <Box bg="gray.400" flex={1}>
        <Box>
          <Icon
            mt="2"
            ml="2"
            position="absolute"
            zIndex={2}
            size="md"
            as={Feather}
            name="menu"
            color="white"></Icon>
          <Center
            bg="primary.500"
            _text={{
              padding: '1',
              fontSize: '2xl',
              color: 'white',
            }}>
            Journals
          </Center>
        </Box>
        <JournalView />
        <Fab
          renderInPortal={false}
          shadow={2}
          size="lg"
          icon={<Icon color="white" as={Feather} name="plus" size="lg" />}
        />
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
