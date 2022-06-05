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
import {get_transactions} from '../autoPilotTrasactions';
import {listOfJournals} from '../userSpace';
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
import {RadioButton} from 'react-native-paper';

import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';

import {Dimensions} from 'react-native';
import Transaction from '../transaction';
import {Row} from 'native-base';
import {ExpenseJournal} from '../journal';
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
var payments = [];
var j = 0;

export const TrackTransactions = () => {
  const [transactions, setTransaction] = useState(get_transactions());
  const [currAmount, setCurrAmount] = useState(0);
  const [checked, setChecked] = useState();
  const [transactionId, setTransactionId] = useState(0);
  const [name, setName] = useState(0);
  var k = 0;
  //setTransaction(get_transactions());
  console.log('transaction');
  //console.log(get_transactions());

  useEffect(() => {
    // GetJournal();
  }, []);
  if (transactions.length > 5)
    // console.log(transactions.length);
    console.log(transactions[5] instanceof Transaction);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const render = (len, transactions) => {
    for (let i = 0; i < len; i++) {
      payments.push(
        <Card
          key={j++}
          style={{
            margin: 30,
            borderRadius: 10,
            elevation: 20,
          }}>
          <CardTitle
            title={'BDT ' + transactions[i].amount}
            subtitle={transactions[i].creator}
          />
          <CardContent text={transactions[i].remarks} />
          <CardContent text={i} />
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => {
                setTransactionId(i);
                if (transactions[i].type === 'Expense') setChecked('Expense');
                else setChecked('Income');
                toggleModal();
              }}
              title="Save"
              color="blue"
            />
          </CardAction>
        </Card>,
      );
    }
    return payments;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
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
                backgroundColor: '#FFFFFF',
                opacity: 0.9,
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  marginTop: 10,
                  fontFamily: 'fantasy',
                  fontSize: 17,
                }}>
                Select Journal Type
              </Text>

              <View
                style={{
                  color: 'black',
                  flexDirection: 'row',
                  marginLeft: 70,
                  marginTop: 40,
                }}>
                <RadioButton
                  value="Income"
                  status={checked === 'Income' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('Income')}
                  color="black"
                />
                <Text style={{color: 'black', marginTop: 3}}>Income</Text>
              </View>
              <View
                style={{color: 'black', flexDirection: 'row', marginLeft: 70}}>
                <RadioButton
                  value="Expense"
                  status={checked === 'Expense' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('Expense')}
                  color="black"
                />
                <Text style={{color: 'black', marginTop: 3}}>Expense</Text>
              </View>
              <TextInput
                style={{
                  alignSelf: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'black',
                  paddingHorizontal: 50,
                  color: '#a6ada7',
                  marginTop: 10,
                }}
                editable={true}
                onChangeText={text => {
                  setName(text);
                }}>
                Insert Title of the Journal
              </TextInput>

              <TouchableOpacity
                style={styles.modalButtonContainer}
                onPress={async () => {
                  // console.log(k);
                  //insertAddress(text);
                  //getSMSOnce(text);
                  //   var b = filteredDataSource;
                  //   b.splice(b.length, 0, text);
                  //   setFilteredDataSource([...b]);
                  console.log(transactionId);
                  if (transactions[transactionId] === 'Expense') {
                    title = name === '' ? 'AutopilotExpense' : name;

                    //cjournal = new ExpenseJournal(title,transa);
                  }
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'fantasy',
                    alignSelf: 'center',
                  }}>
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {render(transactions.length, transactions)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginHorizontal: 1,
  },
  title: {
    fontSize: 15,
    color: '#000000',
    marginLeft: 40,
    marginTop: 10,
  },

  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    marginVertical: 20,
    borderColor: '#b5ccab',
    borderRadius: 30,
    marginHorizontal: 40,

    borderWidth: 1,
    color: '#000000',
  },

  modalButtonContainer: {
    elevation: 15,
    backgroundColor: '#3f7aab',
    borderRadius: 10,
    paddingVertical: 15,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#115e59',
    marginTop: 20,
    marginHorizontal: 50,
  },
});
