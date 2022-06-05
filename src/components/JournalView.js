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

const Stack = createNativeStackNavigator();

export const ListOfTransactions = ({
  listOfTransactions,
  colorIndex,
  navigation,
  handleDelete, // Use Own -> Passed from Parent
}) => {
  return (
    <ScrollView flex="1">
      <VStack space={3} width="full" alignItems="center">
        {listOfTransactions.map(transaction => {
          return (
            <Box
              height="95px"
              marginX="5px"
              marginY="2px"
              shadow="7"
              flexDirection="row"
              key={transaction.timeOfCreation.getTime()}>
              <Box flex="4">
                <TransactionListView
                  colorIndex={colorIndex}
                  initialTransaction={transaction}
                  navigation={navigation}
                  handlePress={() => {
                    navigation.navigate('Calculator', {
                      transaction: transaction,
                    });
                  }}
                />
              </Box>
              <Box flex="1">
                <Button
                  height="full"
                  marginLeft="5px"
                  leftIcon={
                    <Icon
                      size="md"
                      as={Feather}
                      name="trash-2"
                      color="red.500"
                    />
                  }
                  variant="unstyled"
                  bg={fgColors[colorIndex]}
                  _text={{
                    fontSize: 'md',
                    fontWeight: 'light',
                  }}></Button>
              </Box>
            </Box>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

const SortMenu = ({
  listOfTransactions,
  showSortingModal,
  setShowSortingModal,
}) => {
  const [sortType, setSortType] = useState('mostAmount');

  return (
    <Center>
      <Modal
        isOpen={showSortingModal}
        onClose={() => setShowSortingModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Sort Entries</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>Chose Sorting Type</FormControl.Label>
              <Radio.Group
                value={sortType}
                onChange={nextValue => {
                  setSortType(nextValue);
                }}>
                <Radio value="mostAmount" my={1}>
                  By Most Amount
                </Radio>
                <Radio value="leastAmount" my={1}>
                  By Least Amount
                </Radio>
                <Radio value="latest" my={1}>
                  By Latest Entry
                </Radio>
                <Radio value="earliest" my={1}>
                  By Earliest Entry
                </Radio>
              </Radio.Group>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowSortingModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  switch (sortType) {
                    case 'mostAmount':
                      listOfTransactions.sort((a, b) => b.amount - a.amount);
                      break;

                    case 'leastAmount':
                      listOfTransactions.sort((a, b) => a.amount - b.amount);
                      break;

                    case 'latest':
                      listOfTransactions.sort(
                        (a, b) =>
                          b.timeOfCreation.getTime() -
                          a.timeOfCreation.getTime(),
                      );
                      break;

                    case 'earliest':
                      listOfTransactions.sort(
                        (a, b) =>
                          a.timeOfCreation.getTime() -
                          b.timeOfCreation.getTime(),
                      );
                  }
                  setShowSortingModal(false);
                }}>
                Sort
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

const JournalView = ({colorIndex = 5, navigation, route}) => {
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
              size="sm"
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
          listOfTransactions={listOfTransactions}
          colorIndex={colorIndex}
          navigation={navigation}
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
