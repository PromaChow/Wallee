import React from 'react';
import firestore from '@react-native-firebase/firestore';


export const ifExist = (uid) =>{
    firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(documentSnapshot => {
        bl = documentSnapshot.exists;
        console.log(bl);
        return bl;
      }
    );
  }



