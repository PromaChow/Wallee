import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth, journalKeyMemo, windowHeight} from '../../App';
import NavBar from '../components/NavBar';
import {IncomeJournal, ExpenseJournal} from '../journal';
import BudgetListView from '../components/BudgetListView';
import {Budget} from '../budget';
import {listOfBudgets} from '../userSpace';
import CreateBudget from '../components/CreateBudget';

const BudgetScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Box bg="light.200" flex={1}>
        <NavBar title={'Budgets'} navigation={navigation} />
        <ScrollView flex="1">
          <Box alignItems="center" bg="light.200">
            {Object.keys(listOfBudgets).map(key => {
              return (
                <BudgetListView
                  key={key}
                  budget={listOfBudgets[key]}
                  colorIndex={journalKeyMemo[key]}
                />
              );
            })}
          </Box>
        </ScrollView>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="md"
          icon={<Icon color="white" as={Feather} name="plus" size="md" />}
          onPress={() => setShowModal(true)}
        />
      </Box>
      <CreateBudget showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default BudgetScreen;
