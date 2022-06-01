import React from 'react';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

const BackButton = ({navigation}) => (
  <Icon
    position="absolute"
    marginTop="12px"
    marginX="10px"
    as={Feather}
    name="chevrons-left"
    size="md"
    color="white"
    onPress={() => navigation.goBack()}
  />
);

export default BackButton;
