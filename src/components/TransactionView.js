import React from 'react';
import Transaction from '../transaction';
import {bgColors, fgColors} from '../../App';
import Feather from 'react-native-vector-icons/Feather';

import {useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  Icon,
  Center,
  Text,
  Spinner,
} from 'native-base';

export const TransactionView = ({colorIndex = 6, initialTransaction}) => {
  const [transaction, setTransaction] = useState(initialTransaction);
  // setTransaction({...transaction, amount: 200});
  return (
    <Center
      paddingTop={3}
      paddingLeft={6}
      paddingBottom={0}
      borderRadius={'md'}
      bg={fgColors[colorIndex]}
      flex="1"
      maxW={'150'}
      maxH={'20'}>
      {/* <Box
        flex="1"
        _text={{
          color: 'light.200',
          fontSize: 'lg',
          fontWeight: 'semibold',
        }}>
        {transaction.amount}
      </Box> */}

      <Box
        flexDirection="row"
        justifyContent="center"
        paddingBottom={0}
        m={0}
        flex="1">
        <Box flex="1" m={0}>
          <Icon as={Feather} name="dollar-sign" size="sm" color="light.300" />
        </Box>
        <Box
          m={0}
          _text={{
            color: 'light.200',
            fontSize: 'lg',
            fontWeight: 'bold',
          }}
          flexDirection={'column'}
          flex="2">
          {transaction.amount}
        </Box>
      </Box>

      <Box
        flexDirection="row"
        justifyContent="center"
        paddingBottom={0}
        m={0}
        flex="1">
        <Box flex="1" m={0}>
          <Icon as={Feather} name="clock" size="sm" color="light.300" />
        </Box>
        <Box
          m={0}
          _text={{
            color: 'light.200',
            fontSize: 'lg',
          }}
          flexDirection={'column'}
          flex="2">
          {transaction.timeOfCreation}
        </Box>
      </Box>
    </Center>
  );
};

// Components I need
// Calculator
// TransactionDetails
// TransactionListItem
