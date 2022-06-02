import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth, journalKeyMemo, windowHeight} from '../../App';
import Catalogue from '../components/Catalogue';
import Calculator from '../components/Calculator';
import JournalView from '../components/JournalView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';
import MenuButton from '../components/MenuButton';
import NavBar from '../components/NavBar';

const Test = ({navigation}) => {
  return (
    <Center>
      <NavBar title={'Test'} navigation={navigation} />
      <Catalogue />
    </Center>
  );
};

export default Test;
