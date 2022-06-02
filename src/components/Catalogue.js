import React, {useState, useEffect, useCallback} from 'react';
import {bgColors} from '../../App';
import {
  HStack,
  VStack,
  Box,
  Text,
  Button,
  Divider,
  Center,
  Icon,
  Stack,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight, windowWidth} from '../../App';
import Transaction from '../transaction';
import BackButton from './BackButton';

const Catalogue = ({listOfJournals, colorIndex, navigation}) => {
  return (
    <Center
      padding="20px"
      flex="2"
      bg="white"
      borderRadius="lg"
      width="92%"
      marginY="10px"
      borderTopWidth="8px"
      borderTopColor={bgColors[colorIndex]}
      shadow="5">
      <Box
        marginTop="15px"
        marginBottom="10px"
        _text={{
          fontSize: '4xl',
          fontWeight: 'semibold',
          color: 'success.600',
        }}
        flexDirection="row"
        justifyContent="space-between"></Box>
    </Center>
  );
};

export default Catalogue;
