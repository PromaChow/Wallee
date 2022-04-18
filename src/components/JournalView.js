import {Journal, IncomeJournal, ExpenseJournal} from '../journal';
import TransactionListView from './TransactionView';
import {windowWidth} from '../../App';
import listOfJournals from '../userSpace';
import React from 'react';
import {
  NativeBaseProvider,
  Modal,
  FormControl,
  Button,
  Box,
  Icon,
  Center,
  Text,
  HStack,
  VStack,
  ScrollView,
} from 'native-base';
import {bgColors} from '../../App';

let journalWidth = windowWidth * 0.4;
let transactionWidth = journalWidth * 0.85;
journalWidth = journalWidth.toString();
transactionWidth = transactionWidth.toString();

let counter = 1;

let JournalView = ({colorIndex}) => {
  return (
    <Box m="1" bg={bgColors[colorIndex]}>
      <Center
        padding={1}
        _text={{
          fontSize: 'lg',
          fontWeight: 'semibold',
        }}>
        Title
      </Center>
      {/* <Text>Title</Text> */}
      <ScrollView>
        <VStack space={2} flex="1">
          {listOfJournals[0].listOfTransactions.map(transaction => {
            console.log(transaction);

            return (
              <TransactionListView
                key={++counter}
                colorIndex={colorIndex}
                initialTransaction={transaction}
              />
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default React.memo(JournalView);
