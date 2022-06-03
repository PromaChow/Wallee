import React, {useState, useEffect, useCallback} from 'react';
import {bgColors} from '../../App';
import {
  Pressable,
  Box,
  Text,
  Button,
  Divider,
  Center,
  Progress,
  Icon,
  Stack,
} from 'native-base';
import {Budget} from '../budget';
import Feather from 'react-native-vector-icons/Feather';
import {ExpenseJournal, IncomeJournal, Journal} from '../journal';

const BudgetListView = ({budget, colorIndex = 2, navigation}) => {
  const proportion =
    (budget.amount / budget.referenceJournal.contribution) * 100;

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
          justifyContent="space-between"
          flex="5">
          <Center marginX={'12px'} flex="1">
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
            <Text fontSize={'lg'} fontWeight="semibold" color="muted.500">
              {`${proportion}% spent`}
            </Text>
          </Box>

          <Center
            _text={{
              fontSize: '2xl',
              fontWeight: 'semibold',
              color: 'success.500',
            }}
            marginX="20px"
            flex="4"
            alignItems="flex-end">
            {`${budget.amount} / ${budget.referenceJournal.contribution}`}
          </Center>
        </Box>
        <Box
          alignSelf={'center'}
          marginTop="5px"
          marginBottom="10px"
          flexDirection="row"
          justifyContent="center"
          flex="3">
          <Progress
            width="90%"
            size="lg"
            colorScheme={bgColors[colorIndex]}
            value={proportion}
          />
        </Box>
      </Box>
    </Pressable>
  );
};

export default BudgetListView;
