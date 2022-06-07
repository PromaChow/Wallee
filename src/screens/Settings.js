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
  ScrollView,
} from 'react-native';
import {array} from '../../data/currency';
import {setCurrency} from '../CurrencyService';
import Icon from 'react-native-vector-icons/Feather';
import {Identifiers} from './Identifiers';
import {ChangePhoneNumberOuter} from './ChangePhoneNumberOuter';
import {ChangePhoneNumber} from './ChangePhoneNumber';
import {OTPScreenChange} from './OTPScreenChange';
import {PrefferedCurrencyOuter} from './PrefferedCurrencyOuter';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PreferredCurrencytwo} from './PreferredCurrencytwo';
import {PreferredCurrencyList} from './PreferredCurrencyList';
import {HomePage} from './HomePage';
const Stack = createNativeStackNavigator();
export const Options = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerView}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderBottomColor: '#c3c7c3',
            borderBottomWidth: 0.5,
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon
            name="chevron-left"
            color="black"
            size={40}
            style={{opacity: 0.2, marginTop: 15}}></Icon>
          <Text style={styles.title}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderBottomColor: '#c3c7c3',
            borderBottomWidth: 0.5,
            marginTop: 90,
            marginHorizontal: 20,
          }}
          onPress={() => {
            navigation.navigate('ChangePhoneNumberOuter');
          }}>
          <Icon
            name="phone"
            color="#b5ccab"
            size={30}
            style={{marginTop: 10}}></Icon>
          <Text style={styles.text}>Change Number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderBottomColor: '#c3c7c3',
            borderBottomWidth: 0.5,
            marginTop: 20,
            marginHorizontal: 20,
          }}
          onPress={() => {
            navigation.navigate('Identifiers');
          }}>
          <Icon
            name="hash"
            color="#b5ccab"
            size={30}
            style={{marginTop: 10}}></Icon>
          <Text style={styles.text}>Identifiers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderBottomColor: '#c3c7c3',
            borderBottomWidth: 0.5,
            marginTop: 20,
            marginHorizontal: 20,
          }}
          onPress={() => {
            navigation.navigate('PrefferedCurrencyOuter');
          }}>
          <Icon
            name="dollar-sign"
            color="#b5ccab"
            size={30}
            style={{marginTop: 10}}></Icon>
          <Text style={styles.text}>Change Currency Mode </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings = () => (
  <Stack.Navigator
    initialRouteName="Options"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Options" component={Options} />
    <Stack.Screen name="Identifiers" component={Identifiers} />
    <Stack.Screen
      name="ChangePhoneNumberOuter"
      component={ChangePhoneNumberOuter}
    />
    <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} />
    <Stack.Screen
      name="PrefferedCurrencyOuter"
      component={PrefferedCurrencyOuter}
    />
    <Stack.Screen
      name="PreferredCurrencytwo"
      component={PreferredCurrencytwo}
    />
    <Stack.Screen
      name="PreferredCurrencyList"
      component={PreferredCurrencyList}
    />
    <Stack.Screen name="OTPScreenChange" component={OTPScreenChange} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b5ccab',
  },

  nocontainerView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
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
    fontSize: 20,
    color: '#000000',
    marginRight: 20,
    marginTop: 20,
    fontWeight: 'bold',
    borderBottomColor: '#696866',
    borderBottomWidth: 0.1,
    fontFamily: 'roboto',
    //alignSelf: 'center',
    opacity: 0.5,
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
    fontSize: 17,
    color: '#000000',
    marginTop: 10,
    marginRight: 70,
    marginLeft: 20,
  },

  textNonotif: {
    fontSize: 18,
    color: '#000000',
    opacity: 0.65,
    marginTop: 20,
    alignSelf: 'center',
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
    color: '#000000',
  },
});
