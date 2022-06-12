import React, {useCallback, useEffect, useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {
  ScrollView,
  Fab,
  Input,
  Box,
  Button,
  Icon,
  IconButton,
  Center,
  FormControl,
} from 'native-base';
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
import {getPreferredCurrency, getRates} from '../preferredCurrencyService';
import {useIsFocused} from '@react-navigation/native';
import {update_doc, getUserID} from '../FireStoreHelperFunctions';

const Filter = ({showForm, setShowForm, setFilter}) => {
  return (
    <Box
      zIndex={1}
      alignSelf="flex-end"
      flexDirection={'row'}
      position="absolute"
      alignItems="flex-end">
      {showForm && (
        <FormControl maxWidth={'60%'} bg="white">
          <Input
            type="text"
            placeholder="search journal"
            onChangeText={text => setFilter(text)}
          />
        </FormControl>
      )}
      <Button
        marginRight="45px"
        marginTop="3px"
        size="lg"
        variant="ghost"
        bg="transparent"
        leftIcon={<Icon as={Feather} name="search" color="light.600" />}
        _text={{
          color: 'white',
        }}
        onPress={() => {
          setShowForm(!showForm);
          setFilter('');
        }}></Button>
    </Box>
  );
};

export default Filter;
