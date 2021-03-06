import React from 'react';
import Transaction from '../transaction';
import {windowWidth} from '../../App';
import {bgColors, fgColors} from '../../App';
import Feather from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import {Modal, Box, Icon, Center, Pressable, Text} from 'native-base';

const TransactionListView = ({
  colorIndex = 2,
  initialTransaction,
  handlePress,
  navigation,
}) => {
  const [transaction, setTransaction] = useState(initialTransaction);
  const [showModal, setShowModal] = useState(false);
  return (
    <Box alignItems={'center'}>
      <Pressable onPress={handlePress}>
        {({isPressed}) => (
          <Center
            my="-0.7"
            paddingTop={3}
            paddingBottom={3}
            paddingLeft={3}
            borderRadius={'md'}
            bg={isPressed ? 'teal.800' : 'teal.700'}
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
                  size="md"
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
                  size="md"
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
                {transaction.creator === 'User'
                  ? transaction.getCreationTimeSliced(0, 5)
                  : ''}
              </Box>
            </Center>
          </Center>
        )}
      </Pressable>
    </Box>
  );
};

export default TransactionListView;
