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
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {changePhoneNumber} from '../Authentication';
import * as Progress from 'react-native-progress';

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

export const OTPScreenChange = ({route, navigation}) => {
  const [code, setCode] = React.useState('');
  console.log(code);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isProgressModalVisible, setProgressModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [indefinite, setIndefinite] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    toggleSuccessModal();
    setTimeout(() => toggleSuccessModal(), 3);
  };

  const toggleSuccessModal = () => {
    setProgressModalVisible(false);
    setSuccessModalVisible(!isSuccessModalVisible);
  };

  const toggleProgressModal = () => {
    setProgressModalVisible(!isProgressModalVisible);
  };
  //   useEffect(() => {
  //     firebase.auth().onAuthStateChanged(user => {
  //       if (user) {
  //         firestore()
  //           .collection('Users')
  //           .doc(user.uid)
  //           .get()
  //           .then(documentSnapshot => {
  //             let exists = documentSnapshot.exists;
  //             console.log(user.uid + ' ' + exists);
  //             if (!exists) {
  //               add_User(user.uid);
  //               navigation.navigate('Profile');
  //             } else navigation.navigate('Feed');
  //           });
  //       }
  //     });
  //   }, []);

  return (
    <SafeAreaView style={styles.container}>
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
                navigation.navigate('ChangePhoneNumber');
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

      <Modal
        transparent={true}
        isVisible={isSuccessModalVisible}
        onBackdropPress={() => setSuccessModalVisible(false)}>
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
              backgroundColor: '#a4cc9f',
              opacity: 0.6,
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Icon
              name="check"
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
              SUCCESS
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',
                margin: 20,
                marginTop: 40,
                fontFamily: 'fantasy',
              }}>
              Your phone number has successfully been changed
            </Text>

            <TouchableOpacity
              style={styles.modalButtonContainer2}
              onPress={async () => {
                setSuccessModalVisible(false);
                navigation.navigate('Feed');
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'fantasy',
                  alignSelf: 'center',
                }}>
                OKAY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        isVisible={isProgressModalVisible}
        onBackdropPress={() => setProgressModalVisible(false)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 1,
              height: 1,
              backgroundColor: 'rgba(242, 250, 244, 0.1)',
              //opacity: 0.2,
              justifyContent: 'center',
              borderRadius: 15,
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 125,
            }}>
            <Progress.CircleSnail
              size={150}
              color={['#bce0a2', '#9fc2a8', '#0b7680']}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.nocontainerView}>
        <View style={{alignContent: 'center'}}>
          <Icon
            name="key"
            color="#115e59"
            size={130}
            style={{opacity: 0.7, marginTop: 100, alignSelf: 'center'}}></Icon>
        </View>
        <View>
          <OTPInputView
            style={{width: '70%', height: 200, alignSelf: 'center'}}
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
            style={{
              backgroundColor: 'black',
              alignSelf: 'center',
              paddingHorizontal: 50,
              paddingVertical: 15,
              borderRadius: 10,
              backgroundColor: '#86b8b2',
            }}
            onPress={async () => {
              toggleProgressModal();
              changePhoneNumber(code).then(() => {
                toggleSuccessModal();
                // navigation.navigate('Feed');
              });
            }}>
            <Text style={styles.appButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
            }}>
            <Text
              style={{color: '#0d9488', fontSize: 15, fontFamily: 'fantasy'}}>
              Didn't receive code?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <TextInput
        style={{backgroundColor: '#004567'}}
        keyboardType="phone-pad"
        onChangeText={setCode}
        placeholder="Enter OTP"></TextInput>
      <Button
        title="Submit"
        style={{backgroundColor: '#000000'}}
        onPress={async () => {
          changePhoneNumber(code).then(() => {
            navigation.navigate('Feed');
          });
        }}></Button>backgroundColor: 'black', */}
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
    alignSelf: 'center',
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
  modalButtonContainer: {
    elevation: 15,
    backgroundColor: '#86b8b2',
    borderRadius: 10,
    paddingVertical: 10,
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
  container: {
    flex: 1,
    backgroundColor: '#9de0ce',
  },
  nocontainerView: {
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    marginBottom: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    flex: 1,
  },
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

  modalButtonContainer2: {
    elevation: 15,
    backgroundColor: '#86b8b2',
    borderRadius: 10,
    paddingVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#115e59',
    margin: 10,
    marginBottom: 30,
    marginHorizontal: 70,
  },

  appButtonText: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
