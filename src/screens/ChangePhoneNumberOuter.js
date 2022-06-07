import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import {array} from '../data/currency';
import {setCurrency} from '../CurrencyService';
import Icon from 'react-native-vector-icons/Feather';
import {
  getNotification,
  insertNotif,
  deleteNotif,
} from '../NotificationService';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChangePhoneNumber} from './ChangePhoneNumber';
import {OTPScreenChange} from './OTPScreenChange';
export const ChangePhoneNumberOuter = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nocontainerView}>
        <Image
          style={{
            width: 150,
            height: 150,
            borderWidth: 1,
            borderRadius: 0,
            marginRight: 20,
            marginTop: 40,
            opacity: 0.5,
          }}
          source={require('../data/changeSIM.jpg')}
        />
        <View>
          <Text style={styles.textNonotif}>
            Changing phone number will migrate all your account information and
            settings
          </Text>
        </View>
        <View>
          <Text style={styles.textNonotifNext}>
            Before proceeding, please confirm that you are able to receive SMS
            at your new phone number.
          </Text>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={async () => {
              navigation.navigate('ChangePhoneNumber');
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'fantasy',
                alignSelf: 'center',
              }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9de0ce',
  },

  appButtonContainer: {
    elevation: 15,
    backgroundColor: '#9de0ce',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderColor: '#115e59',
    alignSelf: 'center',
    marginVertical: 60,
    marginRight: 30,
  },

  nocontainerView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  containerView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 40,
    marginBottom: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },

  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    paddingVertical: 20,
    opacity: 0.9,
  },
  title: {
    fontSize: 23,
    color: '#000000',
    fontWeight: 'bold',
    opacity: 0.7,
    margin: 20,
    borderBottomColor: '#696866',
    borderBottomWidth: 0.1,
    fontFamily: 'fantasy',
  },

  clear: {
    fontSize: 23,
    color: '#000000',
    backgroundColor: '#000000',
    fontWeight: 'bold',
    opacity: 0.7,
    margin: 20,
    borderBottomColor: '#696866',
    borderBottomWidth: 0.1,
    fontFamily: 'fantasy',
    alignSelf: 'flex-end',
  },

  text: {
    fontSize: 15,
    color: '#000000',
    opacity: 0.65,
    marginTop: 10,
    marginRight: 70,
  },

  textNonotif: {
    fontSize: 18,
    color: '#000000',
    opacity: 0.8,
    marginTop: 20,
    alignSelf: 'center',
    marginHorizontal: 30,
  },
  textNonotifNext: {
    fontSize: 14,
    color: '#000000',
    marginTop: 20,
    alignSelf: 'center',
    marginHorizontal: 40,
    opacity: 0.5,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    marginVertical: 20,
    borderColor: '#696866',
    borderRadius: 30,
    marginHorizontal: 40,
    opacity: 0.5,
    borderWidth: 1,
    color: '#000000',
  },
});
