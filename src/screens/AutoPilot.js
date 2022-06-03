import React, {useEffect, useState} from 'react';
import notifee from '@notifee/react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {PermissionsAndroid, AppState} from 'react-native';
import BackgroundService from 'react-native-background-actions';
import SmsListener from 'react-native-android-sms-listener';
import {
  getUserID,
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
  addToStorage,
} from '../FireStoreHelperFunctions';

const dummy = {
  Date: '27.07.21 ',
  Balance: 'undefined',
  Amount: 'BDT 636.00',
  Type: 'Credit',
};

const getSMS = async () => {
  var json = [];
  var addrs = ['Pathao'];

  const data = await retrieve_data(getUserID());
  min_date = data['lastAccessedDate'];

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
      console.log(addr);
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
            console.log(fetchData);
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

export const AutoPilot = () => {
  const [aState, setAppState] = useState(AppState.currentState);
  const [image, setImage] = useState();
  useEffect(() => {
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
};
