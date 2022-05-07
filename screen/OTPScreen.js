import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {confirmCode} from '../Authentication';
import firestore from '@react-native-firebase/firestore';
import {add_User} from '../FireStoreHelperFunctions';
import firebase from '@react-native-firebase/app';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AnimatedLinearGradient, {
  presetColors,
} from 'react-native-animated-linear-gradient';
import CountDown from 'react-native-countdown-component';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export const OTP = ({route, navigation}) => {
  const [code, setCode] = React.useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const {phoneNumber} = route.params;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log('code from OTP' + code);
  return (
    <SafeAreaView style={styles.content}>
      <Modal
        transparent={true}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: '#033030',
              opacity: 0.5,
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',
                marginTop: 10,
                fontFamily: 'fantasy',
                fontSize: 20,
              }}>
              Sorry
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',
                margin: 20,
                marginTop: 40,
                fontFamily: 'fantasy',
              }}>
              If you didn't get the code by SMS, please check your cellular data
              settings and phone number
            </Text>
            <TouchableOpacity
              style={styles.modalButtonContainer}
              onPress={async () => {
                navigation.navigate('SignUp');
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'fantasy',
                  alignSelf: 'center',
                }}>
                EDIT PHONE NUMBER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{alignContent: 'center'}}>
        <Icon
          name="key"
          color="#115e59"
          size={130}
          style={{opacity: 0.7, marginTop: 100}}></Icon>
      </View>
      <View>
        <OTPInputView
          style={{width: '70%', height: 200}}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={{
            backgroundColor: '#115e59',
            opacity: 0.3,
          }}
          codeInputHighlightStyle={{
            backgroundColor: '#14532d',
          }}
          onCodeFilled={code => {
            setCode(code);
            console.log(`Code is ${code}, you are good to go!`);
          }}></OTPInputView>
      </View>

      <View>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={async () => {
            console.log('Otp');
            await confirmCode(code).then(() => {
              const user = firebase.auth().currentUser;
              console.log('o' + user.uid);
              if (!user) console.log('hi');
              firestore()
                .collection('Users')
                .doc(user.uid)
                .get()
                .then(documentSnapshot => {
                  let exists = documentSnapshot.exists;
                  console.log(user.uid + ' ' + exists);
                  if (!exists) {
                    add_User(user.uid);
                    navigation.navigate('Profile');
                  } else navigation.navigate('Feed');
                });
            });
          }}>
          <Text style={styles.appButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={{color: '#0d9488', fontSize: 15, fontFamily: 'fantasy'}}>
            Didn't receive code?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  contentButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  borderStyleBase: {
    width: 80,
    height: 45,
    borderColor: '#0d9488',
    backgroundColor: '#3d4f4d',
  },

  borderStyleHighLighted: {
    borderColor: '#115e59',
    borderWidth: 10,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 10,
    color: '#115e59',
  },

  underlineStyleHighLighted: {
    borderColor: '#115e59',
  },

  appButtonContainer: {
    elevation: 15,
    backgroundColor: '#86b8b2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderColor: '#115e59',
  },

  modalButtonContainer: {
    elevation: 15,
    backgroundColor: '#86b8b2',
    borderRadius: 10,
    paddingVertical: 20,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#115e59',
    margin: 40,
  },

  appButtonText: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
