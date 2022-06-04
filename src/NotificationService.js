import React, {useEffect, useState} from 'react';
var notif = [];
var notif = [
  {
    id: '12344',
    type: '0',
    title: 'Transaction Tracked',
    text: 'You have new transaction entries tracked',
    icon: require('./data/trans.jpeg'),
  },
];
notif.splice(notif.length, 0, {
  id: '12312345',
  type: 0,
  title: 'Transaction Tracked',
  text: 'You have new transaction entries tracked',
  icon: require('./data/trans.jpeg'),
});
export const getNotification = () => {
  return notif;
};

export const insertNotif = (title, text, type, icon) => {
  type = type;
  id = Date.now();
  notif.splice(notif.length, 0, {id, type, title, text, icon});
};

export const deleteNotif = () => {
  notif = [];
};
