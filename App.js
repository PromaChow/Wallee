import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {styles} from "./styles";
import { HomeScreen} from "./screens/HomeScreen"
import { Main} from "./screens/Main"
import firebase from "./firebase.mjs"
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator(); 
export default function App() {
  console.log(userDocument);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name ="Home"/>
        <Stack.Screen component={Main} name ="Main"></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  
  );
  }





