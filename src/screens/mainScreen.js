import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {
  NativeBaseProvider,
  ScrollView,
  Fab,
  Modal,
  Input,
  FormControl,
  Button,
  Box,
  Icon,
  Center,
  Text,
  HStack,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth, journalKeyMemo, windowHeight} from '../../App';

import Calculator from '../components/Calculator';
import JournalView from '../components/JournalView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';

const MainScreen = ({setShowModal}) => (
  <Box bg="gray.400" flex={1}>
    <Box width={windowWidth}>
      <Icon
        mt="2"
        ml="2"
        position="absolute"
        zIndex={2}
        size="md"
        as={Feather}
        name="menu"
        color="white"></Icon>
      <Center
        bg="primary.500"
        _text={{
          padding: '1',
          fontSize: '2xl',
          color: 'white',
        }}>
        Journals
      </Center>
    </Box>
    <ScrollView horizontal={true} flex="10" bg="teal.100">
      {Object.keys(journalKeyMemo).map(key => {
        return (
          <JournalView key={key} title={key} colorIndex={journalKeyMemo[key]} />
        );
      })}
    </ScrollView>
    <Fab
      renderInPortal={false}
      shadow={2}
      size="md"
      icon={<Icon color="white" as={Feather} name="plus" size="md" />}
      onPress={() => setShowModal(true)}
    />
  </Box>
);

export default React.memo(MainScreen);
