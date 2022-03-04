import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {styles} from "../styles";


export const Main = () => {
    return(
      <SafeAreaView style={styles.container}>
        <Text>Hello</Text>
      </SafeAreaView>
    );
  }
