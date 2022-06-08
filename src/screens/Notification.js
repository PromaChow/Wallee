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

const getNotif = () => {
  return getNotification();
};

const Item = ({item, navigation, src}) => (
  <View style={styles.item}>
    <TouchableOpacity
      style={{flexDirection: 'row'}}
      onPress={() => {
        // getCurrency(item);
        // navigation.navigate('Profile_two');
      }}>
      <Image
        style={{
          width: 60,
          height: 60,
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 30,
          marginRight: 20,
        }}
        source={item.icon}
      />
      <Text style={styles.text}>{item.text}</Text>
    </TouchableOpacity>
  </View>
);

const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#696866',
      }}
    />
  );
};

export const Notification = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const [masterDataSource, setMasterDataSource] = React.useState(getNotif());

  const renderItem = ({item}) => {
    console.log(item.type);
    if (item.type === '0') var src = '../data/trans.jpeg';
    else var src = '../data/budget.png';
    return <Item item={item} src={src} navigation={navigation}></Item>;
  };
  if (masterDataSource.length > 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerView}>
          <Text style={styles.title}>Notification</Text>
          <FlatList
            data={masterDataSource}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ItemSeparatorView}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nocontainerView}>
          <Image
            style={{
              width: 150,
              height: 150,
              borderWidth: 1,
              borderRadius: 100,
              marginRight: 20,
            }}
            source={require('../data/notif.jpeg')}
          />
          <Text style={styles.textNonotif}>
            You don't have any notifications so far
          </Text>
        </View>
      </SafeAreaView>
    );
  }
};

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
    borderWidth: 1,
    color: '#000000',
  },
});
