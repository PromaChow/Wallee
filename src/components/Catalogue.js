import React, {useEffect, useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {journalKeyMemo} from '../../App';
import NavBar from './NavBar';
import Calculator from './Calculator';
import JournalListView from './JournalListView';
import Transaction from '../transaction';
import listOfJournals from '../userSpace';
import MenuButton from './MenuButton';
import {IncomeJournal, ExpenseJournal, Journal} from '../journal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JournalView from './JournalView';
import {useRefresh} from '../../App';
import {getJournals} from '../userSpace';
import {update_doc, getUserID} from '../FireStoreHelperFunctions';
import {useIsFocused} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const Catalogue = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [journals, setJournals] = useState(getJournals());
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  console.log(journals);
  useEffect(() => {
    console.log(journals);
    setRefresh(!refresh);

    update_doc(getUserID(), 'journals', listOfJournals);
  }, [isFocused]);

  //useRefresh();

  return (
    <>
      <Box bg="light.200" flex={1}>
        <NavBar title={'Catalogue'} navigation={navigation} />
        <ScrollView flex="1">
          <Box alignItems="center" bg="light.200">
            {Object.keys(journals).map(key => {
              return (
                <JournalListView
                  key={key}
                  journal={journals[key]}
                  colorIndex={journals[key]}
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
