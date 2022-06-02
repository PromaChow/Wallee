import React, {useEffect, useState} from 'react';

var notif = [{id: '', text: ''}];

export const getNotification = () => {
  return currency;
};

export const insertNotif = text => {
  id = Date.now();
  notif.splice(notif.length, 0, {id, text});
};

export const deleteNotif = position => {
  notif.splice(position, 1);
};
