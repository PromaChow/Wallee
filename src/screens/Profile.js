import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {update_doc, getUserID} from '../FireStoreHelperFunctions';

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

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export const Profile = ({navigation}) => {
  const [username, setName] = React.useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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

      <View
        style={{
          width: window.width,
          alignItems: 'center',
          height: 200,
          opacity: 0.5,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        <Icon
          name="user"
          color="#115e59"
          size={130}
          style={{opacity: 0.7, marginTop: 80}}></Icon>
      </View>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Username"
          onChangeText={setName}
          placeholderTextColor="#115e59"></TextInput>
      </View>

      <View></View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={async () => {
            if (username === '') {
              toggleModal(!isModalVisible);
            } else {
              await update_doc(getUserID(), 'name', username).then(() => {
                navigation.navigate('Profile_two');
              });
            }
          }}>
          <Icon
            name="arrow-right-circle"
            color="#115e59"
            size={80}
            style={{opacity: 0.6, marginRight: 30, marginBottom: 20}}></Icon>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  bottomContainer: {
    width: window.width,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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

  textInputStyle: {
    borderRadius: 10,
    paddingVertical: 20,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#115e59',
    borderBottomWidth: 2,
    margin: 40,
    opacity: 0.5,
    height: 65,
    width: 300,
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#115e59',
    fontFamily: 'fantasy',
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

  UpText: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },

  searchSection: {
    flex: 2,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
