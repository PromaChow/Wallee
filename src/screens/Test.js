import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, IconButton, Center} from 'native-base';
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
import {ListOfTransactions} from '../components/JournalView';
import {listOfAutoTransactions} from '../userSpace';
import TransactionListView from '../components/TransactionListView';
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
      <Box height={'120px'} alignItems={'center'}>
        <TransactionListView
          initialTransaction={new Transaction(55)}
          handlePress={handlePress}
        />
      </Box>
      <SelectJournals showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Test;
