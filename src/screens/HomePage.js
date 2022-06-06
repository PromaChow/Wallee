import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {signInWithPhoneNumber} from '../../Authentication';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {setDates, filterJournals} from '../dummyJournal';
import Statistics from './Statistics';
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
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useRefresh} from '../../App';
import {Box} from 'native-base';

export const HomePage = () => {
  const [dateMin, setDateMin] = useState(new Date());
  const [openMin, setOpenMin] = useState(false);
  const [dateMax, setDateMax] = useState(new Date());
  const [openMax, setOpenMax] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  useRefresh();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // console.log(dateMin, dateMax);
  return (
    <Box flex="1">
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
          <CardTitle
            title="Summary"
            titleStyle={{color: '#b5ccab'}}
            subtitle="Transaction Volume Over a Time Period"
          />
          <View>{/* <Text style={{color: 'black'}}>Hi</Text> */}</View>
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => {
                toggleModal();
              }}
              title="Select TimePeriod"
              color="#b5ccab"
            />

            <CardButton
              onPress={() => {
                setDates(dateMin, dateMax);
                console.log(filterJournals());
              }}
              title="Select Style"
              color="#b5ccab"
            />
          </CardAction>
        </Card>
        <Statistics dateMin={dateMin} dateMax={dateMax} />
      </ScrollView>
    </Box>
  );
};
