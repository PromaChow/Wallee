import {useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  Icon,
  Center,
  Text,
  Spinner,
} from 'native-base';

const TransactionView = props => {
  const [amount, setAmount] = useState(props.transaction.amount);
  const [originator, setOriginator] = useState(props.transaction.originator);
};

// Components I need
// Calculator
// TransactionDetails
// TransactionListItem
