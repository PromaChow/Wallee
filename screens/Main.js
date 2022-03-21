import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { app,db } from '../firebase-config';
import {styles} from "../styles";


//const res = await db.collection('Users').doc('user_1').set(user);
export const Main = () => {
    const user = {Name: 'abcd', Age : 20};
    return(

      <SafeAreaView style={styles.container}>
        <Text>{user.Name}, {user.Age}</Text>
      </SafeAreaView>
    );
  }
