import React from 'react';
import {Modal, Button, Center} from 'native-base';
import listOfJournals from '../userSpace';

const DeleteModal = ({showModal, setShowModal, journal}) => {
  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.50',
        }}>
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Delete this entry ?</Modal.Header>
          {/* <Modal.Body>Are you sure you wish to delete this entry ?</Modal.Body> */}
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
                  delete listOfJournals[journal.title];
                  setShowModal(false);
                }}>
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default DeleteModal;
