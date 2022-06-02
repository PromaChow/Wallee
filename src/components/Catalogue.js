import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {
  windowWidth,
  journalKeyMemo,
  windowHeight,
  getRandomColor,
} from '../../App';
import NavBar from '../components/NavBar';
import Calculator from '../components/Calculator';
import JournalListView from '../components/JournalListView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';
import MenuButton from '../components/MenuButton';
import {IncomeJournal, ExpenseJournal} from '../journal';

listOfJournals['Dummy'] = new IncomeJournal('Dummy');
journalKeyMemo['Dummy'] = getRandomColor();

const Catalogue = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Box bg="light.200" flex={1}>
        <NavBar title={'Catalogue'} navigation={navigation} />
        <ScrollView flex="1">
          <Box alignItems="center" bg="light.200">
            {Object.keys(journalKeyMemo).map(key => {
              return (
                <JournalListView
                  key={key}
                  journal={listOfJournals[key]}
                  colorIndex={journalKeyMemo[key]}
                />
              );
            })}
          </Box>
        </ScrollView>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="md"
          icon={<Icon color="white" as={Feather} name="plus" size="md" />}
          onPress={() => setShowModal(true)}
        />
      </Box>
      <CreateJournalView showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Catalogue;
