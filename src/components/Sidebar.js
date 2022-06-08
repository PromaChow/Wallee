import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Divider,
  VStack,
  Box,
  Button,
  Icon,
  Avatar,
} from 'native-base';
import {useRefresh} from '../../App';

import MenuItem from './MenuItem';

import {retrieve_data, getUserID} from '../FireStoreHelperFunctions';

export const buttonInfo = {
  Home: {iconName: 'home', displayName: 'Home'},
  NavCatalogue: {
    iconName: 'book',
    displayName: 'Catalogue',
  },
  BudgetScreen: {
    iconName: 'trending-down',
    displayName: 'Budgets',
  },
  GoalScreen: {
    iconName: 'target',
    displayName: 'Goals',
  },
  AutoPilot: {
    iconName: 'cpu',
    displayName: 'Auto Pilot',
  },
  ReceiptScanner: {
    iconName: 'camera',
    displayName: 'Receipt Scanner',
  },
  UserProfile: {
    iconName: 'user',
    displayName: 'User Profile',
  },
  LogOut: {
    iconName: 'log-out',
    displayName: 'Log Out',
  },
  Settings: {
    iconName: 'settings',
    displayName: 'Settings',
  },
};

const SideBar = ({state, navigation, setSignOut}) => {
  const currentRoute = state.routeNames[state.index];
  const [image, setImage] = useState();
  const [username, setName] = useState();
  useRefresh();

  const setData = async () => {
    const doc = await retrieve_data(getUserID());
    const image = doc['profilePhoto'];
    if (image === '') console.log('no image');
    else {
      setImage(image);
    }
    const username = doc['name'];
    setName(username);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <Box flex="1" bg="white">
      <Box
        padding="10px"
        marginBottom="35px"
        bg="#FFFFFF"
        alignItems="flex-start"
        shadow="2"
        width="full">
        <Avatar
          borderWidth={1}
          borderColor={'#FFFFFF'}
          size="90"
          source={require('../data/dollar_2.jpg')}
        />
        {/* <Box

          marginTop="15px"
          justifyContent={'center'}
          alignItems={'center'}
          _text={{
            fontSize: '3xl',
            fontWeight: 'semibold',
          }}>
          {username}
        </Box> */}
      </Box>
      <ScrollView flex="1">
        <VStack alignItems={'flex-start'} space="2">
          {Object.keys(buttonInfo).map(componentName => (
            <MenuItem
              setSignOut={setSignOut}
              key={componentName}
              active={currentRoute == componentName}
              componentName={componentName}
              navigation={navigation}
            />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default SideBar;
