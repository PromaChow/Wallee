import SmsAndroid from 'react-native-get-sms-android';
import {PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  get_transactions,
  add_sms_transactions,
  add_receipt_transactions,
  save_transactions,
} from './autoPilotTrasactions';

import {retrieve_data, getUserID, update_doc} from './FireStoreHelperFunctions';

let count = 0;
export const getSMSOnce = async address => {
  var json = [];
  var addrs = [];
  addrs[0] = address;
  console.log(addrs.length);

  let min_date = 1054742370000;
  let count = 0;

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
              save_transactions();
            });

            //console.log('\n\njson' + json['sms'] + '\n\n');
          });
          // if (count > 0) await SMSNotification();
        },
      );
    }
    console.log('SMS permission given');
  } else {
    console.log('SMS permission denied');
  }
};

export const getSMS = async () => {
  count = 0;
  var json = [];
  var data_1 = await retrieve_data(getUserID());
  const addrs = data_1['ID'];
  console.log(addrs.length);
  const data = await retrieve_data(getUserID());
  let min_date = data['lastAccessedDate'];
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
            console.log('culprit');
            save_transactions();
            //console.log(get_transactions());

            //console.log('\n\njson' + json['sms'] + '\n\n');
          });
          //  if (count > 0) await SMSNotification();
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
