import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {signInWithPhoneNumber} from '../Authentication';
import {SafeAreaView, View, Button, TextInput} from 'react-native';

export const SignUp = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [user, setUser] = React.useState();
  const [initializing, setInitializing] = useState(true);

  console.log(phoneNumber);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView>
        <TextInput
          style={{backgroundColor: '#004567'}}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          placeholder="Enter your Phone Number"></TextInput>
        <Button
          title="Proceed"
          style={{backgroundColor: '#000000'}}
          onPress={() => {
            const confirmation = signInWithPhoneNumber(phoneNumber);
            navigation.navigate('OTP');
          }}></Button>
      </SafeAreaView>
    );
  } else {
    navigation.navigate('Profile');
  }
  return <View></View>;
};
