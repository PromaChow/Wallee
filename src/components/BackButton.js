import React from 'react';
import {IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

const BackButton = ({navigation}) => (
  <IconButton
    position="absolute"
    marginTop="5px"
    marginX="8px"
    size="lg"
    variant="ghost"
    _icon={{
      as: Feather,
      name: 'chevrons-left',
      color: 'white',
    }}
    onPress={() => navigation.goBack()}
  />
);

export default BackButton;
