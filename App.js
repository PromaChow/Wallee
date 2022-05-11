import 'react-native-gesture-handler';
import React, {useState} from 'react';
import CreateJournalView from './src/components/CreateJournalView';
import {
  NativeBaseProvider,
  ScrollView,
  Fab,
  Button,
  Box,
  Icon,
  Center,
  Text,
  HStack,
} from 'native-base';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from './src/screens/mainScreen';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const colorNames = [
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

export const getRandomColor = () =>
  Math.floor(Math.random() * colorNames.length);
export const journalKeyMemo = {};

export default App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <NativeBaseProvider>
      <MainScreen setShowModal={setShowModal} />
      {/* <Calculator transaction={new Transaction('500', 'User')} /> */}
      <CreateJournalView showModal={showModal} setShowModal={setShowModal} />
    </NativeBaseProvider>
  );
};
