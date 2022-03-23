import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, Text, View,TouchableOpacity,Button,Image } from 'react-native';
import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { app,db,storage } from '../firebase-config';
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import {styles} from "../styles";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";




//const res = await db.collection('Users').doc('user_1').set(user);
export const Main = () => {
    
    const[ImageUrl, setUrl] = React.useState('p');
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

    const setProfilePicture = (uid, uri) =>{
      
      const userRef = doc(db, "Users", uid);

      setDoc(userRef,{ProfilePicture:uri},{ merge: true});
    }


    const componentDidMount= async() => {
    if (Platform.OS !== "web") {
      let status = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status;
    }
  }
    const pickImage = async () =>{
      let status = componentDidMount();
      //console.log((await status).granted);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      //console.log(result.uri);
      let localUri = result.uri;
     

      if (result.cancelled === true) {
        return;
      }
  
      handlePhoto(result.uri);
    
    };


    const takePhoto = async () => {
      let status = componentDidMount();
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      handlePhoto(pickerResult.uri);
      
    };

    const handlePhoto = async (localUri) => {
      
      const url = addToStorage('SfyczWmmxFRfMz16UJ4WuPeSD5Q2',localUri);
  
      
    };


    const addToStorage = async (uid,uri) => {
      let filename = uri.split('/').pop();
      console.log(uri+" "+filename);
      let str = uid+"/images/"+filename;
      const storageRef = ref(storage,str);

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(
        () =>{
        getDownloadURL(storageRef)
        .then((url) => {
         setProfilePicture(uid,url);
         console.log(String(url));
         return String(url);
         
         
    // Insert url into an <img> tag to "download"
    })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
});

      blob.close();
    };

    const user = {Name: 'abcd', Age : 20};
  
    
    return(

      <SafeAreaView style={styles.container}>
        <Text>{user.Name}</Text>
        <Button title="Proceed" onPress={addUser} style ={{backgroundColor:"#0076653", marginBottom : 10}}></Button>
        
        <Button title="On cam" onPress={takePhoto} style ={{backgroundColor:"#0076653", marginTop : 50}}></Button>
        <Button title="Pick Image" onPress={pickImage} style ={{backgroundColor:"#0076653", marginTop : 50}}></Button>
       
      </SafeAreaView>
      );
      
      
  }
