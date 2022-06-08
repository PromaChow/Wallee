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

const getCurrency = selected => {
  console.log(selected.currency.code + ' ');
  setCurrency(selected);
};

const Item = ({item, navigation}) => (
  <View style={styles.item}>
    <TouchableOpacity
      style={{flexDirection: 'row'}}
      onPress={() => {
        getCurrency(item);
        navigation.navigate('Profile_two');
      }}>
      <Image
        style={{
          width: 25,
          height: 25,
          borderWidth: 1,
          borderColor: 'red',
          borderRadius: 12.5,
          marginRight: 20,
        }}
        source={{uri: 'data:image/png;base64, ' + item.flag}}
      />
      <Text style={styles.title}>{item.currency.code}</Text>
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

export const CurrencyList = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState(array);
  const [masterDataSource, setMasterDataSource] = React.useState(array);

  const renderItem = ({item}) => {
    return <Item item={item} navigation={navigation}></Item>;
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.currency.code
          ? item.currency.code.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        underlineColorAndroid="transparent"
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        placeholder="Search Here"
        placeholderTextColor="#696866"
      />

      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparatorView}
      />
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
