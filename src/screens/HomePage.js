import React, {useEffect, useState, useRef, useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {setDates, filterJournals} from '../dummyJournal';
import Statistics from './Statistics';
import {fillAddress} from '../IdentifierService';
import {retrieveTransactions} from '../autoPilotTrasactions';
import listOfJournals, {fillJournals} from '../userSpace';
import {useRefresh} from '../../App';
import {retrievePreferredCurrency} from '../preferredCurrencyService';

import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  AppState,
} from 'react-native';

import {
  get_transactions,
  add_sms_transactions,
  save_transactions,
} from '../autoPilotTrasactions';

import {getSMS} from '../SMSProcess';

import {
  getUserID,
  retrieve_data,
  update_doc,
  addToStorage,
} from '../FireStoreHelperFunctions';

import NavBar from '../components/NavBar';
import {Box, Text, Spinner} from 'native-base';
import {IncomeJournal} from '../journal';

const sendData = async () => {
  const data = await retrieve_data(getUserID());
  console.log('retrieved');
  retrieveTransactions();
  retrievePreferredCurrency(data);
  fillAddress();
  fillJournals();
};

export const HomePage = ({navigation}) => {
  const [dateMin, setDateMin] = useState(new Date('June 4, 2022 03:24:00'));
  const [openMin, setOpenMin] = useState(false);
  const [dateMax, setDateMax] = useState(new Date('June 15, 2022 03:24:00'));
  const [openMax, setOpenMax] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [netBalance, setNetBalance] = useState(0);

  useRefresh();

  React.useEffect(() => {
    sendData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getSMS();
      sendData();
    });

    return willFocusSubscription;
  }, []);

  useEffect(() => {
    const upload = async () => {
      const data = await retrieve_data(getUserID());
      const amount = parseFloat(data['primaryAmount']);
      const cache = parseFloat(data['serverCache']);

      let netChange = 0;

      for (const journal of Object.values(listOfJournals)) {
        if (journal instanceof IncomeJournal) netChange += journal.contribution;
        else netChange -= journal.contribution;
      }

      console.log('NetChange is', netChange);

      const newAmount = amount + netChange - cache;

      update_doc(getUserID(), 'serverCache', netChange);
      update_doc(getUserID(), 'primaryAmount', newAmount);

      setIsLoading(false);
      setNetBalance(newAmount);
    };
    upload();
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // console.log(dateMin, dateMax);

  // useEffect(() => {
  //   getPrimaryAmount();
  // }, []);

  // const getPrimaryAmount = async () => {
  //   const data = await retrieve_data(getUserID());
  //   const amount = parseFloat(data['primaryAmount']);
  //   setIsLoading(false);
  //   setNetBalance(amount);
  // };

  // useEffect(() => {
  //   // sendData();
  //   console.log('\n\nhome refreshed\n\n');
  //   getSMS();
  //   const appStateListener = AppState.addEventListener(
  //     'change',
  //     nextAppState => {
  //       console.log('Next AppState is: ', nextAppState);
  //       if (nextAppState === 'background') {
  //         //   getSMS();
  //       }
  //       setAppState(nextAppState);
  //     },
  //   );
  //   return () => {
  //     appStateListener?.remove();
  //   };
  // });

  return (
    <Box flex="1">
      <NavBar title={'Summary'} navigation={navigation} />

      <Box
        marginY={'-2'}
        padding="2"
        alignItems={'center'}
        bg="red.400"
        _text={{
          fontWeight: 'semibold',
          fontSize: 'lg',
          color: 'light.200',
        }}>
        {isLoading ? (
          <Spinner color="cyan.500" size="lg" />
        ) : (
          `Net Balance  ${netBalance}`
        )}
      </Box>

      <Modal
        transparent={true}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'grey',
              opacity: 0.6,

              borderRadius: 5,
            }}>
            <Icon
              name="calendar"
              color="#87ab74"
              size={70}
              style={{
                opacity: 1,
                alignSelf: 'center',
                alignSelf: 'center',
                marginTop: 40,
              }}></Icon>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',

                fontFamily: 'fantasy',
                fontSize: 14,
              }}>
              Please select the start and end time
            </Text>

            <View style={{flexDirection: 'row'}}>
              <DatePicker
                modal
                open={openMax}
                date={dateMax}
                mode="datetime"
                onConfirm={date => {
                  setOpenMax(false);
                  setDateMax(date);
                }}
                onCancel={() => {
                  setOpenMax(false);
                  setDates(dateMin, dateMax);
                }}
              />

              <DatePicker
                modal
                open={openMin}
                date={dateMin}
                mode="datetime"
                onConfirm={date => {
                  setOpenMin(false);
                  setDateMin(date);
                }}
                onCancel={() => {
                  setOpenMin(false);
                  setDates(dateMin, dateMax);
                }}
              />

              <TouchableOpacity
                style={{
                  marginTop: 50,
                  marginLeft: 20,
                  borderBottomColor: '#465e39',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
                onPress={() => setOpenMin(true)}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'fantasy',
                    fontSize: 14,
                  }}>
                  Min date
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 50,
                  marginLeft: 85,
                  borderBottomColor: '#465e39',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  alignSelf: 'flex-end',
                }}
                onPress={() => setOpenMax(true)}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'fantasy',
                    fontSize: 14,
                  }}>
                  Max date
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <Card style={{marginTop: 10}}>
          {/* <CardTitle
            title="Summary"
            titleStyle={{color: '#b5ccab'}}
            subtitle="Transaction Volume Over a Time Period"
          /> */}
          <View>{/* <Text style={{color: 'black'}}>Hi</Text> */}</View>
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => {
                toggleModal();
              }}
              title="Select TimePeriod"
              color="#777777"
            />

            <CardButton
              onPress={() => {
                setDates(dateMin, dateMax);
                console.log(filterJournals());
              }}
              title="Select Style"
              color="#777777"
            />
          </CardAction>
        </Card>

        <Statistics dateMin={dateMin} dateMax={dateMax} />
      </ScrollView>
    </Box>
  );
};
