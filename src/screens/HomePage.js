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
import {setDates, filterJournals, GetJournal} from '../dummyJournal';

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

import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';

import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

// export const getPieChartData = data => {
//   return data.map((item, index) => {
//     //  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
//     var r = () => (Math.random() * 256) >> 0;
//     var color = `rgb(${r()}, ${r()}, ${r()})`;

//     return {
//       key: index,
//       value: item,
//       svg: {fill: color},
//     };
//   });
// };
const getData = (min_Date, max_Date) => {
  GetJournal();
  setDates(min_Date, max_Date);
  var journals = filterJournals(min_Date, max_Date);
  console.log(journals);

  //console.log(journals[0].title, journals[0].contribution);
  var data = [];
  for (let journal of journals) {
    var r = () => (Math.random() * 256) >> 0;
    var color = `rgb(${r()}, ${r()}, ${r()})`;
    data.splice(data.length, 0, {
      value: journal.contribution,
      text: journal.title,
      color: color,
    });
  }
  console.log(data);
  return data;
};

const renderLegend = (text, color) => {
  return (
    <View style={{flexDirection: 'row', marginBottom: 12}}>
      <View
        style={{
          height: 18,

          width: 18,

          marginRight: 10,

          borderRadius: 4,

          backgroundColor: color || 'white',
        }}
      />

      <Text style={{color: 'white', fontSize: 16}}>{text || ''}</Text>
    </View>
  );
};
export const HomePage = () => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  useEffect(() => {
    // GetJournal();
  });
  const [dateMin, setDateMin] = useState(new Date());
  const [openMin, setOpenMin] = useState(false);
  const [dateMax, setDateMax] = useState(new Date());
  const [openMax, setOpenMax] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log(dateMin, dateMax);
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  console.log(firstDay, lastDay);
  const data = getData(firstDay, lastDay);
  return (
    <SafeAreaView style={{flex: 1}}>
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
              backgroundColor: 'white',
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
      <ScrollView style={{flex: 1}}>
        <Card
          style={{
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <CardTitle
            title="Summary"
            titleStyle={{color: '#b5ccab'}}
            subtitle="This is a summary of your journals"
          />

          <PieChart
            strokeColor="white"
            strokeWidth={4}
            donut
            data={data}
            innerCircleColor="#414141"
            innerCircleBorderWidth={4}
            innerCircleBorderColor={'white'}
            textSize={18}
          />

          <View
            style={{
              width: '100%',

              flexDirection: 'row',

              justifyContent: 'space-evenly',

              marginTop: 20,
            }}>
            {data.map(d => {
              return (
                <View style={{flexDirection: 'row', marginBottom: 12}}>
                  <View
                    style={{
                      height: 18,

                      width: 18,

                      marginRight: 10,

                      borderRadius: 4,

                      backgroundColor: d.color || 'white',
                    }}
                  />

                  <Text style={{color: 'white', fontSize: 16}}>
                    {d.title || ''}
                  </Text>
                </View>
              );
            })}
          </View>
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
                // setDates(dateMin, dateMax);
                // console.log(filterJournals());
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                var lastDay = new Date(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  0,
                );
                setDates(firstDay, lastDay);
                getData(firstDay, lastDay);
              }}
              title="Select Style"
              color="#b5ccab"
            />
          </CardAction>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
