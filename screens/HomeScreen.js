import { SafeAreaView,StyleSheet, Text, View, TouchableOpacity, TextInput,Button } from 'react-native';
import * as React from 'react';
import {styles} from "../styles";
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { backgroundColor, borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Main} from "./Main"
import { auth,app } from '../firebase-config';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen=()=> {
    const navigation = useNavigation();
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
  
    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = React.useState();
    const attemptInvisibleVerification = false;

    return (
      <SafeAreaView style={styles.container}>
         <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification = {true}
        />

        <TextInput style={{fontWeight:"bold", marginBottom:20, borderColor:"#99CC99", borderWidth:1, borderRadius:5}} placeholder="phone Number" autoFocus keyboardType='phone-pad' textContentType='telephoneNumber' onChangeText={phoneNumber=>setPhoneNumber(phoneNumber
          )}></TextInput>

      <Button
        title="Proceed"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await signInWithCredential(auth, credential);
            showMessage({ text: 'Phone authentication successful 👍' });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: 'center' },
          ]}
          onPress={() => showMessage(undefined)}>
          <Text
            style={{
              color: message.color || 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : (
        undefined
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        {/* <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text style={{fontSize:30 ,backgroundColor:"#99CC99", padding:20}}>Button</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }