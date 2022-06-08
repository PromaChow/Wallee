import React, {useEffect, useState} from 'react';
import {array} from './data/currency';

var currency = array[0];

export const getCurrency = () => {
  console.log(currency);
  return currency;
};

export const setCurrency = curr => {
  currency = curr;
};
