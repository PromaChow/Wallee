
import React,{useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = React.useState(null);
  const [initializing, setInitializing] = useState(true);
  const [code, setCode] = React.useState('');
  const [user, setUser] = React.useState();

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if(!user){
  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+8801234567890')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
  }
  else{
    navigation.navigate('Profile');
  } 
    return (
        <SafeAreaView>
        <Button title = {user.phoneNumber}></Button>
        </SafeAreaView>
    );
}