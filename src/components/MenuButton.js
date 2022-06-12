import React from 'react';
import {IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const MenuButton = () => {
  const navigation = useNavigation();

  return (
    <IconButton
      zIndex={2}
      position="absolute"
      marginTop="3px"
      marginX="8px"
      size="lg"
      variant="ghost"
      _icon={{
        as: Feather,
        name: 'menu',
        color: 'light.600',
      }}
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

export default React.memo(MenuButton);
