import 'react-native-gesture-handler';
import React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUp} from './SignUp';
import {OTP} from './OTPScreen';
import {Profile} from './Profile';
import {Profile_two} from './Profile_two';
import {CurrencyList} from './CurrencyList';
import {HomeScreen} from './HomeScreen';
const Stack = createNativeStackNavigator();

export const Authentication = ({setSignOut}) => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: 'Sign Up'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />

      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{title: 'Welcome'}}
        initialParams={{
          setSignOut: setSignOut,
        }}
      />

      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      <Stack.Screen
        name="Profile_two"
        component={Profile_two}
        initialParams={{
          setSignOut: setSignOut,
        }}
      />
      <Stack.Screen name="CurrencyList" component={CurrencyList} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
