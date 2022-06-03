import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {signInWithPhoneNumber} from '../Authentication';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
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

export const SignUp = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [user, setUser] = React.useState();
  const [initializing, setInitializing] = useState(true);
  console.log(formattedValue);
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

      <View style={{height: 200}}>
        <Icon
          name="key"
          color="#115e59"
          size={180}
          style={{opacity: 0.7, alignSelf: 'center'}}></Icon>
      </View>
      <View style={{height: 100}}>
        <Text
          style={{
            color: '#115e59',
            alignSelf: 'center',
            margin: 20,
            marginTop: 40,
            fontFamily: 'fantasy',
            opacity: 0.8,
          }}>
          Please select the country code and enter your phone number
        </Text>
      </View>

      <View style={{height: 100}}>
        <PhoneInput
          containerStyle={{
            backgroundColor: '#115e59',
            opacity: 0.7,
            borderRadius: 4,
            width: 370,
            height: 50,
            paddingVertical: 0,
          }}
          textInputStyle={{
            fontSize: 15,
            height: 50,
            paddingVertical: 0,
            color: '#FFFFFF',
          }}
          codeTextStyle={{
            fontSize: 14,
            height: 50,
            paddingVertical: 0,
            marginTop: 29,
            color: '#FFFFFF',
          }}
          defaultValue={phoneNumber}
          defaultCode="DM"
          layout="first"
          onChangeText={text => {
            setPhoneNumber(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          autoFocus
        />
      </View>
      <View style={{height: 100}}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={async () => {
            const regex = /(^(\+88|0088)?(01){1}[23456789]{1}(\d){8})$/;
            if (regex.test(formattedValue)) {
              await signInWithPhoneNumber(formattedValue).then(() => {
                navigation.navigate('OTP', {
                  phone: phoneNumber,
                });
              });
            } else {
              toggleModal(!isModalVisible);
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
