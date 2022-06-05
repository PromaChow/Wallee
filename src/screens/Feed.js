import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {recognizeImage} from '../../mlkit';
import ImgToBase64 from 'react-native-image-base64';
import notifee from '@notifee/react-native';
import {AndroidColor} from '@notifee/react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {PermissionsAndroid} from 'react-native';
import {ChangePhoneNumber} from './ChangePhoneNumber';
import BackgroundService from 'react-native-background-actions';
import SmsListener from 'react-native-android-sms-listener';
import {fillAddress} from '../IdentifierService';
import {GetJournal} from '../dummyJournal';
import {setPrefferedCurrencyMode} from '../userSpace';
import {getRate} from '../userSpace';
import {retrieveTransactions} from '../autoPilotTrasactions';
import {
  get_transactions,
  add_sms_transactions,
  add_receipt_transactions,
  save_transactions,
} from '../autoPilotTrasactions';
import {
  getNotification,
  insertNotif,
  deleteNotif,
} from '../NotificationService';

import {
  getUserID,
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
  addToStorage,
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
  AppState,
  Image,
} from 'react-native';

import {retrievePreferredCurrency, getRates} from '../preferredCurrencyService';

async function SMSNotification() {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Transaction Tracked',
    body: 'You have new transaction entries tracked',
    android: {
      channelId,
      //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    },
  });
  insertNotif(
    'Transaction Tracked',
    'You have new transaction entries tracked',
    '0',
    require('../data/trans.jpeg'),
  );
}

async function BudgetNotification() {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Budget Limit',
    body: 'You will soon exceed your budget limit',
    android: {
      channelId,
      //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    },
  });
}

export const getSMSOnce = async address => {
  var json = [];
  var addrs = [];
  addrs[0] = address;
  console.log(addrs.length);

  min_date = 1054742370000;

  console.log('min_date' + min_date);
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    {
      title: 'App SMS Permission',
      message:
        'App needs access to read your sms for adding automatic transactions ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    for (let addr of addrs) {
      console.log('addr' + addr);
      var filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

        minDate: min_date, // timestamp (in milliseconds since UNIX epoch)
        maxDate: Date.now(), // timestamp (in milliseconds since UNIX epoch)

        address: addr,
      };
      SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          console.log('Failed with this error: ' + fail);
        },
        async (count, smsList) => {
          // console.log('Count: ', count);
          //console.log('List: ', smsList);
          var arr = JSON.parse(smsList);
          var count = 0;
          arr.forEach(async object => {
            count++;
            // console.log('Object: ' + object);
            // console.log('-->' + object.date);
            // console.log('-->' + object.body);
            console.log('sent');

            const sms = object.body;
            json['type'] = '';
            json['sms'] = object.body;
            await post_sms(object.body).then(fetchData => {
              add_sms_transactions(
                fetchData['Amount'],
                fetchData['Balance'],
                fetchData['Date'],
                fetchData['Type'],
              );
              console.log(fetchData);
            });

            //console.log('\n\njson' + json['sms'] + '\n\n');
          });
          if (count > 0) await SMSNotification();
        },
      );
    }
    console.log('SMS permission given');
  } else {
    console.log('SMS permission denied');
  }
};

const getSMS = async () => {
  var json = [];
  var data_1 = await retrieve_data(getUserID());
  const addrs = data_1['ID'];
  console.log(addrs.length);
  const data = await retrieve_data(getUserID());
  min_date = data['lastAccessedDate'];
  //min_date = 1054742370000;

  console.log('min_date' + min_date);
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    {
      title: 'App SMS Permission',
      message:
        'App needs access to read your sms for adding automatic transactions ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    for (let addr of addrs) {
      console.log('addr' + addr);
      var filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

        minDate: min_date, // timestamp (in milliseconds since UNIX epoch)
        maxDate: Date.now(), // timestamp (in milliseconds since UNIX epoch)

        address: addr,
      };
      update_doc(getUserID(), 'lastAccessedDate', Date.now());
      SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          console.log('Failed with this error: ' + fail);
        },
        async (count, smsList) => {
          // console.log('Count: ', count);
          //console.log('List: ', smsList);
          var arr = JSON.parse(smsList);
          var count = 0;
          arr.forEach(async object => {
            count++;
            // console.log('Object: ' + object);
            // console.log('-->' + object.date);
            // console.log('-->' + object.body);
            console.log('sent');

            const sms = object.body;
            json['type'] = '';
            json['sms'] = object.body;
            let fetchData = await post_sms(object.body);
            add_sms_transactions(
              fetchData['Amount'],
              fetchData['Balance'],
              fetchData['Date'],
              fetchData['Type'],
            );
            console.log(fetchData);

            save_transactions();
            //console.log(get_transactions());

            //console.log('\n\njson' + json['sms'] + '\n\n');
          });
          if (count > 0) await SMSNotification();
        },
      );
    }
    console.log('SMS permission given');
  } else {
    console.log('SMS permission denied');
  }
};
let count = 0;

const post_sms = async sms => {
  const fetchData = new Promise((resolve, reject) => {
    //console.log(uri);
    fetch('http://192.168.88.104:8080/msg', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sms: sms,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('data' + data['Balance']);
        resolve(data);
      });
  });

  return fetchData;
};

const post_image = async uri => {
  const fetchData = new Promise((resolve, reject) => {
    // console.log(uri);
    ImgToBase64.getBase64String(uri).then(base64String => {
      fetch('http://192.168.88.104:8080/image', {
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
          console.log('data' + data['address']);
          resolve(data);
        });
    });
  });
  return fetchData;
};

const sendData = async () => {
  const data = await retrieve_data(getUserID());
  retrieveTransactions(data);
  fillAddress(data);
};

// var tesseract = require('../tesseract');
// console.log(tesseract);
export const Feed = () => {
  const [aState, setAppState] = useState(AppState.currentState);
  const [image, setImage] = useState();

  useEffect(() => {
    sendData();
    getSMS();
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        console.log('Next AppState is: ', nextAppState);
        if (nextAppState === 'background') {
          getSMS();
          var date = Date.now();
          console.log(date);
          console.log(getUserID());
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
        title="phone"
        onPress={async () => {
          console.log(user.phoneNumber + user.uid);
          // addToStorage(user.uid, uri);
        }}></Button>
      <Button
        title="Edit Profile"
        onPress={async () => {
          navigation.navigate('UserProfile');
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
          let fetchData = await post_image(uri);
          console.log('fetch');
          console.log(fetchData['address']);
          add_receipt_transactions(
            fetchData['total'],
            fetchData['company'],
            fetchData['date'],
            fetchData['address'],
          );
          // addToStorage(user.uid, uri);
        }}></Button>

      <Button
        title="Notif"
        onPress={async () => {
          navigation.navigate('Notification');
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
          navigation.navigate('ChangePhoneNumberOuter');
        }}></Button>
      <Button
        title="Change Image"
        onPress={async () => {
          let uri = await launchImageProfilePicture();
          setImage(uri);
          console.log(uri);
        }}></Button>

      <Button
        title="TOP"
        onPress={async () => {
          navigation.navigate('Setting');
        }}></Button>

      <Button
        title="add"
        onPress={() => {
          update_doc(getUserID(), 'preferredCurrency', '');
        }}></Button>

      <Button
        title="homePage"
        onPress={() => {
          navigation.navigate('TrackTransactions');
        }}></Button>

      <Button
        title="preffered Currency"
        onPress={async () => {
          get_transactions();
        }}></Button>
    </SafeAreaView>
  );
};
