import React, {useState} from 'react';
import {
  Modal,
  Input,
  FormControl,
  Button,
  Radio,
  Box,
  Center,
} from 'native-base';
import {IncomeJournal, ExpenseJournal, Journal} from '../journal';
import listOfJournals, {listOfBudgets} from '../userSpace';
import {journalKeyMemo, getRandomColor} from '../../App';
import {Budget} from '../budget';
import Transaction from '../transaction';
import {useEffect} from 'react';

const SelectJournals = ({showModal, setShowModal}) => {
  const [journalName, setJournalName] = useState(
    Object.keys(listOfJournals)[0],
  );

  // Code for Filtering Journals
  // if (filter === undefined) filter = entry => true;
  // else {
  //   filter =
  //     filter === 'Credit'
  //       ? entry => !(entry instanceof IncomeJournal)
  //       : entry => entry instanceof IncomeJournal;
  // }

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Chose Target Journal</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <Radio.Group
                value={journalName}
                onChange={nextValue => {
                  setJournalName(nextValue);
                }}>
                {Object.keys(journalKeyMemo).map(key => (
                  <Radio key={key} value={key} my="1">
                    {key}
                  </Radio>
                ))}
              </Radio.Group>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  listOfJournals[journalName].addTransaction(
                    new Transaction(99),
                  );

                  setShowModal(false);
                }}>
                Insert to Journal
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default SelectJournals;
