import React, {useState, useEffect} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {
  ScrollView,
  Fab,
  Box,
  Icon,
  IconButton,
  Center,
  List,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth, journalKeyMemo, windowHeight} from '../../App';
import Calculator from '../components/Calculator';
import JournalView from '../components/JournalView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';
import MenuButton from '../components/MenuButton';
import NavBar from '../components/NavBar';
import JournalListView from '../components/JournalListView';
import {IncomeJournal, ExpenseJournal} from '../journal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {listOfAutoTransactions} from '../userSpace';
import TransactionListView from '../components/TransactionListView';
import ListOfTransactions from '../components/ListOfTransactions';
import SelectJournals from '../components/SelectJournal';
import {get_transactions, retrieveTransactions} from '../autoPilotTrasactions';
import {retrieve_data, getUserID} from '../FireStoreHelperFunctions';

const Stack = createNativeStackNavigator();
var test = [];

const Test = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const handlePress = () => {
    setShowModal(true);
  };
  useEffect(async () => {
    retrieveTransactions(getUserID());

    //test = get_transactions();
  });
  test = get_transactions();
  console.log('test');
  console.log(test);
  
  return (
    <>
      <NavBar title={'Test'} navigation={navigation}></NavBar>
      <ScrollView width={'full'}>
        <ListOfTransactions
          listOfTransactions={test}
          handlePress={handlePress}
        />
      </ScrollView>
      <SelectJournals showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Test;
