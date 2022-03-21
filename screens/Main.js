import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { app,db } from '../firebase-config';
import { collection, getDocs } from "firebase/firestore"; 
import {styles} from "../styles";


//const res = await db.collection('Users').doc('user_1').set(user);
export const Main = () => {
  
    const getData = async()=>{
     
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
});
    }

    const user = {Name: 'abcd', Age : 20};
    return(

      <SafeAreaView style={styles.container}>
        <Text>{user.Name}</Text>
        <Button title="Proceed" onPress={getData} style ={{backgroundColor:"#0076653"}}></Button>
      </SafeAreaView>
    );
  }
