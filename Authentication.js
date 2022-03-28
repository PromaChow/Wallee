
import auth from '@react-native-firebase/auth';
import React from 'react';

let confirm = null;

const signInWithPhoneNumber= async(phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("confirmation" + confirmation);
    confirm = confirmation;
    console.log("Code has been sent");
  }

  const confirmCode=async( code)=> {
      console.log("code from confirm"+code);
    try {
    console.log("confirmation_1" + confirm);
      await confirm.confirm(code);

      return true;
    } catch (error) {
      console.log('Invalid code.');
      return false;
    }
  }

  export{signInWithPhoneNumber,confirmCode}