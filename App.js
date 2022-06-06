import 'react-native-gesture-handler';
import React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {Profile} from './src/screens/Profile';
import {Feed} from './src/screens/Feed';
import {OTP} from './src/screens/OTPScreen';
import {ChangePhoneNumber} from './src/screens/ChangePhoneNumber';
import {SignUp} from './src/screens/SignUp';
import {Profile_two} from './src/screens/Profile_two';
import {CurrencyList} from './src/screens/CurrencyList';
import ProfileWithFeed from './src/screens/UserProfile';
import notifee, {EventType} from '@notifee/react-native';
import {Notification} from './src/screens/Notification';
import {ChangePhoneNumberOuter} from './src/screens/ChangePhoneNumberOuter';
import {OTPScreenChange} from './src/screens/OTPScreenChange';
import Settings, {Setting} from './src/screens/Settings.js';
import {Identifiers} from './src/screens/Identifiers';
import {HomePage} from './src/screens/HomePage';
import {NativeBaseProvider} from 'native-base';
import {Dimensions} from 'react-native';
import Catalogue from './src/components/Catalogue';
import JournalView from './src/components/JournalView';
import BudgetScreen from './src/screens/BudgetScreen';
import {Budget} from './src/budget';
import listOfJournals, {listOfBudgets} from './src/userSpace';
import {ExpenseJournal, IncomeJournal} from './src/journal';
import Calculator from './src/components/Calculator';
import SideBar from './src/components/Sidebar';
import Test from './src/screens/Test';
import NavCatalogue from './src/components/Catalogue';
import {AutoPilot} from './src/screens/AutoPilot';
import Statistics from './src/screens/Statistics';
import {useIsFocused} from '@react-navigation/native';

import {
  getUserID,
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
} from './src/FireStoreHelperFunctions';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  AppState,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const colorNames = [
  'secondary',
  'danger',
  'info',
  'rose',
  'teal',
  'emerald',
  'cyan',
];

export let keyGen = 0;
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
listOfJournals['Food'] = new ExpenseJournal('Food', 0);
journalKeyMemo['Food'] = getRandomColor();
listOfJournals['Clothing'] = new ExpenseJournal('Clothing', 0);
journalKeyMemo['Clothing'] = getRandomColor();

// Custom Refresh Hook
export const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    setRefresh(!refresh);

    // for (const [key, value] of Object.entries(listOfJournals)) {
    //   update_doc(getUserID(), key, value);
    // }
  }, [isFocused]);
};

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
  let str = 'pr';
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={props => <SideBar {...props} />}>
          <Drawer.Screen name="NavCatalogue" component={NavCatalogue} />
          <Drawer.Screen name="BudgetScreen" component={BudgetScreen} />
          <Drawer.Screen name="AutoPilot" component={AutoPilot} />
          <Drawer.Screen name="Home" component={HomePage} />
          <Drawer.Screen name="UserProfile" component={ProfileWithFeed} />
          <Drawer.Screen name="Statistics" component={Statistics} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="UserProfile" component={UserProfile} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
