import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  signInWithPhoneNumber,
  confirmCode,
  handleVerifyOTP,
  verifyPhoneNumber,
  changePhoneNumber,
} from '../Authentication';

import {
  getUserID,
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
} from '../FireStoreHelperFunctions';

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
} from 'react-native';
import getUUID from 'react-native-fetch-blob/utils/uuid';
import {getUser} from '../FireStoreHelperFunctions';

export const ChangePhoneNumber = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [code, setCode] = React.useState('');

  console.log('phone' + phoneNumber);

  return (
    <SafeAreaView>
      <TextInput
        style={{backgroundColor: '#004567'}}
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        placeholder="Enter your Phone Number"></TextInput>
      <Button
        title="Submit"
        style={{backgroundColor: '#000000'}}
        onPress={async () => {
          await signInWithPhoneNumber(phoneNumber);
        }}></Button>

      <TextInput
        style={{backgroundColor: '#004567'}}
        keyboardType="phone-pad"
        onChangeText={setCode}
        placeholder="Enter OTP"></TextInput>
      <Button
        title="Submit"
        style={{backgroundColor: '#000000'}}
        onPress={async () => {
          changePhoneNumber(code).then(() => {
            navigation.navigate('Feed');
          });
        }}></Button>
    </SafeAreaView>
  );
};
