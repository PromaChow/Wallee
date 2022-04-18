import {Journal, IncomeJournal, ExpenseJournal} from '../journal';
import TransactionListView from './TransactionView';
import {windowHeight} from '../../App';
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

let counter = 1;

let JournalView = ({
  listOfTransactions = listOfJournals[0].listOfTransactions,
  colorIndex,
}) => {
  const boxHeight = (listOfTransactions.length + 1) * 85;

  return (
    <Box
      m="1"
      bg={bgColors[colorIndex]}
      borderRadius="md"
      height={boxHeight <= windowHeight ? boxHeight.toString() : 'auto'}>
      <Center
        padding={1}
        _text={{
          fontSize: 'lg',
          fontWeight: 'semibold',
          color: 'white',
        }}>
        Title
      </Center>
      <ScrollView>
        <VStack space={2} width="130" alignItems="center">
          {listOfTransactions.map(transaction => {
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
