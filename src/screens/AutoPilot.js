import React, {useEffect, useState} from 'react';
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
import {listOfAutoTransactions} from '../userSpace';
import {ListOfTransactions} from '../components/JournalView';
import {Box} from 'native-base';

const dummy = {
  Date: '27.07.21 ',
  Balance: 'undefined',
  Amount: '636',
  Type: 'Credit',
};

const dummyID = 'E6lOhV4rPFNFCnJ7MAEZKiSdVuJ2';

const responseToTransaction = response => {};

const getSMS = async () => {
  var json = [];
  var addrs = ['Pathao'];

  const data = await retrieve_data(dummyID);
  const min_date = data['lastAccessedDate'];

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
      update_doc(dummyID);
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
  //   const fetchData = new Promise((resolve, reject) => {
  //     fetch('http://192.168.88.104:8080/msg', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         sms: sms,
  //       }),
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('data' + data['Balance']);
  //         resolve(data);
  //       });
  //   });

  const response = new Promise.resolve(dummy);
  return response;
  console.log(response);
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
          console.log(dummyID);
        }
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  return (
    <Box
      alignItems={'center'}
      _text={{
        fontSize: 'lg',
      }}>
      Hello
    </Box>
  );
};
