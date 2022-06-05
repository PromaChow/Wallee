import {Journal, IncomeJournal, ExpenseJournal} from '../journal';
import TransactionListView from './TransactionListView';
import {bgColors, fgColors, journalKeyMemo, useRefresh} from '../../App';
import listOfJournals from '../userSpace';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  Modal,
  FormControl,
  Button,
  Box,
  Fab,
  Icon,
  Center,
  Radio,
  VStack,
  ScrollView,
  Divider,
} from 'native-base';

const ListOfTransactions = ({
  listOfTransactions,
  colorIndex,
  navigation,
  handleDelete, // Use Own -> Passed from Parent
}) => {
  return (
    <ScrollView flex="1">
      <VStack space={3} width="full" alignItems="center">
        {listOfTransactions.map(transaction => {
          return (
            <Box
              height="95px"
              marginX="5px"
              marginY="2px"
              shadow="7"
              flexDirection="row"
              key={transaction.timeOfCreation.getTime()}>
              <Box flex="4">
                <TransactionListView
                  colorIndex={colorIndex}
                  initialTransaction={transaction}
                  navigation={navigation}
                  handlePress={() => {
                    navigation.navigate('Calculator', {
                      transaction: transaction,
                    });
                  }}
                />
              </Box>
              <Box flex="1">
                <Button
                  height="full"
                  marginLeft="5px"
                  leftIcon={
                    <Icon
                      size="lg"
                      as={Feather}
                      name="trash-2"
                      color="red.500"
                    />
                  }
                  variant="unstyled"
                  bg={fgColors[colorIndex]}
                  _text={{
                    fontSize: 'md',
                    fontWeight: 'light',
                  }}></Button>
              </Box>
            </Box>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

export default ListOfTransactions;
