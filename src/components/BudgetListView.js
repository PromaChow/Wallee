import React, {useState, useEffect, useCallback} from 'react';
import {bgColors} from '../../App';
import {
  Pressable,
  Box,
  Text,
  Button,
  Divider,
  Center,
  Icon,
  Stack,
} from 'native-base';
import {Budget} from '../budget';
import Feather from 'react-native-vector-icons/Feather';
import {ExpenseJournal, IncomeJournal, Journal} from '../journal';

const BudgetListView = ({budget, colorIndex = 2, navigation}) => {
  return (
    <Pressable>
      <Box
        onPress={() => {
          console.log('pressed');
        }}
        paddingY="5px"
        alignItems={'space-between'}
        bg="white"
        borderRadius="lg"
        width="92%"
        marginY="10px"
        borderTopWidth="8px"
        borderTopColor={bgColors[colorIndex]}
        shadow="5">
        <Box
          marginTop="5px"
          marginBottom="10px"
          flexDirection="row"
          justifyContent="space-between">
          <Center marginX={'10px'} flex="1">
            <Icon
              as={Feather}
              name="trending-down"
              size="md"
              color="light.600"
            />
          </Center>
          <Box marginLeft={'5px'} flex="4" alignItems="flex-start">
            <Text fontSize={'xl'} fontWeight="semibold" color="muted.700">
              {budget.referenceJournal.title}
            </Text>
            <Text fontSize={'sm'} fontWeight="semibold" color="muted.500">
              {Math.trunc(budget.amount / budget.referenceJournal.amount)}
            </Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

export default BudgetListView;
