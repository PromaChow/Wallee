import React from 'react';
import {Button, Icon, Menu} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {buttonInfo} from './Sidebar';

const MenuButton = ({active, componentName, navigation}) => (
  <Button
    marginLeft="15px"
    onPress={() => {
      navigation.navigate(componentName);
    }}
    bg={active ? undefined : 'transparent'}
    leftIcon={
      <Icon
        marginRight="20px"
        size="md"
        as={Feather}
        name={buttonInfo[componentName].iconName}
      />
    }
    _text={{
      color: active ? 'blue.50' : 'blue.500',
    }}>
    {buttonInfo[componentName].displayName}
  </Button>
);

export default React.memo(MenuButton);
