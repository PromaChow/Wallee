import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth, journalKeyMemo, windowHeight} from '../../App';

import Calculator from '../components/Calculator';
import JournalView from '../components/JournalView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';

const MainScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Box bg="light.200" flex={1}>
        <Box
          bg="primary.500"
          width={windowWidth}
          padding="8px"
          marginBottom="2"
          shadow="7">
          <Icon
            mt="4"
            ml="3"
            position="absolute"
            zIndex={2}
            size="md"
            as={Feather}
            name="menu"
            color="white"
            onPress={() => {
              navigation.toggleDrawer();
            }}></Icon>
          <Center
            bg="primary.500"
            _text={{
              padding: '1',
              fontSize: '2xl',
              fontWeight: 'normal',
              color: 'white',
            }}>
            Journals
          </Center>
        </Box>
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
