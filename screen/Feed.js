import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {recognizeImage} from '../mlkit';
import ImgToBase64 from 'react-native-image-base64';
import notifee from '@notifee/react-native';
import {AndroidColor} from '@notifee/react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {PermissionsAndroid} from 'react-native';
import {ChangePhoneNumber} from './ChangePhoneNumber';
import {
  getUserID,
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
} from '../FireStoreHelperFunctions';

import {launchImageLibrary, launchCamera} from '../imageHandlerFunctions';
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
  AppState,
} from 'react-native';

const getSMS = async => {
  var json = [];
  var addrs = [
    'bKash',
    '16216',
    'JANATA BANK',
    'NAGAD',
    '01841-325325',
    '01842-406877',
    'MGBLCARDS',
  ];
  const data = retrieve_data(getUserID());
  min_date = data['lastAccesssed'];
  for (let addr of addrs) {
    console.log(addr);
    var filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

      minDate: 1608832800000, // timestamp (in milliseconds since UNIX epoch)
      maxDate: Date.now(), // timestamp (in milliseconds since UNIX epoch)

      address: addr,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        // console.log('Count: ', count);
        //console.log('List: ', smsList);
        var arr = JSON.parse(smsList);
        var count = 0;
        arr.forEach(function (object) {
          count++;
          // console.log('Object: ' + object);
          // console.log('-->' + object.date);
          // console.log('-->' + object.body);
          console.log('sent');

          const sms = object.body;
          json['type'] = '';
          json['sms'] = object.body;
          post_sms(object.body);
          //console.log('\n\njson' + json['sms'] + '\n\n');
        });
      },
    );
  }
};
let count = 0;

const post_sms = async sms => {
  const fetchData = new Promise((resolve, reject) => {
    // console.log(uri);

    fetch('http://192.168.237.104:8080/msg', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sms: sms,
      }),
    })
      .then(response => {
        count++;
        console.log(count);
        console.log();
        response.text();
      })
      .then(data => {
        console.log(data);
        resolve(data);
      });
  });

  return fetchData;
};

const post = async uri => {
  const fetchData = new Promise((resolve, reject) => {
    // console.log(uri);
    ImgToBase64.getBase64String(uri).then(base64String => {
      fetch('http://192.168.34.104:8080/image', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64String,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('data' + data['value']);
          resolve(data);
        });
    });
  });
  return fetchData;
};

// var tesseract = require('../tesseract');
// console.log(tesseract);
export const Feed = () => {
  const [aState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    getSMS();

    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        console.log('Next AppState is: ', nextAppState);
        if (nextAppState === 'background') {
          
          var date = Date.now();
          console.log(date);
          update_doc(getUserID(), 'lastAccessedDate', '1041379200000');
          getSMS();
        }
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  const user = firebase.auth().currentUser;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: '#000000'}}>
      <Button
        title="choose Image"
        onPress={async () => {
          let uri = await launchImageLibrary();
          console.log(uri);
          // addToStorage(user.uid, uri);
        }}></Button>

      <Button
        title="choose cam"
        onPress={async () => {
          let uri = await launchCamera();
          console.log(uri);
          addToStorage(user.uid, uri);
        }}></Button>

      <Button
        title="Sign Out"
        style={{backgroundColor: '#000000', alignItems: 'center'}}
        onPress={async () => {
          await auth()
            .signOut()
            .then(() => {
              console.log('User signed out!');
              navigation.navigate('SignUp');
            });
        }}></Button>

      <Button
        title="Recognize Image"
        onPress={async () => {
          let uri = await launchImageLibrary();
          let fetchData = await post(uri);
          console.log('fetch');
          console.log(fetchData);
          // addToStorage(user.uid, uri);
        }}></Button>

      <Button
        title="choose cam"
        onPress={async () => {
          let uri = await launchCamera();
          console.log(uri);
          addToStorage(user.uid, uri);
        }}></Button>

      <Button
        title="Refresh"
        onPress={async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
              title: 'App Camera Permission',
              message: 'App needs Access ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getSMS();
            console.log('Camera permission given');
          } else {
            console.log('Camera permission denied');
          }
        }}></Button>

      <Button
        title="Change Phone Number"
        onPress={async () => {
          navigation.navigate('ChangePhoneNumber');
        }}></Button>
    </SafeAreaView>
  );
};
