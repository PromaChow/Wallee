import { SafeAreaView,StyleSheet, Text, View, TouchableOpacity, TextInput,Button } from 'react-native';
import * as React from 'react';
import {styles} from "../styles";
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { backgroundColor, borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import CurrencyPicker from "react-native-currency-picker"
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import {db} from '../firebase-config';
import { FakeCurrencyInput } from 'react-native-currency-input';

export const CurrencyScreen=()=> {
    const [currencyType,setCurrencyType] = React.useState();
    const[currencyName,setCurrencyName] = React.useState("EUR");
    const [value, setValue] = React.useState(0); // can also be null
    const[sign,setSign] = React.useState('$')
    console.log(currencyType);

    

    const UpdateCurrencyType= (uid, curr) =>{
      
        const userRef = doc(db, "Users", uid);
  
        setDoc(userRef,{CurrencyType:curr},{ merge: true});
      }
  
      const UpdatePrimaryAmount = (uid, curr) =>{
      
        const userRef = doc(db, "Users", uid);
  
        setDoc(userRef,{PrimaryAmount:value},{ merge: true});
      }
    return (
      <SafeAreaView  style={styles.container}>
      
  
 <CurrencyPicker
   currencyPickerRef={(ref) => {currencyPickerRef = ref}}
   enable={true}
   darkMode={true}
   currencyCode={currencyName}
   showFlag={true}
   showCurrencyName={true}
   showCurrencyCode={true}
   onSelectCurrency={(currencyType) => { setCurrencyType(currencyType); UpdateCurrencyType("SfyczWmmxFRfMz16UJ4WuPeSD5Q2",currencyType); setCurrencyName(currencyType["code"]);
                    setSign(currencyType["symbol_native"])}}
   showNativeSymbol={true}
   showSymbol={false}
   containerStyle={{
       container: {},
       flagWidth: 25,
       currencyCodeStyle: {},
       currencyNameStyle: {},
       symbolStyle: {},
       symbolNativeStyle: {}

   }}
   modalStyle={{
       container: {},
       searchStyle: {},
       tileStyle: {},
       itemStyle: {
         itemContainer: {},
         flagWidth: 25,
         currencyCodeStyle: {},
         currencyNameStyle: {},
         symbolStyle: {},
         symbolNativeStyle: {}
       }
   }}
   title={"Currency"}
   searchPlaceholder={"Search"}
   showCloseButton={true}
   showModalTitle={true}
 />






    <FakeCurrencyInput
      value={value}
      onChangeValue={(value)=>{setValue(value), UpdatePrimaryAmount("SfyczWmmxFRfMz16UJ4WuPeSD5Q2",value)}}
      prefix={sign}
      delimiter=","
      separator="."
      precision={2}
      onChangeText={(formattedValue) => {
        // ...
      }}
    />

  
      </SafeAreaView>
    );
  }