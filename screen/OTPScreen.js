import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { confirmCode } from '../Authentication';
import firestore from '@react-native-firebase/firestore';
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
                onPress={() => {
                    confirmCode(code);
                    const user = firebase.auth().currentUser;
                    firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .get()
                    .then(documentSnapshot => {
                        let exists = documentSnapshot.exists;
            
                        if (!exists) {
                             navigation.navigate('Profile');
                        }
                        else navigation.navigate('Feed');
                    });
                }
          > </Button>

        </SafeAreaView >
    )
}