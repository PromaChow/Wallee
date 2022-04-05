import React, {useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  Icon,
  Center,
  Text,
  Spinner,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {propsFlattener} from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';

export default TransactionView = props => {
  const [amount, setAmount] = useState(props.transaction.amount);
  const [originator, setOriginator] = useState(props.transaction.originator);
};
