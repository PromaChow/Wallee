import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {journalKeyMemo} from '../../App';
import NavBar from '../components/NavBar';
import Calculator from '../components/Calculator';
import JournalListView from '../components/JournalListView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';
import MenuButton from '../components/MenuButton';
import {IncomeJournal, ExpenseJournal, Journal} from '../journal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JournalView from './JournalView';

const Stack = createNativeStackNavigator();

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
                  navigation={navigation}
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

const NavCatalogue = () => (
  <Stack.Navigator
    initialRouteName="Catalogue"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="JournalView" component={JournalView} />
    <Stack.Screen name="Catalogue" component={Catalogue} />
    <Stack.Screen name="Calculator" component={Calculator} />
  </Stack.Navigator>
);

export default NavCatalogue;
