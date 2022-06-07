import React, {useEffect, useState} from 'react';
import {retrieve_data, getUserID, update_doc} from './FireStoreHelperFunctions';

var addrs = [
  'bKash',
  '16216',
  'JANATA BANK',
  'NAGAD',
  '01841-325325',
  '01842-406877',
  'MGBLCARDS',
  'Proma',
  '+8801767895677',
  '1234',
];
export const fillAddress = async () => {
  const fetchData = retrieve_data(getUserID());
  addrs = fetchData['ID'];
};
export const getAddress = () => {
  return addrs;
};

export const insertAddress = addr => {
  if (ifExists(addr) == false) {
    addrs.splice(addrs.length, 0, addr);
    update_doc(getUserID(), 'ID', addrs);
  }
};

const ifExists = addr => {
  if (addrs.indexOf(addr) !== -1) {
    return true;
  }
  return false;
};

export const deleteIdentifier = index => {
  console.log(addrs[index]);
  addrs.splice(index, 1);
  update_doc(getUserID(), 'ID', addrs);
};
