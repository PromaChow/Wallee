import React, {useState} from 'react';
import {
  NativeBaseProvider,
  Modal,
  Input,
  FormControl,
  Button,
  Radio,
  Box,
  Icon,
  Center,
} from 'native-base';
import {IncomeJournal, ExpenseJournal} from '../journal';

const CreateJournalView = ({showModal, setShowModal}) => {
  // const [showModal, setShowModal] = useState(false);
  const [journalName, setJournalName] = useState('');
  const [journalType, setJournalType] = useState('income');

  return (
    <Center>
      {/* <Button onPress={() => setShowModal(true)}>Button</Button> */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Create New Journal</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                value={journalName}
                w="100%"
                onChangeText={text => setJournalName(text)}
                placeholder="Enter Journal Name"
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Chose Journal Type</FormControl.Label>
              <Radio.Group
                value={journalType}
                onChange={nextValue => {
                  setJournalType(nextValue);
                }}>
                <Radio value="income" my={1}>
                  Income
                </Radio>
                <Radio value="expense" my={1}>
                  Expense
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
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  // Set journal creation logic here
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default CreateJournalView;
