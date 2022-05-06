import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import React from 'react';

import {
  getUserID,
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
  copy_user,
  getUser,
} from './FireStoreHelperFunctions';

let confirm = null;

const signInWithPhoneNumber = async phoneNumber => {
  auth()
    .signInWithPhoneNumber(phoneNumber)
    .then(confirmation => {
      console.log('confirmation ' + confirmation.verificationId);
      confirm = confirmation;
    });
};

const confirmCode = async code => {
  console.log('code from confirm' + code);
  try {
    console.log('confirmation_1' + confirm.verificationId);
    await confirm.confirm(code);

    return true;
  } catch (error) {
    console.log('Invalid code.');
    return false;
  }
};

const changePhoneNumber = async code => {
  const cred = firebase.auth.PhoneAuthProvider.credential(
    confirm.verificationId,
    code,
  );
  await firebase
    .auth()
    .currentUser.updatePhoneNumber(cred)
    .then(() => {
      console.log('Phone number changed');
    });
};

export {confirmCode, signInWithPhoneNumber, changePhoneNumber};
