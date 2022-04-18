import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

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

export function Feed() {
  const user = firebase.auth().currentUser;
  return (
    <SafeAreaView style={{backgroundColor: '#000000'}}>
      <Text style={{backgroundColor: '#000000', alignItems: 'center'}}>
        {user.uid}
      </Text>
      <Button
        title="Sign Out"
        style={{backgroundColor: '#000000', alignItems: 'center'}}
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
          navigation.navigate('HomeScreen');
        }}></Button>
    </SafeAreaView>
  );
}
