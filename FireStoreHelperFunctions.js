import React from 'react';
import firestore from '@react-native-firebase/firestore';


const ifExist = (uid,b) => {
    console.log("hek");
    firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists){
                console.log("hi");
                b = true;
                return true;
            }
            else{
                b = false;
                return false;
            }
                
        }
        );
        
}


const add_User = (uid) => {
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
                        primaryAmount: 0.00
                    })
                    .then(() => {
                        console.log('User added!');
                    });
            }
        });
}


const update_doc = async (uid, key, value) => {
    
    firestore()
        .collection('Users')
        .doc(uid)
        .update(
          {[`${ key }`] : value}
        )
        .then(() => {
            console.log('User updated!');
        });
}


const retrieve_data = async (uid) => {
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


}


export {ifExist, add_User, retrieve_data, update_doc };