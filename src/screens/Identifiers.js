import React, {useEffect, useState} from 'react';
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
  Button,
} from 'react-native';
import {
  getAddress,
  deleteIdentifier,
  insertAddress,
} from '../IdentifierService';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {
  RectButton,
  Swipeable,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {getSMSOnce} from '../SMSProcess';
const Item = ({item, navigation}) => (
  <View style={styles.item}>
    <TouchableOpacity style={{flexDirection: 'row'}}>
      <Icon
        name="hash"
        color="#b5ccab"
        size={30}
        style={{marginTop: 10}}></Icon>
      <Text style={styles.title}>{item}</Text>
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

export const Identifiers = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState(
    getAddress(),
  );
  useEffect(() => {
    setFilteredDataSource(getAddress());
  }, []);
  const [text, setText] = React.useState('');

  const [masterDataSource, setMasterDataSource] = React.useState(getAddress());
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  let row = [];
  let prevOpenedRow;

  const renderItem = ({item, index}, onClick) => {
    const renderRightActions = (progress, dragX, onClick) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: 'center',
            justifyContent: 'center',
            width: 70,
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log(index);
              deleteRow(index);
              console.log(getAddress());
            }}>
            <Icon
              name="trash"
              color="#db4848"
              size={30}
              style={{marginTop: 10}}></Icon>
          </TouchableOpacity>
        </View>
      );
    };

    const closeRow = index => {
      console.log('closerow');
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}
          rightOpenValue={-100}>
          <View style={styles.item}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Icon
                name="hash"
                color="#b5ccab"
                size={30}
                style={{marginTop: 10}}></Icon>
              <Text style={styles.title}>{item}</Text>
            </TouchableOpacity>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  const deleteRow = index => {
    deleteIdentifier(index);
    var a = filteredDataSource;
    a.splice(index, 1);
    setFilteredDataSource([...a]);
  };

  const footer = () => {
    return (
      <View
        style={{
          alignSelf: 'flex-end',
          marginTop: 30,
          marginRight: 50,
        }}>
        <TouchableOpacity
          onPress={() => {
            toggleModal();
          }}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderWidth: 1,
              borderRadius: 50,
            }}
            source={require('../data/plus2.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item ? item.toUpperCase() : ''.toUpperCase();
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
      <View>
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
                backgroundColor: '#668569',
                opacity: 0.9,
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  alignSelf: 'center',
                  marginTop: 10,
                  fontFamily: 'fantasy',
                  fontSize: 17,
                }}>
                Add new Identifiers
              </Text>
              <TextInput
                style={{
                  alignSelf: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'white',
                  paddingHorizontal: 50,
                  color: '#a6ada7',
                  marginTop: 30,
                }}
                editable={true}
                onChangeText={text => {
                  setText(text);
                }}>
                Insert new Identifier
              </TextInput>

              <TouchableOpacity
                style={styles.modalButtonContainer}
                onPress={async () => {
                  insertAddress(text);
                  getSMSOnce(text);
                  //   var b = filteredDataSource;
                  //   b.splice(b.length, 0, text);
                  //   setFilteredDataSource([...b]);
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
      </View>
      <View style={{flex: 3}}>
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
          renderItem={v =>
            renderItem(v, () => {
              console.log('Pressed', v);
              deleteRow(v);
            })
          }
          keyExtractor={item => item}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      </View>
      <View
        style={{
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            toggleModal();
          }}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderWidth: 1,
              borderRadius: 50,
            }}
            source={require('../data/plus2.png')}
          />
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#1c3d1f',
    borderRadius: 10,
    paddingVertical: 15,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#115e59',
    marginTop: 70,
    marginHorizontal: 60,
  },
});
