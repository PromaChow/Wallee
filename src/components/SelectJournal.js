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

const SelectJournals = ({filter, showModal, setShowModal}) => {
  const [journalName, setJournalName] = useState(
    Object.keys(listOfJournals)[0],
  );

  if (filter === undefined) filter = entry => true;
  else {
    filter =
      filter === 'Credit'
        ? entry => !(entry instanceof IncomeJournal)
        : entry => entry instanceof IncomeJournal;
  }

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
                {Object.entries(journalKeyMemo).map(entry =>
                  filter(entry) ? (
                    <Radio key={key} value={key} my="1">
                      {key}
                    </Radio>
                  ) : null,
                )}
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
                  listOfBudgets[journalName] = new Budget(
                    listOfJournals[journalName],
                    amount,
                  );

                  setShowModal(false);
                }}>
                Send
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default SelectJournals;
