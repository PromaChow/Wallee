import {Fab, Box, Icon, Modal, IconButton, Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import React, {useEffect, useState} from 'react';
import {useToast} from 'native-base';
import {getRates, getPreferredCurrency} from '../preferredCurrencyService';

const CurrencyMode = ({applyRate, currencyCode, setApplyRate}) => {
  const toast = useToast();

  return (
    <Box
      zIndex={1}
      alignSelf="flex-end"
      position="absolute"
      alignItems="flex-end">
      <Button
        marginRight="3px"
        marginTop="3px"
        size="lg"
        variant="ghost"
        bg={applyRate ? 'red.400' : 'transparent'}
        leftIcon={
          <Icon
            as={Feather}
            name="dollar-sign"
            color={applyRate ? 'white' : 'light.600'}
          />
        }
        _text={{
          color: 'white',
        }}
        onPress={() => {
          setApplyRate(!applyRate);
          toast.show({
            description: `A Currency View Mode has been ${
              applyRate ? 'Disabled' : 'Enabled'
            }`,
          });
        }}>
        {applyRate ? currencyCode : null}
      </Button>
    </Box>
  );
};

export default CurrencyMode;
