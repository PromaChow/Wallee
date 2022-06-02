import React, {useCallback} from 'react';
import {Button, Icon, Box, Menu} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {buttonInfo} from './Sidebar';

const MenuItem = ({active, componentName, navigation}) => {
  const handleClick = useCallback(() => {
    navigation.navigate(componentName);
  }, [navigation]);

  return (
    <Button
      bg={active ? undefined : 'transparent'}
      variant="solid"
      marginLeft="10px"
      borderRadius="md"
      paddingRight="1/6"
      _pressed={{
        bg: 'primary.300',
      }}
      onPress={handleClick}
      leftIcon={
        <Icon
          marginRight="10px"
          size="md"
          as={Feather}
          opacity={0.7}
          name={buttonInfo[componentName].iconName}
        />
      }
      _text={{
        color: active ? 'blue.50' : 'trueGray.500',
        fontSize: 'lg',
      }}>
      {buttonInfo[componentName].displayName}
    </Button>
  );
};

export default React.memo(MenuItem);
