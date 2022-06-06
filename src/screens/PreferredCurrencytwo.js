import React, {useEffect} from 'react';
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
import {
  setPreferredCurrency,
  getPreferredCurrency,
} from '../preferredCurrencyService';
import Icon from 'react-native-vector-icons/Feather';
import Options from './Settings';
import {
  getNotification,
  insertNotif,
  deleteNotif,
} from '../NotificationService';
import {update_doc, getUserID} from '../FireStoreHelperFunctions';
import {setPrefferedCurrencyMode} from '../userSpace';

export const PreferredCurrencytwo = ({navigation}) => {
  const [currencyMode, setCurrencyMode] = React.useState(
    getPreferredCurrency(),
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setCurrencyMode(getPreferredCurrency());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nocontainerView}>
        <Image
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderRadius: 0,
            marginRight: 20,
            marginTop: 40,
            opacity: 0.6,
          }}
          source={require('../data/moneyRun.jpg')}
        />
        <View>
          <Text style={styles.textNonotifNext}>
            Changing currency will show all your transactional data in selected
            prefered currency
          </Text>
          <TouchableOpacity
            style={styles.currencyTypeInput}
            onPress={() => {
              navigation.navigate('PreferredCurrencyList');
            }}>
            <Image
              style={{
                width: 25,
                height: 25,
                borderWidth: 1,
                borderColor: 'red',
                borderRadius: 12.5,
                marginRight: 20,
                alignSelf: 'center',
              }}
              source={{uri: 'data:image/png;base64, ' + currencyMode.flag}}
            />
            <Text style={styles.currencyTitle}>
              {currencyMode.currency.code}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              update_doc(getUserID(), 'preferredCurrency', currencyMode);
              setPrefferedCurrencyMode(currencyMode);
              navigation.navigate('Options');
            }}>
            <Text style={styles.appButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abc98b',
  },

  appButtonContainer: {
    elevation: 15,
    backgroundColor: '#325232',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderColor: '#115e59',
    alignSelf: 'center',
    marginTop: 40,
    borderLeftColor: '#115e59',
    borderBottomColor: '#115e59',
    borderTopColor: '#5e9c1c',
    borderWidth: 1,
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

  appButtonText: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  containerView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 40,
    marginBottom: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  currencyTypeInput: {
    borderRadius: 10,
    paddingVertical: 5,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#92ad74',
    fontSize: 18,
    paddingHorizontal: 120,
    flex: 0.25,
    opacity: 0.5,
    flexDirection: 'row',
    color: '#000000',
    alignSelf: 'center',
    marginTop: 40,
    borderLeftColor: '#115e59',
    borderBottomColor: '#115e59',
    borderTopColor: '#5e9c1c',
    borderWidth: 2,
    elevation: 20,
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
    fontSize: 15,
    color: '#000000',
    marginTop: 70,
    alignSelf: 'center',
    marginHorizontal: 27,
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

  currencyTitle: {
    fontSize: 15,
    color: '#000000',
    alignSelf: 'center',
  },
});
