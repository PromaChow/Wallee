import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import * as React from 'react';
import { styles } from "../styles";
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OTPScreen } from './OTPScreen';
import { auth, app } from '../firebase-config';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';


export const HomeScreen = () => {
  const navigation = useNavigation();
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState(0);

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification={true}
      />

      <TextInput style={{ fontWeight: "bold", marginBottom: 20, borderColor: "#99CC99", borderWidth: 1, borderRadius: 5 }}
        placeholder="phone Number" autoFocus keyboardType='phone-pad' textContentType='telephoneNumber'
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)
          
      }></TextInput>

      <Button
        title="Proceed"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          console.log(phoneNumber);
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            )
              setVerificationId(verificationId);
              console.log(verificationId);
              showMessage({
                text: 'Verification code has been sent to your phone.',
              });
              navigation.navigate('OTPScreen',{verificationId:verificationId,});

            }
            

           catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />

      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      {/* <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text style={{fontSize:30 ,backgroundColor:"#99CC99", padding:20}}>Button</Text>
        </TouchableOpacity> */}
    </SafeAreaView>
  );
}