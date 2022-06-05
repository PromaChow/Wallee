import React from 'react';
import {
  ScrollView,
  Divider,
  VStack,
  Box,
  Button,
  Icon,
  Avatar,
} from 'native-base';
import MenuItem from './MenuItem';

export const buttonInfo = {
  Test: {iconName: 'alert-triangle', displayName: 'Test'},
  NavCatalogue: {
    iconName: 'book',
    displayName: 'Catalogue',
  },
  BudgetScreen: {
    iconName: 'trending-down',
    displayName: 'Budgets',
  },
  Statistics: {
    iconName: 'pie-chart',
    displayName: 'Statistics',
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
  Feed: {
    iconName: 'activity',
    displayName: 'Feed',
  },
};

const SideBar = ({state, navigation}) => {
  const currentRoute = state.routeNames[state.index];

  return (
    <Box flex="1" bg="white">
      <Box
        padding="20px"
        marginBottom="20px"
        bg="light.200"
        alignItems="flex-start"
        shadow="7"
        width="full">
        <Avatar
          borderWidth={3}
          borderColor={'blue.500'}
          size="xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
          }}
        />
        <Box
          marginTop="15px"
          justifyContent={'center'}
          alignItems={'center'}
          _text={{
            fontSize: '3xl',
            fontWeight: 'semibold',
          }}>
          User Name
        </Box>
      </Box>
      <ScrollView flex="1">
        <VStack alignItems={'flex-start'} space="2">
          {Object.keys(buttonInfo).map(componentName => (
            <MenuItem
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
