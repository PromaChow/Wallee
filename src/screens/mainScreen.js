import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth, journalKeyMemo, windowHeight} from '../../App';
import NavBar from '../components/NavBar';
import Calculator from '../components/Calculator';
import JournalView from '../components/JournalView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';
import MenuButton from '../components/MenuButton';

const MainScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Box bg="light.200" flex={1}>
        <NavBar title={'Journals'} navigation={navigation} />;
        <Box flex="10" bg="light.200">
          {Object.keys(journalKeyMemo).map(key => {
            return (
              <JournalView
                key={key}
                title={key}
                colorIndex={journalKeyMemo[key]}
              />
            );
          })}
        </Box>
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

export default React.memo(MainScreen);
