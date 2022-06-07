import React, {useCallback, useEffect, useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {Menu, Box, Icon, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {journalKeyMemo} from '../../App';
import NavBar from './NavBar';
import Calculator from './Calculator';
import JournalListView from './JournalListView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';
import MenuButton from './MenuButton';
import {IncomeJournal, ExpenseJournal, Journal} from '../journal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JournalView from './JournalView';
import CurrencyMode from './CurrencyMode';
import {useRefresh} from '../../App';

const Filter = ({rerender}) => {
  return <Menu.Group title="Filter"></Menu.Group>;
};

export default Filter;
