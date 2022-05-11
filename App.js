import 'react-native-gesture-handler';
import React, {useState} from 'react';
import CreateJournalView from './src/components/CreateJournalView';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
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
//{/* <Calculator transaction={new Transaction('500', 'User')} /> */}

export const getRandomColor = () =>
  Math.floor(Math.random() * colorNames.length);
export const journalKeyMemo = {};

export default App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Journals"
          screenOptions={{
            headerShown: false,
          }}>
          <Drawer.Screen name="Journals" component={MainScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
