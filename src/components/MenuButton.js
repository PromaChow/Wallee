import React from 'react';
import {IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

const MenuButton = ({navigation}) => (
  <IconButton
    zIndex={3}
    position="absolute"
    marginTop="3px"
    marginX="8px"
    size="lg"
    variant="ghost"
    _icon={{
      as: Feather,
      name: 'menu',
      color: 'white',
    }}
    onPress={() => navigation.toggleDrawer()}
  />
);

export default React.memo(MenuButton);
