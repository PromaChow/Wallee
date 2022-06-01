import React from 'react';
import Transaction from '../transaction';
import {windowWidth} from '../../App';
import {bgColors, fgColors} from '../../App';
import Feather from 'react-native-vector-icons/Feather';

import {useState} from 'react';
import {
  Modal,
  NativeBaseProvider,
  Box,
  Icon,
  Center,
  Text,
  Spinner,
} from 'native-base';

const TransactionListView = ({
  maxWidth = '150',
  colorIndex = 3,
  initialTransaction,
}) => {
  const [transaction, setTransaction] = useState(initialTransaction);
  const [showModal, setShowModal] = useState(false);
  return (
    <Center
      my="-0.7"
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={3}
      borderRadius={'md'}
      bg={fgColors[colorIndex]}
      flex="1"
      width="full"
      height="95">
      <Center flexDirection="row" justifyContent="center" mb={2} flex="1">
        <Center
          _text={{
            color: 'light.200',
            fontSize: `${transaction.amount < 999999 ? 'xl' : 'lg'}`,
            fontWeight: 'normal',
          }}
          flex="2"
          m={0}
          flexDir="row">
          <Icon
            marginX="10px"
            as={Feather}
            name="dollar-sign"
            size="sm"
            color="success.400"
          />
          Amount
        </Center>
        <Box
          marginLeft="-15px"
          _text={{
            color: 'light.200',
            fontSize: `${transaction.amount < 999999 ? 'xl' : 'lg'}`,
            fontWeight: 'bold',
          }}
          flex="1">
          {transaction.amount}
        </Box>
      </Center>

      <Center flexDirection="row" justifyContent="center" mb={2} flex="1">
        <Center
          _text={{
            color: 'light.200',
            fontSize: `${transaction.amount < 999999 ? 'xl' : 'lg'}`,
            fontWeight: 'normal',
          }}
          flex="2"
          m={0}
          flexDir="row">
          <Icon
            marginX="10px"
            as={Feather}
            name="clock"
            size="sm"
            color="warning.400"
          />
          Created
        </Center>
        <Box
          marginLeft="-15px"
          _text={{
            color: 'light.200',
            fontSize: `${transaction.amount < 999999 ? 'xl' : 'lg'}`,
            fontWeight: 'bold',
          }}
          flex="1">
          {transaction.timeOfCreation.slice(0, 5)}
        </Box>
      </Center>
    </Center>
  );
};

export default TransactionListView;
