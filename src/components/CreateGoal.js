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
import listOfJournals, {listOfBudgets, listOfGoals} from '../userSpace';
import {journalKeyMemo, getRandomColor} from '../../App';
import {Goal} from '../budget';

const CreateGoal = ({showModal, setShowModal}) => {
  const [amount, setAmount] = useState('0');
  const [journalName, setJournalName] = useState(
    Object.keys(listOfJournals)[0],
  );

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Create Goal</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Enter Goal Amount</FormControl.Label>
              <Input
                value={amount}
                w="100%"
                onChangeText={text => setAmount(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Chose Target Journal</FormControl.Label>
              <Radio.Group
                value={journalName}
                onChange={nextValue => {
                  setJournalName(nextValue);
                }}>
                {Object.keys(journalKeyMemo).map(key =>
                  key in listOfGoals ||
                  listOfJournals[key] instanceof ExpenseJournal ? null : (
                    <Radio key={key} value={key} my="1">
                      {key}
                    </Radio>
                  ),
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
                  listOfGoals[journalName] = new Goal(
                    listOfJournals[journalName],
                    amount,
                  );

                  setShowModal(false);
                }}>
                Create
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default CreateGoal;
