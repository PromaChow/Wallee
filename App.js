/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screen/HomeScreen';
import {Profile} from './screen/Profile';
import {Feed} from './screen/Feed';
import {OTP} from './screen/OTPScreen';
import {ChangePhoneNumber} from './screen/ChangePhoneNumber';
import {SignUp} from './screen/SignUp';
import {Profile_two} from './screen/Profile_two';
import {CurrencyList} from './screen/CurrencyList';
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

const Section = ({children, title}): Node => {
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
const App: () => Node = () => {
  let str = 'pr';
  return (
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
          options={{title: 'Welcome'}}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        <Stack.Screen name="Profile_two" component={Profile_two} />
        <Stack.Screen name="CurrenyList" component={CurrencyList} />
      </Stack.Navigator>
    </NavigationContainer>
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
