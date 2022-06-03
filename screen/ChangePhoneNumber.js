import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {signInWithPhoneNumber} from '../Authentication';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {getPhoneNumber} from '../FireStoreHelperFunctions';
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
  Image,
} from 'react-native';

export const ChangePhoneNumber = () => {
  const navigation = useNavigation();
  const [oldPhoneNumber, setOldPhoneNumber] = React.useState();
  const [newPhoneNumber, setNewPhoneNumber] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [oldformattedValue, setOldFormattedValue] = useState('');
  const [newformattedValue, setNewFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [isModal1Visible, setModal1Visible] = useState(false);
  const [isModal2Visible, setModal2Visible] = useState(false);

  const toggleModal1 = () => {
    setModal1Visible(!isModal1Visible);
  };

  const toggleModal2 = () => {
    setModal2Visible(!isModal2Visible);
  };

  const [user, setUser] = React.useState();
  const [initializing, setInitializing] = useState(true);

  return (
    <SafeAreaView style={styles.content}>
      <Modal
        transparent={true}
        isVisible={isModal1Visible}
        onBackdropPress={() => setModal1Visible(false)}>
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
              backgroundColor: '#7d061a',
              opacity: 0.6,
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Icon
              name="frown"
              color="#FFFFFF"
              size={90}
              style={{opacity: 1, alignSelf: 'center'}}></Icon>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',

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
              Seems like the phone number you've provided is invalid. Please
              provide a valid phone number.
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        isVisible={isModal2Visible}
        onBackdropPress={() => setModal2Visible(false)}>
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
              backgroundColor: '#7d061a',
              opacity: 0.6,
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Icon
              name="frown"
              color="#FFFFFF"
              size={90}
              style={{opacity: 1, alignSelf: 'center'}}></Icon>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',

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
              Seems like the phone number you've provided doesn't match your old
              phone number
            </Text>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1}}>
        <Image
          style={{
            width: 150,
            height: 100,
            borderWidth: 1,
            borderRadius: 0,
            marginRight: 20,
            marginTop: 40,
            opacity: 0.5,
            alignSelf: 'center',
          }}
          source={require('../data/changeSIM.jpg')}
        />
        <Text
          style={{
            color: '#189675',
            alignSelf: 'center',
            margin: 20,
            marginTop: 40,
            fontFamily: 'fantasy',
            opacity: 0.5,

            alignSelf: 'center',
          }}>
          Please select the country code and enter your old phone number
        </Text>

        <PhoneInput
          containerStyle={{
            backgroundColor: '#1fa682',
            opacity: 0.6,
            borderRadius: 4,
            width: 370,
            height: 50,
            alignSelf: 'center',
            paddingVertical: 0,
          }}
          textInputStyle={{
            fontSize: 15,
            height: 50,
            paddingVertical: 0,
            color: '#266e5b',
          }}
          codeTextStyle={{
            fontSize: 14,
            height: 50,
            paddingVertical: 0,
            marginTop: 29,
            color: '#266e5b',
          }}
          defaultValue={oldPhoneNumber}
          defaultCode="DM"
          layout="first"
          onChangeText={text => {
            setOldPhoneNumber(text);
          }}
          onChangeFormattedText={text => {
            setOldFormattedValue(text);
          }}
          autoFocus
        />

        <Text
          style={{
            color: '#189675',
            alignSelf: 'center',
            margin: 19,
            marginTop: 40,
            opacity: 0.5,
            fontFamily: 'fantasy',

            alignSelf: 'center',
          }}>
          Please select the country code and enter your new phone number
        </Text>

        <PhoneInput
          containerStyle={{
            backgroundColor: '#1fa682',
            opacity: 0.6,
            borderRadius: 4,
            width: 370,
            height: 50,
            alignSelf: 'center',
            paddingVertical: 0,
          }}
          textInputStyle={{
            fontSize: 15,
            height: 50,
            paddingVertical: 0,
            color: '#266e5b',
          }}
          codeTextStyle={{
            fontSize: 14,
            height: 50,
            paddingVertical: 0,
            marginTop: 29,
            color: '#266e5b',
          }}
          defaultValue={newPhoneNumber}
          defaultCode="DM"
          layout="first"
          onChangeText={text => {
            setNewPhoneNumber(text);
          }}
          onChangeFormattedText={text => {
            setNewFormattedValue(text);
          }}
          autoFocus
        />

        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={async () => {
            if (getPhoneNumber() === oldformattedValue) {
              console.log('hello');
              // const regex = /(^(\+88|0088)?(01){1}[23456789]{1}(\d){8})$/;
              const regex = /(^(.*)$)/;
              if (regex.test(newformattedValue)) {
                await signInWithPhoneNumber(newformattedValue).then(() => {
                  console.log('sent');
                  navigation.navigate('OTPScreenChange', {
                    phone: phoneNumber,
                  });
                });
              } else {
                toggleModal1(!isModal2Visible);
              }
            } else {
              console.log('hello1');
              toggleModal2(isModal1Visible);
            }
          }}>
          <Text style={styles.appButtonText}>Proceed</Text>
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
    backgroundColor: '#FFFFFF',
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
    alignSelf: 'center',
    marginTop: 70,
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

// <SafeAreaView>
//   <TextInput
//     style={{backgroundColor: '#004567'}}
//     keyboardType="phone-pad"
//     onChangeText={setPhoneNumber}
//     placeholder="Enter your Phone Number"></TextInput>
//   <Button
//     title="Submit"
//     style={{backgroundColor: '#000000'}}
//     onPress={async () => {
//       await signInWithPhoneNumber(phoneNumber);
//     }}></Button>

//   <TextInput
//     style={{backgroundColor: '#004567'}}
//     keyboardType="phone-pad"
//     onChangeText={setCode}
//     placeholder="Enter OTP"></TextInput>
//   <Button
//     title="Submit"
//     style={{backgroundColor: '#000000'}}
//     onPress={async () => {
//       changePhoneNumber(code).then(() => {
//         navigation.navigate('Feed');
//       });
//     }}></Button>
// </SafeAreaView>
