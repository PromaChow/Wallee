import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Modal,
  FormControl,
  Button,
  Fab,
  Icon,
  Center,
  Text,
  Radio,
  VStack,
} from 'native-base';
import Transaction from '../transaction';
import BackButton from './BackButton';
import {useIsFocused} from '@react-navigation/native';

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

export default SortMenu;
