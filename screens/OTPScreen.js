import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import * as React from 'react';
import { styles } from "../styles";
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, app } from '../firebase-config';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';


export const OTPScreen = ({ route}) => {
  const navigation = useNavigation();
  const {verificationId} = route.params;
  console.log("OTP page"+verificationId);

  const [verificationCode, setVerificationCode] = React.useState();

  const [message, showMessage] = React.useState();


  return (
    <SafeAreaView style={styles.container}>

    
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
            //console.log(auth+" "+credential);
            user = auth.currentUser;
            console.log(user.uid)

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
    
    </SafeAreaView>
  );
}