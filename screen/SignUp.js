
import React,{useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signInWithPhoneNumber } from '../Authentication';
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

export const SignUp = () => {
  const navigation = useNavigation();
  const [phoneNumber,setPhoneNumber] = React.useState();
  const [user, setUser] = React.useState();
  const [initializing, setInitializing] = useState(true);
 

  console.log(phoneNumber);
  
  return(
      <SafeAreaView>
          <TextInput style={{backgroundColor: "#004567"}} keyboardType="phone-pad"
                     onChangeText={setPhoneNumber} placeholder="Enter your Phone Number"
          ></TextInput>
          <Button title ="Proceed" style={{backgroundColor: "#000000"}} 
                  onPress = {()=>{ signInWithPhoneNumber(phoneNumber);
                                  navigation.navigate('OTP')}}
          ></Button>
      </SafeAreaView>
  )
}

