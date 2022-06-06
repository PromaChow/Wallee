import React from 'react';
import {IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

const BackButton = ({navigation}) => (
  <IconButton
    position="absolute"
    marginTop="5px"
    marginX="8px"
    size="lg"
    variant="outline"
    _icon={{
      as: Feather,
      name: 'chevrons-left',
      color: 'white',
    }}
    _pressed={{
      bg: 'teal.800',
    }}
    onPress={() => navigation.goBack()}
  />
);

export default BackButton;
