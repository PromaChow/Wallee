import React from 'react';
import {Box, Center, IconButton} from 'native-base';
import MenuButton from './MenuButton';
import Feather from 'react-native-vector-icons/Feather';

const NavBar = ({title, navigation}) => (
  <Box bg="primary.500" width="full" padding="8px" marginBottom="2" shadow="7">
    <MenuButton navigation={navigation} />
    <Center
      bg="primary.500"
      _text={{
        padding: '1',
        fontSize: '2xl',
        fontWeight: 'normal',
        color: 'white',
      }}>
      {title}
    </Center>
  </Box>
);
export default NavBar;
