//import * as ImagePicker from "react-native-image-picker";
import { PermissionsAndroid } from "react-native";
import React from "react";
import { addToStorage } from "./FireStoreHelperFunctions";
import ImagePicker from 'react-native-image-crop-picker';
var uri;

const launchCamera = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message: "App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission given");
      let options = {
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };

      const imageReceived = new Promise((resolve, reject) => {
        try {
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            freeStyleCropEnabled : true,
            cropperCircleOverlay:true,
          }).then(image => {
            console.log(image.path);
            resolve(image.path);
          });
        } catch (err) {
          if (err.message !== 'User cancelled image selection') {
            reject();
            console.error(err);
          }
        }
      });
        return await imageReceived;
    } else {
      console.log("Camera permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};


const launchImageLibrary = async () => {
  const imageReceived = new Promise((resolve, reject) => {
  try {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled : true,
      cropperCircleOverlay:true,
    }).then(image => {
      console.log(image.path);
      resolve(image.path);
    });
  } catch (err) {
    if (err.message !== 'User cancelled image selection') {
      reject();
      console.error(err);
    }
  }
});
  return await imageReceived;
}

export { launchImageLibrary,launchCamera };