import { SafeAreaView,StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import {styles} from "../styles";
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Main} from "./Main"

export const HomeScreen=()=> {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight:"bold", marginBottom:20}}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text style={{fontSize:30 ,backgroundColor:"#FF5520", padding:20}}>Button</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }