import {Fab, Box, Icon, Modal, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import React, {useState} from 'react';
import {useToast} from 'native-base';

const CurrencyMode = ({applyRate, setApplyRate}) => {
  const toast = useToast();

  return (
    <Box zIndex={2} width="full" position="absolute" alignItems="flex-end">
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
