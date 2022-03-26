import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { update_doc } from '../FireStoreHelperFunctions';
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

export const Profile = ({ route, navigation }) => {
    //const {uid} = route.params;
    const [username, setName] = React.useState('');
    const user = firebase.auth().currentUser;
    console.log(username);
    return (
        <SafeAreaView>
            <TextInput placeholder='Username' style={{ backgroundColor: "#000000", alignItems: 'center' }} onChangeText={setName}>
            </TextInput>
            <Button title="Okay" onPress={async () => {
                
                { update_doc(user.uid, 'name', username) }
                navigation.navigate('Feed');
            }}></Button>
        </SafeAreaView>
    )
}