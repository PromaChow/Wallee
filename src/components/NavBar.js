import React from 'react';
import {Box, Center, IconButton} from 'native-base';
import MenuButton from './MenuButton';
import Feather from 'react-native-vector-icons/Feather';

const NavBar = ({title, navigation}) => (
  <Box bg="white" width="full" padding="5px" marginBottom="2" shadow="7">
    <MenuButton navigationw={navigation} />
    <Center
      bg="white"
      _text={{
        padding: '1',
        fontSize: '2xl',
        fontWeight: 'normal',
        color: 'light.600',
      }}>
      {title}
    </Center>
  </Box>
);
export default NavBar;
