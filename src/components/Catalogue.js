import React, {useCallback, useEffect, useState} from 'react';
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
import CurrencyMode from './CurrencyMode';
import {useRefresh} from '../../App';
import {getPreferredCurrency, getRates} from '../preferredCurrencyService';
import {useIsFocused} from '@react-navigation/native';
import {update_doc, getUserID} from '../FireStoreHelperFunctions';

// const rate = getRates(); // GET PROPER RATE
// console.log(getPreferredCurrency(), 'aaaaaaaaaaaa'); // get currency code
const Stack = createNativeStackNavigator();

const Catalogue = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [applyRate, setApplyRate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  let rate = getRates();
  let currencyCode = getPreferredCurrency().currency.code;

  useEffect(() => {
    setRefresh(!refresh);
    update_doc(getUserID(), 'journals', listOfJournals);
  }, [isFocused]);

  return (
    <>
      <CurrencyMode
        currencyCode={currencyCode}
        applyRate={applyRate}
        setApplyRate={setApplyRate}
      />
      <Box bg="light.200" flex={1}>
        <NavBar title={'Catalogue'} navigation={navigation} />
        <ScrollView flex="1">
          <Box alignItems="center" bg="light.200">
            {Object.keys(journalKeyMemo).map(key => {
              return (
                <JournalListView
                  applyRate={applyRate}
                  rate={rate} // PASS PROPER RATE HERE !
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
