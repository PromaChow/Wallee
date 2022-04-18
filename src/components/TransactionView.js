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
      paddingLeft={6}
      paddingBottom={0}
      borderRadius={'md'}
      bg={fgColors[colorIndex]}
      flex="1"
      width="120"
      height="20">
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
          {transaction.timeOfCreation.slice(0, 5)}
        </Box>
      </Box>
    </Center>
  );
};

export default TransactionListView;
