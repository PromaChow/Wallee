import React from 'react';
import {VStack, Box, Button, Icon, Avatar} from 'native-base';
import MenuButton from './MenuButton';

export const buttonInfo = {
  Journals: {
    iconName: 'book',
    displayName: 'Journals',
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
};

const SideBar = ({state, navigation}) => {
  const currentRoute = state.routeNames[state.index];

  return (
    <Box flex="1" bg="white">
      <Box
        padding="20px"
        bg="light.200"
        flexDirection="row"
        justifyContent={'space-evenly'}
        shadow="7"
        width="full"
        height="130">
        <Avatar
          alignSelf="center"
          borderWidth={3}
          borderColor={'blue.500'}
          size="xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
          }}
        />
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          _text={{
            fontSize: 'xl',
            fontWeight: 'semibold',
          }}>
          User Name
        </Box>
      </Box>
      <VStack space="2" flex="1" alignItems={'flex-start'}>
        {Object.keys(buttonInfo).map(componentName => (
          <MenuButton
            key={componentName}
            active={currentRoute == componentName}
            componentName={componentName}
            navigation={navigation}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default SideBar;
