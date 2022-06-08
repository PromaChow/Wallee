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
} from 'react-native';
import {array} from '../data/currency';
import Modal from 'react-native-modal';
import {setCurrency} from '../CurrencyService';
import Icon from 'react-native-vector-icons/Feather';
import {retrievePreferredCurrency} from '../preferredCurrencyService';
import {launchImageLibrary, launchCamera} from '../imageHandlerFunctions';
import ImgToBase64 from 'react-native-image-base64';
import * as Progress from 'react-native-progress';

import {
  getNotification,
  insertNotif,
  deleteNotif,
} from '../NotificationService';
import {
  add_receipt_transactions,
  save_transactions,
  get_transactions,
} from '../autoPilotTrasactions';

// function handleBackButtonClick(navigation) {
//   navigation.goBack();
//   return true;
// }

export const ReceiptScanner = ({navigation}) => {
  // useEffect(() => {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackButtonClick(navigation),
  //   );
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick(navigation),
  //     );
  //   };
  // }, []);
  const [isProgressModalVisible, setProgressModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [remarks, setRemarks] = useState();
  const toggleProgressModal = () => {
    setProgressModalVisible(!isProgressModalVisible);
  };

  const toggleSuccessModal = () => {
    setProgressModalVisible(false);
    setSuccessModalVisible(!isSuccessModalVisible);
  };

  const post_image = async uri => {
    const fetchData = new Promise((resolve, reject) => {
      toggleProgressModal();
      // console.log(uri);
      ImgToBase64.getBase64String(uri).then(base64String => {
        fetch('http://192.168.159.88:8080/image', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64String,
          }),
        })
          .then(response => response.json())
          .then(data => {
            toggleSuccessModal();
            console.log('data' + data['address']);
            resolve(data);
          });
      });
    });
    return fetchData;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent={true}
        isVisible={isProgressModalVisible}
        onBackdropPress={() => setProgressModalVisible(false)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 1,
              height: 1,
              backgroundColor: 'rgba(242, 250, 244, 0.1)',
              //opacity: 0.2,
              justifyContent: 'center',
              borderRadius: 15,
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 125,
            }}>
            <Progress.CircleSnail
              size={150}
              color={['#bce0a2', '#9fc2a8', '#0b7680']}
            />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        isVisible={isSuccessModalVisible}
        onBackdropPress={() => setSuccessModalVisible(false)}>
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
              height: 400,
              backgroundColor: '#a4cc9f',
              opacity: 0.6,
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Icon
              name="check"
              color="#FFFFFF"
              size={90}
              style={{opacity: 1, alignSelf: 'center'}}></Icon>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',

                fontFamily: 'fantasy',
                fontSize: 20,
              }}>
              SUCCESS
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',
                margin: 20,
                marginTop: 40,
                fontFamily: 'fantasy',
              }}>
              {remarks}
            </Text>

            <TouchableOpacity
              style={styles.modalButtonContainer2}
              onPress={async () => {
                setSuccessModalVisible(false);
                navigation.navigate('ReceiptScanner');
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'fantasy',
                  alignSelf: 'center',
                }}>
                OKAY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.nocontainerView}>
        <Image
          style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderRadius: 100,
            marginRight: 20,
            marginTop: 40,
            opacity: 0.6,
          }}
          source={require('../data/receipt.png')}
        />
        <View>
          <Text style={styles.textNonotif}>
            You can track transactional data by scanning receipts
          </Text>
        </View>
        <View>
          <Text style={styles.textNonotifNext}>
            In case of taking photos, make sure you are in a good lighting and
            the image is clear
          </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={async () => {
              let uri = await launchImageLibrary();
              let fetchData = await post_image(uri);
              console.log('fetch');
              console.log(fetchData['address']);
              add_receipt_transactions(
                fetchData['total'],
                fetchData['company'],
                fetchData['date'],
                fetchData['address'],
              );
              var str =
                'Amount: ' +
                fetchData['total'] +
                '\nCompany/Shop Name: ' +
                fetchData['company'] +
                '\nAddress: ' +
                fetchData['address'] +
                '\nDate: ' +
                fetchData['date'];
              setRemarks(str);
              save_transactions();
              console.log(get_transactions());
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'fantasy',
                alignSelf: 'center',
              }}>
              Choose Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={async () => {
              let uri = await launchCamera();
              let fetchData = await post_image(uri);
              console.log('fetch');
              console.log(fetchData['address']);
              add_receipt_transactions(
                fetchData['total'],
                fetchData['company'],
                fetchData['date'],
                fetchData['address'],
              );
              save_transactions();
              console.log(get_transactions());
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'fantasy',
                alignSelf: 'center',
              }}>
              Open Camera
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
    backgroundColor: '#66d4a9',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: '#115e59',
    alignSelf: 'center',
    marginVertical: 20,
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
