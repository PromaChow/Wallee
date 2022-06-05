import React, {useState} from 'react';
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

const Stack = createNativeStackNavigator();
const test = [new Transaction(55)];

const Test = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const handlePress = () => {
    setShowModal(true);
  };

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
