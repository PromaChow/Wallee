import React, {useState, useEffect, useCallback} from 'react';
import {
  HStack,
  VStack,
  Box,
  Text,
  Button,
  Divider,
  Center,
  Icon,
  Stack,
  IconButton,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight, windowWidth} from '../../App';
import Transaction from '../transaction';
import BackButton from './BackButton';
import {ListOfTransactions} from './JournalView';
import {useToast} from 'native-base';

const NumButton = ({renderSymbol, appendSymbol}) => {
  return (
    <Button
      variant="ghost"
      borderRadius="none"
      flex="1"
      _text={{fontSize: '4xl', fontWeight: 'light', color: 'gray.500'}}
      onPress={() =>
        appendSymbol(previousExpression => previousExpression + renderSymbol)
      }>
      {renderSymbol}
    </Button>
  );
};

// const operatorButton
const OperatorButton = ({renderSymbol, appendSymbol}) => {
  return (
    <Button
      variant="ghost"
      borderRadius="none"
      flex="1"
      _text={{fontSize: '4xl', fontWeight: 'light', color: 'gray.500'}}
      onPress={() =>
        appendSymbol(previousExpression => {
          if (
            !['+', '-', '*', '/', '.'].includes(
              previousExpression[previousExpression.length - 1],
            )
          )
            return previousExpression + renderSymbol;
          else return previousExpression;
        })
      }>
      {renderSymbol}
    </Button>
  );
};

// const evalButton
const EvalButton = ({evaluateExpression, evaluationCallback}) => {
  return (
    <Button
      variant="ghost"
      borderRadius="none"
      flex="1"
      _text={{fontSize: '4xl', fontWeight: 'medium', color: 'gray.500'}}
      onPress={() => evaluateExpression(evaluationCallback)}>
      =
    </Button>
  );
};

// const backspaceButton
const BackspaceButton = ({deleteLastSymbol}) => {
  return (
    <Button
      variant="unstyled"
      borderRadius="none"
      flex="1"
      onPress={() =>
        deleteLastSymbol(previousExpression =>
          previousExpression
            ? previousExpression.slice(0, -1)
            : previousExpression,
        )
      }>
      <Icon size="md" as={Feather} name="delete" color="gray.600"></Icon>
    </Button>
  );
};

const KeyPad = React.memo(({setExpression, evaluationCallback}) => (
  <Box flex="3" flexDirection="row" height="100%">
    <HStack flex="3" flexDirection="row" bg="info.100">
      <VStack flex="1">
        <NumButton key={'7'} renderSymbol={'7'} appendSymbol={setExpression} />
        <NumButton key={'4'} renderSymbol={'4'} appendSymbol={setExpression} />
        <NumButton key={'1'} renderSymbol={'1'} appendSymbol={setExpression} />
        <OperatorButton
          key={'.'}
          renderSymbol={'.'}
          appendSymbol={setExpression}
        />
      </VStack>
      <VStack space="1" flex="1">
        <NumButton key={'8'} renderSymbol={'8'} appendSymbol={setExpression} />
        <NumButton key={'5'} renderSymbol={'5'} appendSymbol={setExpression} />
        <NumButton key={'2'} renderSymbol={'2'} appendSymbol={setExpression} />
        <NumButton key={'0'} renderSymbol={'0'} appendSymbol={setExpression} />
      </VStack>
      <VStack space="1" flex="1">
        <NumButton key={'9'} renderSymbol={'9'} appendSymbol={setExpression} />
        <NumButton key={'6'} renderSymbol={'6'} appendSymbol={setExpression} />
        <NumButton key={'3'} renderSymbol={'3'} appendSymbol={setExpression} />
        <BackspaceButton key={'x'} deleteLastSymbol={setExpression} />
      </VStack>
    </HStack>
    <HStack flex="1" bg="info.200">
      <VStack space="1" flex="1">
        <OperatorButton
          key={'/'}
          renderSymbol={'/'}
          appendSymbol={setExpression}
        />
        <OperatorButton
          key={'*'}
          renderSymbol={'*'}
          appendSymbol={setExpression}
        />
        <OperatorButton
          key={'-'}
          renderSymbol={'-'}
          appendSymbol={setExpression}
        />
        <OperatorButton
          key={'+'}
          renderSymbol={'+'}
          appendSymbol={setExpression}
        />
        <EvalButton
          key={'='}
          evaluateExpression={setExpression}
          evaluationCallback={evaluationCallback}
        />
      </VStack>
    </HStack>
  </Box>
));

const Calculator = ({navigation, route}) => {
  const {transaction, journal} = route.params;

  const evaluationCallback = useCallback(expression => {
    if (expression === '') return '0';

    if (['+', '-', '*', '/', '.'].includes(expression[expression.length - 1]))
      expression = expression.slice(0, -1);

    const evaluator = new Function(`return ${expression};`);
    const result = evaluator().toString();

    if (result === 'NaN') return '0';
    return result;
  }, []);

  const [currentExpression, setExpression] = useState(transaction.amount);
  const [keypadOpen, setKeyPadOpen] = useState(false);
  const toast = useToast();

  return (
    <>
      <Center flex="1" bg="light.200" maxH={windowHeight * 0.6}>
        <Box
          padding="8px"
          flexDirection="row"
          width="full"
          bg="primary.500"
          justifyContent="space-between"
          shadow="5">
          <BackButton navigation={navigation} />
          <Box
            alignItems="center"
            justifyContent="center"
            flex="2"
            mr="-12"
            _text={{
              py: '1',
              pr: '5',
              fontSize: 'xl',
              color: 'white',
              fontWeight: 'normal',
            }}>
            {keypadOpen ? 'Editing Entry' : 'Entry Details'}
          </Box>
          <IconButton
            _icon={{
              as: Feather,
              name: 'save',
              variant: 'solid',
              color: 'white',
              size: 'lg',
            }}
            onPress={() => {
              transaction.amount = parseInt(currentExpression);
              if (journal !== undefined) {
                transaction.setCreationTime(new Date());
                journal.addTransaction(transaction);
              }

              toast.show({
                description: 'Transaction Saved',
              });

              navigation.goBack();
            }}
          />
        </Box>
        <Center
          padding="20px"
          flex="2"
          bg="white"
          borderRadius="lg"
          width="92%"
          marginY="10px"
          borderTopWidth="8px"
          borderTopColor="success.600"
          shadow="7">
          <Box
            marginTop="15px"
            marginBottom="10px"
            _text={{
              fontSize: '4xl',
              fontWeight: 'semibold',
              color: 'success.600',
            }}
            flexDirection="row"
            justifyContent="space-between">
            <Text flex="1" marginTop="15px" fontSize={'xl'} color="light.600">
              Amount
            </Text>
            {currentExpression}
          </Box>
          <Divider thickness="2px" marginTop="5px" />
          <Center padding="5px" marginTop="5px" marginBottom="15px">
            <Button
              variant="outline"
              height="auto"
              onPress={() => {
                transaction.lastAccessTime = new Date();
                setExpression(evaluationCallback(currentExpression));
                setKeyPadOpen(!keypadOpen);
              }}
              _text={{
                fontSize: 'lg',
                color: 'blue.600',
              }}
              leftIcon={
                keypadOpen ? (
                  <Icon size="md" as={Feather} name="check" color="blue.600" />
                ) : (
                  <Icon size="md" as={Feather} name="edit" color="blue.600" />
                )
              }>
              {keypadOpen ? 'DONE EDITING' : 'EDIT ENTRY'}
            </Button>
          </Center>
        </Center>

        <Center
          padding="20px"
          _text={{
            fontSize: 'xl',
            color: 'light.600',
          }}
          flex="2"
          bg="white"
          borderRadius="lg"
          width="92%"
          shadow="7"
          marginBottom="5px">
          Created By:&nbsp;{transaction.creator}
          Last Edit On:
          {transaction.getLastAccessTimeSliced(0, 9) +
            transaction.getLastAccessDateSliced()}
        </Center>
      </Center>
      <Box flex="1" bg="light.200">
        {keypadOpen && (
          <KeyPad
            setExpression={setExpression}
            evaluationCallback={evaluationCallback}
          />
        )}
      </Box>
    </>
  );
};

export default Calculator;
