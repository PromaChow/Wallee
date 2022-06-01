import {Journal, IncomeJournal, ExpenseJournal} from '../journal';
import TransactionListView from './TransactionView';
import {windowHeight, bgColors, fgColors} from '../../App';
import listOfJournals from '../userSpace';
import React, {useMemo, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  Modal,
  FormControl,
  Button,
  Box,
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

const MemoizedTransactions = React.memo(({listOfTransactions, colorIndex}) => (
  <VStack space={3} width="full" alignItems="center">
    {listOfTransactions.map(transaction => {
      return (
        <Box
          marginX="5px"
          flexDirection="row"
          width="auto"
          key={transaction.timeOfCreation}>
          <Box flex="4">
            <TransactionListView
              colorIndex={colorIndex}
              initialTransaction={transaction}
            />
          </Box>
          <Box flex="1">
            <Button
              height="full"
              marginLeft="5px"
              leftIcon={
                <Icon size="md" as={Feather} name="trash-2" color="red.500" />
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
));

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

const JournalView = ({
  title = 'Test',
  listOfTransactions = [new Transaction(100, 'User')],
  colorIndex = 2,
  navigation,
}) => {
  const [showSortingModal, setShowSortingModal] = useState(false);
  const netBalance = useMemo(
    () =>
      listOfTransactions.reduce(
        (partialSum, transaction) => partialSum + transaction.amount,
        0,
      ),
    [netBalance],
  );

  return (
    <Box bg={bgColors[colorIndex]} flex="1">
      <Icon
        position="absolute"
        marginTop="12px"
        marginX="10px"
        as={Feather}
        name="chevrons-left"
        size="md"
        color="light.300"
        onPress={() => navigation.goBack()}
      />
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
            {title}
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
                color={'success.400'}>{`${netBalance}\n\n`}</Text>
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
                  fontSize: 'md',
                  fontWeight: 'light',
                }}>
                Sort Entries
              </Button>
              <Button
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
              </Button>
            </Box>
          </Flex>
        </Box>
      </Center>
      <ScrollView width="full" paddingTop="30px">
        <MemoizedTransactions
          listOfTransactions={listOfTransactions}
          colorIndex={colorIndex}
        />
      </ScrollView>
      <SortMenu
        showSortingModal={showSortingModal}
        setShowSortingModal={setShowSortingModal}
        listOfTransactions={listOfTransactions}
      />
    </Box>
  );
};

export default React.memo(JournalView);
