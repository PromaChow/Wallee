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
import DatePicker from 'react-native-date-picker';

const BudgetListView = ({budget, colorIndex = 2, navigation}) => {
  const proportion =
    (budget.referenceJournal.contribution / budget.amount) * 100;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setOpen(true);
      }}>
      <Box
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
              size="xl"
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

            <Text fontSize={'lg'} fontWeight="semibold" color="muted.500">
              {budget.expiryDate
                ? `expires: ${budget.expiryDate.toDateString().slice(4, 11)}`
                : null}
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
            {`${budget.referenceJournal.contribution} / ${budget.amount}`}
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
            bg="info.300"
            _filledTrack={{
              bg: proportion < 100 ? 'info.500' : 'red.500',
            }}
            value={proportion}
          />
        </Box>
        <DatePicker
          modal
          title="Select Budget Deadline"
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            budget.expiryDate = date;
            console.log(budget.expiryDate.getTime());
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </Box>
    </Pressable>
  );
};

export default BudgetListView;
