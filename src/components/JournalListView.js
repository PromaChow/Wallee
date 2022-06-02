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
import Feather from 'react-native-vector-icons/Feather';
import {ExpenseJournal, IncomeJournal, Journal} from '../journal';

const JournalListView = ({journal, colorIndex = 2, navigation}) => {
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
            <Icon as={Feather} name="book" size="md" color="light.600" />
          </Center>
          <Box marginLeft={'5px'} flex="4" alignItems="flex-start">
            <Text fontSize={'xl'} fontWeight="semibold" color="muted.700">
              {journal.title}
            </Text>
            <Text fontSize={'sm'} fontWeight="semibold" color="muted.500">
              {journal.getLastAccessDateSliced(4, 10)}
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
            {journal.contribution}
          </Center>
          <Center marginRight={'4'} marginLeft={'5px'} flex="1">
            <Icon
              as={Feather}
              name={
                journal instanceof IncomeJournal
                  ? 'arrow-up-circle'
                  : 'arrow-down-circle'
              }
              size="md"
              color={journal instanceof IncomeJournal ? 'info.500' : 'red.400'}
            />
          </Center>
        </Box>
      </Box>
    </Pressable>
  );
};

export default JournalListView;
