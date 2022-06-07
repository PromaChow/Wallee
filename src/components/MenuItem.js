import React, {useCallback} from 'react';
import {Button, Icon, Box, Menu} from 'native-base';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import {buttonInfo} from './Sidebar';
import {useNavigation} from '@react-navigation/native';

const MenuItem = ({active, componentName, setSignOut}) => {
  const navigation = useNavigation();

  const handleClick =
    componentName === 'LogOut'
      ? async () => {
          await auth()
            .signOut()
            .then(() => {
              // console.log('User signed out!');
              setSignOut(signOut => !signOut);
            });
        }
      : useCallback(() => {
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
          color={active ? 'light.200' : 'light.800'}
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
