import React,{useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

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

export const Profile=({ route, navigation })=>{
    //const {uid} = route.params;
    return(
        <SafeAreaView>
           <TextInput placeholder='Username' style={{backgroundColor:"#000000", alignItems:'center'}}>
               </TextInput> 
        </SafeAreaView>
    )
}