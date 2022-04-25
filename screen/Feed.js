import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { addToStorage, getUserID, retrieve_data } from "../FireStoreHelperFunctions";
import { recognizeImage } from "../mlkit";
import ImgToBase64 from 'react-native-image-base64';
import notifee from '@notifee/react-native';
import { AndroidColor } from '@notifee/react-native';
import SmsAndroid from 'react-native-get-sms-android';
import { PermissionsAndroid } from "react-native";

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
         // addToStorage(user.uid, uri);
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


          <Button title = "recognize Text" onPress={async () => {
          let uri = await launchCamera();
          console.log(uri);
          ImgToBase64.getBase64String(uri)
          .then((base64String)=> {
           console.log("BASE64"+base64String);
          fetch('http://192.168.78.104:4000/image', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            image : base64String
       
    })
  }).then(response =>{
      console.log("response"+response.status);
     
    }).then(data => console.log(data));

           
          })
          .catch(err => console.log("error"+err));

          
          }
        }
          ></Button>

          

<Button title = "recognize Text" onPress={async () => {
          let uri = await launchCamera();
          console.log(uri);
          ImgToBase64.getBase64String(uri)
          .then((base64String)=> {
           console.log("BASE64"+base64String);
          fetch('http://192.168.78.104:4000/image', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            image : base64String
       
    })
  }).then(response =>{
      console.log("response"+response.status);
     
    }).then(data => console.log(data));

           
          })
          .catch(err => console.log("error"+err));

          
          }
        }
          ></Button>


          <Button title = "Refresh" onPress={async()=>{
    

   
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "App Camera Permission",
          message: "App needs Access ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");

        var addrs = ['1234','12345'];


        for(let addr of addrs){
        console.log(addr);
        var filter = {
          box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
    
          minDate: 1650914984931, // timestamp (in milliseconds since UNIX epoch)
          maxDate: Date.now(), // timestamp (in milliseconds since UNIX epoch)

          address: addr
         
        };


SmsAndroid.list(
  JSON.stringify(filter),
  (fail) => {
    console.log('Failed with this error: ' + fail);
  },
  (count, smsList) => {
    console.log('Count: ', count);
    console.log('List: ', smsList);
    var arr = JSON.parse(smsList);

    arr.forEach(function(object) {
      console.log('Object: ' + object);
      console.log('-->' + object.date);
      console.log('-->' + object.body);
    });
  },
);
        }

      }
          
        
        else {
        console.log("Camera permission denied");
       
      }
    }} ></Button>
    </SafeAreaView>
  );
}