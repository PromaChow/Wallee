import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { confirmCode } from '../Authentication';
import firestore from '@react-native-firebase/firestore';
import { add_User } from '../FireStoreHelperFunctions';
import firebase from '@react-native-firebase/app'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TextInput
} from 'react-native';

export const OTP = ({ navigation }) => {

    const [code, setCode] = React.useState('');

    console.log(code);
    return (
        <SafeAreaView>
            <TextInput style={{ backgroundColor: "#004567" }} keyboardType="phone-pad"
                onChangeText={setCode} placeholder="Enter OTP"
            ></TextInput>
            <Button title="Proceed" style={{ backgroundColor: "#000000" }}
                onPress={async() => {
                    console.log("Otp")
                    await confirmCode(code).then(()=>{
                    const user = firebase.auth().currentUser;
                    console.log("o"+user.uid);
                    if(!user) console.log("hi");
                    firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .get()
                    .then(documentSnapshot => {
                        let exists = documentSnapshot.exists;
                        console.log(user.uid +" "+ exists);
                        if (!exists) {
                             
                             add_User(user.uid);
                             navigation.navigate('Profile');
                        }
                        else navigation.navigate('Feed');
                    });
                }
                    )
            }
            }
          ></Button>

        </SafeAreaView >
    )
}