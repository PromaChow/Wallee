import React from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

const getUserID = () => {
  const user = firebase.auth().currentUser;
  if (user) return user.uid;
  else return 'E6lOhV4rPFNFCnJ7MAEZKiSdVuJ2';
};

const add_User = uid => {
  console.log(uid);
  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(documentSnapshot => {
      let exists = documentSnapshot.exists;

      if (!exists) {
        firestore()
          .collection('Users')
          .doc(uid)
          .set({
            name: '',
            currency: null,
            primaryAmount: 0.0,
            lastAccessedDate: 1041379200000,
            profilePhoto: '',
            email: '',
          })
          .then(() => {
            console.log('User added!');
          });
      }
    });
};

const getPhoneNumber = () => {
  const user = firebase.auth().currentUser;
  if (user) return user.phoneNumber;
};

const update_doc = async (uid, key, value) => {
  firebase.firestore().settings({
    ignoreUndefinedProperties: true,
  });
  firestore()
    .collection('Users')
    .doc(uid)
    .update({[`${key}`]: value})
    .then(() => {
      console.log('User updated!');
    });
};

const retrieve_data = async uid => {
  //console.log("hi");
  const user = new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          const document = documentSnapshot.data();
          console.log(document['primaryAmount']);
          //console.log('User data: ', documentSnapshot.data());
          resolve(documentSnapshot.data());
        }
      });
  });
  return await user;
};

const deletePrivFiles = async uid => {
  var dir = uid + '/images/';
  const storageRef = storage().ref(dir);
  storageRef.listAll().then(listResults => {
    const promises = listResults.items.map(item => {
      return item.delete();
    });
    Promise.all(promises);
  });
};
const addToStorage = async (uid, uri) => {
  deletePrivFiles(uid);
  let filename = uri.split('/').pop();
  console.log(uri + ' ' + filename);
  let dir = uid + '/images/' + filename;
  const reference = storage().ref(dir);
  const task = reference.putFile(uri);

  task.on('state_changed', taskSnapshot => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );
  });

  task.then(async () => {
    console.log('Image uploaded to the bucket!');
    const url = await storage().ref(dir).getDownloadURL();
    console.log(url);
    update_doc(uid, 'profilePhoto', url);
  });

  console.log(task instanceof Promise);
};
export {
  getUserID,
  add_User,
  retrieve_data,
  update_doc,
  addToStorage,
  getPhoneNumber,
};
