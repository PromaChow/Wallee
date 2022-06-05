import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {addToStorage} from '../FireStoreHelperFunctions';
import firebase from '@react-native-firebase/app';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AnimatedLinearGradient, {
  presetColors,
} from 'react-native-animated-linear-gradient';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {
  update_doc,
  getUserID,
  retrieve_data,
  getPhoneNumber,
} from '../FireStoreHelperFunctions';
import {
  launchImageLibrary,
  launchCamera,
  launchImageProfilePicture,
} from '../imageHandlerFunctions';
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
  ImageBackground,
} from 'react-native';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export const UserProfile = ({navigation}) => {
  const [username, setName] = React.useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(require('../data/pfp.jpg'));
  const [curr, setCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [border, setBorder] = useState(0);
  const [press, setPress] = useState(0);
  const [focus, setFocus] = useState(0);
  const [condition, setCondition] = useState(0);
  const [isImageChanged, setImageChanged] = useState(false);
  console.log('con' + condition);

  //console.log(username, currency, image);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const setData = async () => {
    const doc = await retrieve_data(getUserID());
    const image = doc['profilePhoto'];
    if (image === '') console.log('no image');
    else {
      setImage(image);
      setCondition(1);
    }
    const username = doc['name'];
    setName(username);
    const currency = doc['currency'];
    //console.log(currency['currency']['code']);
    setCurrency(currency['currency']['code']);

    const amount = doc['primaryAmount'];
    setAmount(amount);

    const email = doc['email'];
    setEmail(email);
  };
  useEffect(() => {
    setData();
  }, []);

  if (condition === 0) {
    return (
      <SafeAreaView style={styles.content}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.containerUpperView}>
            <TouchableOpacity
              onPress={async () => {
                const img = await launchImageProfilePicture();
                setImage(img.path);
                setImageChanged(true);
                setCondition(1);
              }}>
              <Image
                style={{
                  width: 140,
                  height: 140,
                  borderWidth: 0.5,
                  borderColor: '#3c824d',
                  borderRadius: 90,
                  marginRight: 20,
                  alignSelf: 'center',
                }}
                source={require('../data/pfp.jpg')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerBottomView}>
            <Text style={styles.text}>Username</Text>
            <TextInput
              style={
                focus === 0
                  ? styles.textInputStyle
                  : styles.textInputStyleonFocus
              }
              editable={true}
              onFocus={() => {
                setFocus(1);
              }}
              onBlur={() => {
                setFocus(0);
              }}
              onChangeText={username => {
                setName(username);
              }}>
              {username}
            </TextInput>

            <Text style={styles.text}>Phone Number</Text>
            <TextInput style={styles.textInputStyleDisabled} editable={false}>
              {getPhoneNumber()}
            </TextInput>

            <Text style={styles.text}>Email</Text>
            <TextInput
              style={
                press === 0
                  ? styles.textInputStyle
                  : styles.textInputStyleonFocus
              }
              editable={true}
              onFocus={() => {
                setPress(1);
              }}
              onBlur={() => {
                setPress(0);
              }}
              onChangeText={email => {
                setEmail(email);
              }}>
              {email}
            </TextInput>

            <Text style={styles.text}>Total Amount</Text>
            <TextInput style={styles.textInputStyleDisabled} editable={false}>
              {curr + ' ' + amount}
            </TextInput>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={async () => {
                update_doc(getUserID(), 'name', username);
                update_doc(getUserID(), 'email', email);
                navigation.navigate('Feed');
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'fantasy',
                  alignSelf: 'center',
                }}>
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (condition === 1) {
    return (
      <SafeAreaView style={styles.content}>
        <View style={styles.containerUpperView}>
          <TouchableOpacity
            onPress={async () => {
              const img = await launchImageProfilePicture();
              setImage(img.path);
              setImageChanged(true);
              setCondition(1);
            }}>
            <Image
              style={{
                width: 140,
                height: 140,
                borderWidth: 0.5,
                borderColor: '#3c824d',
                borderRadius: 90,
                marginRight: 20,
                alignSelf: 'center',
              }}
              source={{uri: image}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBottomView}>
          <Text style={styles.text}>Username</Text>
          <TextInput
            style={
              focus === 0 ? styles.textInputStyle : styles.textInputStyleonFocus
            }
            editable={true}
            onFocus={() => {
              setFocus(1);
            }}
            onBlur={() => {
              setFocus(0);
            }}
            onChangeText={username => {
              setName(username);
            }}>
            {username}
          </TextInput>

          <Text style={styles.text}>Phone Number</Text>
          <TextInput style={styles.textInputStyleDisabled} editable={false}>
            {getPhoneNumber()}
          </TextInput>

          <Text style={styles.text}>Email</Text>
          <TextInput
            style={
              press === 0 ? styles.textInputStyle : styles.textInputStyleonFocus
            }
            editable={true}
            onFocus={() => {
              setPress(1);
            }}
            onBlur={() => {
              setPress(0);
            }}
            onChangeText={email => {
              setEmail(email);
            }}>
            {email}
          </TextInput>
          <Text style={styles.text}>Total Amount</Text>
          <TextInput style={styles.textInputStyleDisabled} editable={false}>
            {curr + ' ' + amount}
          </TextInput>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={async () => {
              console.log(email);
              update_doc(getUserID(), 'name', username);
              update_doc(getUserID(), 'email', email);
              if (isImageChanged === true) addToStorage(getUserID(), image);
              navigation.navigate('Feed');
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'fantasy',
                alignSelf: 'center',
              }}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#95cca3',
    opacity: 0.8,
  },
  bottomContainer: {
    width: window.width,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'blue',
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

  containerBottomView: {
    flex: 2,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },

  containerUpperView: {
    flex: 0.8,
    backgroundColor: '#95cca3',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 250,
    // marginHorizontal: 5,
    // borderTopStartRadius: 40,
    // borderTopEndRadius: 40,
  },

  textInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#708074',
    marginHorizontal: 40,
    alignItems: 'stretch',
    color: '#000000',
    fontSize: 16,
    fontFamily: 'fantasy',
  },

  textInputStyleonFocus: {
    borderBottomWidth: 1,
    borderBottomColor: '#80c491',
    marginHorizontal: 40,
    alignItems: 'stretch',
    color: '#000000',
    fontSize: 16,
    fontFamily: 'fantasy',
  },

  textInputStyleDisabled: {
    borderBottomWidth: 1,
    borderBottomColor: '#708074',
    marginHorizontal: 40,
    opacity: 0.6,
    alignItems: 'stretch',
    color: '#000000',
    fontSize: 16,
    fontFamily: 'fantasy',
  },

  underlineStyleHighLighted: {
    borderColor: '#115e59',
  },

  appButtonContainer: {
    elevation: 15,
    backgroundColor: '#74b384',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderColor: '#115e59',
    alignSelf: 'center',
    marginVertical: 30,
    marginRight: 30,
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

  item: {
    // backgroundColor: '#002439',
    padding: 10,
    marginHorizontal: 1,
    width: window.width,
  },
  title: {
    fontSize: 15,
    color: '#000000',
  },

  text: {
    fontSize: 14,
    color: '#708074',
    marginTop: 50,
    marginLeft: 40,
    fontFamily: 'fantasy',
  },
});
