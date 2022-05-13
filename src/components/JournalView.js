import {Journal, IncomeJournal, ExpenseJournal} from '../journal';
import TransactionListView from './TransactionView';
import {windowHeight, bgColors, fgColors} from '../../App';
import listOfJournals from '../userSpace';
import React, {useMemo} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
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
  Divider,
  Heading,
  Flex,
} from 'native-base';
import Transaction from '../transaction';

let counter = 1;

let JournalView = ({
  title = 'Title',
  listOfTransactions = [
    new Transaction(100, 'User'),
    new Transaction(100, 'User'),
    new Transaction(100, 'User'),
    new Transaction(100, 'User'),
    new Transaction(100, 'User'),
  ],
  colorIndex,
  navigation,
}) => {
  const boxHeight = (listOfTransactions.length + 1) * 85;
  const netContrib = useMemo(
    () =>
      listOfTransactions.reduce(
        (partialSum, transaction) => partialSum + transaction.amount,
        0,
      ),
    [netContrib],
  );

  return (
    <Box m="1" bg={bgColors[colorIndex]} borderRadius="md" flex="1">
      <Center padding={2} flexDir="row">
        <Box alignItems="center">
          <Heading padding="2px" color="white" mx="auto">
            <Icon
              marginX="10px"
              as={Feather}
              name="book-open"
              size="sm"
              color="light.300"
            />{' '}
            {title}
          </Heading>
          <Divider my="2" thickness="3" bg={fgColors[colorIndex]} />
          <Flex mx="3" direction="row" justify="space-evenly" h="60">
            <Heading py="1" fontSize="xl" color="light.200" fontWeight="normal">
              Net Contribution:&nbsp;&nbsp;
              <Text fontWeight="bold">{`${netContrib}\n`}</Text>
              Entries:&nbsp;&nbsp;
              <Text fontWeight="bold">{listOfTransactions.length}</Text>
            </Heading>
            <Divider
              orientation="vertical"
              mx="3"
              my="-2"
              thickness="3"
              bg={fgColors[colorIndex]}
            />
            <Heading py="2"></Heading>
          </Flex>
        </Box>
      </Center>
      <ScrollView width="full">
        <VStack space={3} width="full" alignItems="center">
          {listOfTransactions.map(transaction => {
            return (
              <TransactionListView
                key={transaction.timeOfCreation}
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
