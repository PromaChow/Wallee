import 'react-native-gesture-handler';
import React, {useState} from 'react';
import CreateJournalView from './src/components/CreateJournalView';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Catalogue from './src/components/Catalogue';
import JournalView from './src/components/JournalView';
import BudgetScreen from './src/screens/BudgetScreen';
import {Budget} from './src/budget';
import listOfJournals, {listOfBudgets} from './src/userSpace';
import {IncomeJournal} from './src/journal';
import Calculator from './src/components/Calculator';
import SideBar from './src/components/Sidebar';
import Test from './src/screens/Test';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const Stack = createNativeStackNavigator();
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

/*
  *
Remove Next Few lines
*
*/
listOfJournals['Dummy'] = new IncomeJournal('Dummy');
journalKeyMemo['Dummy'] = getRandomColor();
listOfBudgets['Dummy'] = new Budget(listOfJournals['Dummy'], 20);

export default App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Catalogue"
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={props => <SideBar {...props} />}>
          <Drawer.Screen name="Catalogue" component={Catalogue} />
          <Drawer.Screen name="JournalView" component={Calculator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
