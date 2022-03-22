import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { app,db,storage } from '../firebase-config';
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import {styles} from "../styles";
import * as ImagePicker from 'expo-image-picker';
import {ref } from "firebase/storage";



//const res = await db.collection('Users').doc('user_1').set(user);
export const Main = () => {
    const [image, setImage] = React.useState(null);
    const getData = async()=>{
    
     
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    });
    }

    const addUser =  ()=>{
     
      const userRef = doc(db, "Users", "SfyczWmmxFRfMz16UJ4WuPeSD5Q2");
      setDoc(userRef,{username:'Prom'},{ merge: true});
   
    }
    const addProfilePicture = async () =>{
      const imagesRef = ref(storage, 'images');

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result.uri);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    
   
    }


    const user = {Name: 'abcd', Age : 20};
    return(

      <SafeAreaView style={styles.container}>
        <Text>{user.Name}</Text>
        <Button title="Proceed" onPress={addUser} style ={{backgroundColor:"#0076653", marginBottom : 10}}></Button>
        <Button title="Upload" onPress={addProfilePicture} style ={{backgroundColor:"#0076653", marginTop : 50}}></Button>
      </SafeAreaView>
    );
  }
