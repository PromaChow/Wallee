/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
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
import {UserProfile} from './src/screens/UserProfile';
import notifee, {EventType} from '@notifee/react-native';
import {Notification} from './src/screens/Notification';
import {ChangePhoneNumberOuter} from './src/screens/ChangePhoneNumberOuter';
import {OTPScreenChange} from './src/screens/OTPScreenChange';
import {Setting} from './src/screens/Setting.js';
import {Identifiers} from './src/screens/Identifiers';
import {HomePage} from './src/screens/HomePage';
import {NativeBaseProvider} from 'native-base';
import {Dimensions} from 'react-native';
import Catalogue from './src/components/Catalogue';
import BudgetScreen from './src/screens/BudgetScreen';
import {Budget} from './src/budget';
import listOfJournals, {listOfBudgets} from './src/userSpace';
import {ExpenseJournal, IncomeJournal} from './src/journal';
import Calculator from './src/components/Calculator';
import SideBar from './src/components/Sidebar';
import NavCatalogue from './src/components/Catalogue';
import AutoPilot from './src/screens/AutoPilot';
import {PrefferedCurrencyOuter} from './src/screens/PrefferedCurrencyOuter';
import {PreferredCurrencytwo} from './src/screens/PreferredCurrencytwo';
import {PreferredCurrencyList} from './src/screens/PreferredCurrencyList';
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
listOfJournals['Dummy'] = new ExpenseJournal('Dummy', 40);
journalKeyMemo['Dummy'] = getRandomColor();

import {
  getUserID,
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
} from './FireStoreHelperFunctions';

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
  ProgressBarAndroid,
  AppState,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const Stack = createNativeStackNavigator();
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
    // <NativeBaseProvider>
    //   <NavigationContainer>
    //     <Drawer.Navigator
    //       initialRouteName="Test"
    //       screenOptions={{
    //         headerShown: false,
    //       }}
    //       drawerContent={props => <SideBar {...props} />}>
    //       <Drawer.Screen name="Feed" component={Feed} />
    //       <Drawer.Screen name="NavCatalogue" component={NavCatalogue} />
    //       <Drawer.Screen name="BudgetScreen" component={BudgetScreen} />
    //       <Drawer.Screen name="AutoPilot" component={AutoPilot} />
    //     </Drawer.Navigator>
    //   </NavigationContainer>
    // </NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{title: 'Welcome'}}
        />

        <Stack.Screen name="OTP" component={OTP} options={{title: 'Welcome'}} />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Welcome'}}
        />

        <Stack.Screen
          name="ChangePhoneNumber"
          component={ChangePhoneNumber}
          options={{headerShown: true, title: 'Change Number'}}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        <Stack.Screen name="Profile_two" component={Profile_two} />
        <Stack.Screen name="CurrenyList" component={CurrencyList} />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false, title: 'Welcome'}}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{headerShown: false, title: 'Welcome'}}
        />

        <Stack.Screen
          name="ChangePhoneNumberOuter"
          component={ChangePhoneNumberOuter}
          options={{headerShown: false, title: 'Welcome'}}
        />

        <Stack.Screen
          name="OTPScreenChange"
          component={OTPScreenChange}
          options={{headerShown: false, title: 'Welcome'}}
        />

        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{headerShown: false, title: 'Welcome'}}
        />

        <Stack.Screen
          name="Identifiers"
          component={Identifiers}
          options={{headerShown: false, title: 'Welcome'}}
        />

        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false, title: 'Welcome'}}
        />

        <Stack.Screen
          name="PrefferedCurrencyOuter"
          component={PrefferedCurrencyOuter}
          options={{headerShown: false, title: 'Welcome'}}
        />

        <Stack.Screen
          name="PreferredCurrencytwo"
          component={PreferredCurrencytwo}
          options={{headerShown: false, title: 'Welcome'}}
        />

        <Stack.Screen
          name="PreferredCurrencyList"
          component={PreferredCurrencyList}
          options={{headerShown: false, title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>

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
