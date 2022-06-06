import {Journal, IncomeJournal, ExpenseJournal} from '../journal';
import TransactionListView from './TransactionListView';
import {
  windowHeight,
  bgColors,
  fgColors,
  journalKeyMemo,
  useRefresh,
} from '../../App';
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
  Text,
  Radio,
  VStack,
  ScrollView,
  Divider,
  Heading,
  Flex,
} from 'native-base';
import Transaction from '../transaction';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BackButton from './BackButton';
import {useIsFocused} from '@react-navigation/native';
import SortMenu from './SortMenu';
import ListOfTransactions from './ListOfTransactions';

const JournalView = ({colorIndex = 4, navigation, route}) => {
  const [showSortingModal, setShowSortingModal] = useState(false);
  const {journal} = route.params;
  const [listOfTransactions, setListOfTransactions] = useState(
    journal.listOfTransactions,
  );
  useRefresh();

  const handleAddTransaction = () => {
    const candidateTransaction = new Transaction(0);

    navigation.navigate('Calculator', {
      transaction: candidateTransaction,
      journal: journal,
    });
  };

  const handleDeleteTransaction = () => {};

  return (
    <Box bg={bgColors[colorIndex]} flex="1">
      <BackButton navigation={navigation} />
      <Center padding={2} flexDir="row">
        <Box alignItems="center">
          <Heading padding="3px" paddingTop="3" color="white" mx="auto">
            <Icon
              marginX="10px"
              as={Feather}
              name="book-open"
              size="md"
              color="light.300"
            />{' '}
            {journal.title}
          </Heading>
          <Divider my="2" thickness="3" bg={fgColors[colorIndex]} />
          <Flex
            mx="3"
            direction="row"
            justify="space-evenly"
            align="center"
            h="auto">
            <Heading py="1" fontSize="xl" color="light.200" fontWeight="normal">
              Net Balance:&nbsp;&nbsp;
              <Text
                fontWeight="bold"
                color={
                  'success.400'
                }>{`${journal.calculateContribution()}\n\n`}</Text>
              # of Entries:&nbsp;&nbsp;
              <Text fontWeight="bold">{listOfTransactions.length}</Text>
            </Heading>
            <Divider
              orientation="vertical"
              mx="3"
              thickness="3"
              bg={fgColors[colorIndex]}
            />
            <Box>
              <Button
                py="5"
                onPress={() => setShowSortingModal(true)}
                leftIcon={
                  <Icon
                    size="md"
                    as={Feather}
                    name="bar-chart"
                    color="yellow.300"
                  />
                }
                marginBottom="3"
                _pressed={{
                  bg: 'teal.800',
                }}
                variant="unstyled"
                bg={fgColors[colorIndex]}
                _text={{
                  fontSize: 'lg',
                  fontWeight: 'normal',
                  color: 'light.200',
                }}>
                Sort Entries
              </Button>
              {/* <Button
                leftIcon={
                  <Icon size="md" as={Feather} name="filter" color="pink.300" />
                }
                variant="unstyled"
                bg={fgColors[colorIndex]}
                _text={{
                  fontSize: 'md',
                  fontWeight: 'light',
                }}>
                Filter Entries
              </Button> */}
            </Box>
          </Flex>
        </Box>
      </Center>
      <ScrollView width="full" paddingTop="30px">
        <ListOfTransactions
          journal={journal}
          colorIndex={colorIndex}
          navigation={navigation}
          setListOfTransactions={setListOfTransactions}
        />
      </ScrollView>
      <SortMenu
        showSortingModal={showSortingModal}
        setShowSortingModal={setShowSortingModal}
        listOfTransactions={listOfTransactions}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        size="md"
        icon={<Icon color="white" as={Feather} name="plus" size="md" />}
        onPress={handleAddTransaction}
      />
    </Box>
  );
};

export default JournalView;
