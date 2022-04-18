import React from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const ifExist = (uid, b) => {
  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        console.log('hi');
        b = true;
        return true;
      } else {
        b = false;
        return false;
      }
    });
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
          })
          .then(() => {
            console.log('User added!');
          });
      }
    });
};

const update_doc = async (uid, key, value) => {
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
  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(documentSnapshot => {
      console.log('User exists: ', documentSnapshot.exists);

      if (documentSnapshot.exists) {
        console.log('User data: ', documentSnapshot.data());
      }
    });
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
export {ifExist, add_User, retrieve_data, update_doc, addToStorage};
