import {
  TransactionListView,
  TransactionDetailView,
} from './src/components/TransactionView';
import React, {useState} from 'react';
import {
  NativeBaseProvider,
  ScrollView,
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
  HStack,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

import Calculator from './src/components/Calculator';
import JournalView from './src/components/JournalView';
import Transaction from './src/transaction';

const colorNames = [
  'secondary',
  'danger',
  'info',
  'rose',
  'teal',
  'emerald',
  'cyan',
];

const colorValues = [600, 800];
export const bgColors = [];
export const fgColors = [];

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
      {/* <Box bg="gray.400" flex={1}>
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
        <ScrollView
          flexDirection={'column'}
          horizontal={true}
          flex="10"
          bg="teal.100">
          <HStack flex="1" space={0.5}></HStack>
        </ScrollView>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="md"
          icon={<Icon color="white" as={Feather} name="plus" size="md" />}
        />
      </Box> */}
      <Center flex={1}>
        <TransactionDetailView
          initialTransaction={new Transaction(500, 'user')}
        />
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
