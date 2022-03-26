import * as ImagePicker from "react-native-image-picker"
import { PermissionsAndroid } from 'react-native';
import React from 'react';
import { addToStorage } from "./FireStoreHelperFunctions";
var uri;

const launchCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
    
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                 uri =  response.assets[0].uri;
                 console.log(uri);
                 addToStorage('5opQHiDLez9N6oAgHQe4', uri);
    
            }
        });
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

const launchImageLibrary =  async() => {
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    
    ImagePicker.launchImageLibrary (options, (response) => {
        // console.log('Response = ', response.assets[0].uri);
        
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
        } else {
             uri =  response.assets[0].uri;
             return Promise.resolve(uri);
             addToStorage('5opQHiDLez9N6oAgHQe4', uri);
          //  console.log(uri);
            
        }
    });
    

}


const storeImage = () => {
    console.log(uri);
}



export { launchImageLibrary, launchCamera, storeImage };

