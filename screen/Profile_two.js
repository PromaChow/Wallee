import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {add_User} from '../FireStoreHelperFunctions';
import firebase from '@react-native-firebase/app';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AnimatedLinearGradient, {
  presetColors,
} from 'react-native-animated-linear-gradient';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions, TouchableHighlight} from 'react-native';
import {update_doc, getUserID} from '../FireStoreHelperFunctions';
import {array} from '../data/currency';
import {CurrencyList} from './CurrencyList';
import {getCurrency} from '../CurrencyService';

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

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export const Profile_two = ({navigation}) => {
  const [amount, setAmount] = React.useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [currencyMode, setCurrencyMode] = React.useState(array[0]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setCurrencyMode(getCurrency());
    });

    return unsubscribe;
  }, [navigation]);

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
              backgroundColor: '#f2d541',
              opacity: 0.6,
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Icon
              name="alert-triangle"
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
              Reminder
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',
                margin: 20,
                marginTop: 20,
                fontFamily: 'fantasy',
              }}>
              Note that you can change the primary amount and base currency mode
              only one. Are you sure to proceed?
            </Text>
            <View style={styles.bottomModalContainer}>
              <TouchableOpacity
                style={{
                  margin: 20,
                  borderColor: '#541f13',
                  borderRadius: 10,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#cc5237',
                  height: 30,
                  width: 60,
                  overflow: 'hidden',
                }}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'fantasy',
                    alignSelf: 'center',
                  }}>
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  margin: 20,
                  borderColor: '#114019',
                  borderRadius: 10,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#8ee6b3',
                  height: 30,
                  width: 60,
                  overflow: 'hidden',
                }}
                onPress={() => {
                  uid = getUserID();
                  update_doc(uid, 'currency', currencyMode);
                  update_doc(uid, 'primaryAmount', amount);
                  navigation.navigate('Feed');
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'fantasy',
                    alignSelf: 'center',
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          width: window.width,
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          opacity: 0.5,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          flexDirection: 'column',
        }}>
        <Icon
          name="dollar-sign"
          color="#115e59"
          size={130}
          style={{opacity: 1, marginTop: 80}}></Icon>
      </View>

      <View
        style={{
          width: window.width,
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          opacity: 0.5,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          flexDirection: 'column',
          flex: 0.5,
        }}>
        <Text
          style={{
            color: '#115e59',
            alignSelf: 'center',
            margin: 20,
            marginTop: 40,
            fontFamily: 'fantasy',
            opacity: 0.8,
            marginTop: 50,
          }}>
          Please select the base currency mode and specify your primary amount
        </Text>
      </View>
      <View
        style={{
          width: window.width,
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          opacity: 0.5,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          flexDirection: 'column',
        }}>
        <View
          style={{
            width: window.width,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            flexDirection: 'row',
            flex: 0.1,
            margin: 200,
            backgroundColor: '#000000',
          }}>
          <TouchableOpacity
            style={styles.currencyTypeInput}
            onPress={() => {
              navigation.navigate('CurrenyList');
            }}>
            <Image
              style={{
                width: 25,
                height: 25,
                borderWidth: 1,
                borderColor: 'red',
                borderRadius: 12.5,
                marginRight: 20,
              }}
              source={{uri: 'data:image/png;base64, ' + currencyMode.flag}}
            />
            <Text style={styles.title}>{currencyMode.currency.code}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.currencyTextInput}
            onChangeText={text => {
              setAmount(text);
            }}></TextInput>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={async () => {
            toggleModal(!isModalVisible);
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

  bottomModalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    borderTopColor: '#FFFFFF',
    borderTopWidth: 1,
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
    flexDirection: 'row',
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

  currencyTextInput: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 20,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#115e50',
    opacity: 0.3,
    height: 65,
    width: 300,
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#115e59',
    fontFamily: 'fantasy',
    marginRight: 30,
    flex: 0.75,
  },

  currencyTypeInput: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 20,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#115e59',
    height: 65,
    width: 300,
    fontSize: 18,
    paddingHorizontal: 10,
    flex: 0.25,
    marginLeft: 20,
    opacity: 0.8,
    flexDirection: 'row',
    color: '#000000',
  },

  title: {
    fontSize: 15,
    color: '#000000',
  },
});
