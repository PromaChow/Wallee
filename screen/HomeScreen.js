
import React,{useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signInWithPhoneNumber } from '../Authentication';
import { Feed } from './Feed';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TextInput
  } from 'react-native';
import { SignUp } from './SignUp';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const user = firebase.auth().currentUser;
 
  
  if(!user){
      return(
      <SignUp>

      </SignUp>
      );
  }
  else{
      return(<Feed>

      </Feed>
      );
  }
 
  }

