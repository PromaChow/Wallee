import React, {memo, useState, useEffect} from 'react';
import {
  Pressable,
  Text,
  HStack,
  VStack,
  Modal,
  Box,
  Input,
  Button,
  Center,
  Icon,
} from 'native-base';
import {TouchableOpacity, StyleProp} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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
            !['+', '-', '*', '/'].includes(
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
const EvalButton = ({evaluateExpression}) => {
  return (
    <Button
      variant="ghost"
      borderRadius="none"
      flex="1"
      _text={{fontSize: '4xl', fontWeight: 'medium', color: 'gray.500'}}
      onPress={() =>
        evaluateExpression(expression => {
          if (['+', '-', '*', '/'].includes(expression[expression.length - 1]))
            expression = expression.slice(0, -1);
          if (expression == '') return '';
          const evaluator = new Function(`return ${expression};`);
          return evaluator().toString();
        })
      }>
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

let KeyPad = ({setExpression}) => (
  <Box flex="3" flexDirection="row" height="100%">
    <HStack flex="3" flexDirection="row" bg="info.100">
      <VStack flex="1">
        <NumButton key={'7'} renderSymbol={'7'} appendSymbol={setExpression} />
        <NumButton key={'4'} renderSymbol={'4'} appendSymbol={setExpression} />
        <NumButton key={'1'} renderSymbol={'1'} appendSymbol={setExpression} />
        <NumButton key={'.'} renderSymbol={'.'} appendSymbol={setExpression} />
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
        <EvalButton key={'='} evaluateExpression={setExpression} />
      </VStack>
    </HStack>
  </Box>
);

KeyPad = React.memo(KeyPad);

const Calculator = ({transaction}) => {
  const [currentExpression, setExpression] = useState(transaction.amount);
  const [keypadOpen, setKeyPadOpen] = useState(true);

  useEffect(() => {
    return () => {
      transaction.amount = currentExpression;
    };
  }, []);

  return (
    <>
      <Box flex="2">
        <Box pt={10} pb={0} bg="gray.50" justifyContent="center">
          <Center flex="1">
            <Box
              _text={{
                fontSize: 'xl',
                color: 'black',
              }}>
              Cash Flow
            </Box>
            <Box
              _text={{
                fontSize: '4xl',
                fontWeight: 'semibold',
                color: 'success.600',
              }}>
              {currentExpression}
            </Box>
          </Center>

          <Box flex="1">
            <Button
              onPressIn={() => setKeyPadOpen(!keypadOpen)}
              borderColor={'black'}
              size="md"
              variant="ghost"
              onPress={null}>
              <Icon
                size="md"
                as={Feather}
                name="edit-2"
                color="gray.600"></Icon>
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        flex="1"
        alignItems={'center'}
        _text={{
          fontSize: 'xl',
          color: 'black',
        }}>
        Time Of Creation: {transaction.timeOfCreation}
      </Box>
      <Box
        flex="1"
        alignItems={'center'}
        _text={{
          fontSize: 'xl',
          color: 'black',
        }}>
        Created By : {transaction.creator}
      </Box>
      {keypadOpen && <KeyPad setExpression={setExpression} />}
    </>
  );
};

export default Calculator;

// const [showModal, setShowModal] = useState(false);
// <>
//   <Button onPress={() => setShowModal(true)}>Button</Button>
//   <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//     <Modal.Content maxWidth="400px">
//       <Modal.CloseButton />
//       <Modal.Header>Add Transaction</Modal.Header>
//       <Modal.Body>
//         <Text>Add Here</Text>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button.Group space={2}>
//           <Button
//             variant="ghost"
//             colorScheme="blueGray"
//             onPress={() => {
//               setShowModal(false);
//             }}>
//             Cancel
//           </Button>
//           <Button
//             onPress={() => {
//               setShowModal(false);
//             }}>
//             Save
//           </Button>
//         </Button.Group>
//       </Modal.Footer>
//     </Modal.Content>
//   </Modal>
// </>
