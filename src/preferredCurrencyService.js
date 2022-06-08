import React, {useEffect, useState} from 'react';
import {array} from './data/currency';
import {getUserID, retrieve_data} from './FireStoreHelperFunctions';
import {rates} from './data/rates';
var preferredCurrency = array[0];

export const getPreferredCurrency = () => {
  // console.log(preferredCurrency);
  return preferredCurrency;
};

export const setPreferredCurrency = curr => {
  preferredCurrency = curr;
};

export const retrievePreferredCurrency = async data => {
  let temp = data['preferredCurrency'];

  if (temp === '') preferredCurrency = array[0];
  else preferredCurrency = temp;
};

export const getRates = () => {
  // preferredCurrency = await retrievePreferredCurrency();
  console.log(rates[0]['usd']);
  // const data = await retrieve_data(getUserID());

  temp = preferredCurrency;
  // console.log('temp' + temp);
  if (
    temp.currency.code.toLowerCase() === '' ||
    temp.currency.code.toLowerCase() === 'bdt'
  ) {
    //console.log('here');
    return 1;
  } else preferredCurrency = temp;

  console.log(preferredCurrency.currency.code);
  let currencyName = rates[0][preferredCurrency.currency.code.toLowerCase()];

  const rate = currencyName['rate'];
  console.log(typeof rate, 'banana');
  return rate;
};
