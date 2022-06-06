import {Fab, Box, Icon, Modal, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import React, {useEffect, useState} from 'react';
import {useToast} from 'native-base';
import {getRates} from '../preferredCurrencyService';

const CurrencyMode = ({applyRate, setApplyRate}) => {
  const toast = useToast();

  useEffect(() => {
    const fetch = async () => {
      console.log(await getRates(), 'aaaaaaaa');
    };
    fetch();
  }, []);

  return (
    <Box
      zIndex={1}
      alignSelf="flex-end"
      position="absolute"
      alignItems="flex-end">
      <IconButton
        marginRight="3px"
        marginTop="3px"
        size="lg"
        variant="ghost"
        bg={applyRate ? 'red.400' : 'transparent'}
        _icon={{
          as: Feather,
          name: 'dollar-sign',
          color: 'white',
        }}
        onPress={() => {
          setApplyRate(!applyRate);
          toast.show({
            description: `A Currency View Mode has been ${
              applyRate ? 'Disabled' : 'Enabled'
            }`,
          });
        }}
      />
    </Box>
  );
};

export default CurrencyMode;