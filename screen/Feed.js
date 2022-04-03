import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { addToStorage } from "../FireStoreHelperFunctions";
import { recognizeImage } from "../mlkit";

import {
  launchImageLibrary,
  launchCamera,
} from "../imageHandlerFunctions";
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
} from "react-native";
// var tesseract = require('../tesseract');
// console.log(tesseract);
export const Feed=() => {

  const user = firebase.auth().currentUser;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "#000000" }}>
      
      <Button
        title="choose Image"
        onPress={async () => {
          let uri = await launchImageLibrary();
          console.log(uri);
          addToStorage(user.uid, uri);
        }}
      ></Button>

      <Button title="choose cam" onPress={async () => {
          let uri = await launchCamera();
          console.log(uri);
          addToStorage(user.uid, uri);
          
          }}></Button>

         
           <Button title="Sign Out" style={{backgroundColor:"#000000", alignItems:'center'}} 
          onPress={async  () =>{await auth()
            .signOut()
            .then(() => {
              console.log('User signed out!'); navigation.navigate('SignUp');});
           
             }} >
               </Button>



          <Button title = {user.uid}></Button>

          <Button title = "recognize Text" onPress={async () => {
          let uri = await launchCamera();
          console.log(uri);
          if(uri){
            try{
              const response = await recognizeImage(uri);
              console.log(response);
            }
            catch (error){
              console.log(error);
            }
          }
          
          }
        }
          ></Button>
    </SafeAreaView>
  );
}