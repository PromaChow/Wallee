import React, {useState, useEffect, useCallback} from 'react';
import listOfJournals from '../userSpace';
import {bgColors} from '../../App';
import {
  Pressable,
  Box,
  Text,
  Button,
  Divider,
  Center,
  Icon,
  Stack,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ExpenseJournal, IncomeJournal, Journal} from '../journal';
import {color} from 'react-native-reanimated';
import DeleteModal from './DeleteModal';

const JournalListView = ({
  rate,
  applyRate,
  journal,
  colorIndex = 2,
  showModal,
  setShowModal,
  navigation,
}) => {
  // console.log(listOfJournals[journal.title]);

  return journal === undefined ? null : (
    <>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        journal={journal}
      />
      <Pressable
        onPress={() => {
          navigation.navigate('JournalView', {
            journal: journal,
          });

          journal.lastAccessTime = new Date();
        }}
        onLongPress={() => {
          setShowModal(true);
        }}>
        {({isPressed}) => (
          <Box
            paddingY="5px"
            alignItems={'space-between'}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.95 : 1,
                },
              ],
            }}
            bg={isPressed ? 'light.200' : 'white'}
            borderRadius="lg"
            width="92%"
            marginY="10px"
            borderTopWidth="8px"
            borderTopColor={bgColors[colorIndex]}
            shadow="5">
            <Box
              marginTop="5px"
              marginBottom="10px"
              flexDirection="row"
              justifyContent="space-between">
              <Center marginX={'10px'} flex="1">
                <Icon as={Feather} name="book" size="xl" color="light.600" />
              </Center>
              <Box marginLeft={'5px'} flex="4" alignItems="flex-start">
                <Text fontSize={'xl'} fontWeight="semibold" color="muted.700">
                  {journal.title}
                </Text>
                <Text fontSize={'sm'} fontWeight="semibold" color="muted.500">
                  {journal.getLastAccessDateSliced(4, 10)}
                </Text>
              </Box>
              <Center
                _text={{
                  fontSize: '2xl',
                  fontWeight: 'semibold',
                  color: 'success.500',
                }}
                marginX="35px"
                flex="3"
                justifyContent={'center'}>
                {(journal.contribution * (applyRate ? rate : 1)).toFixed(2)}

                <Divider bg="light.300" thickness={'2'} />

                <Text fontSize={'sm'} fontWeight="semibold" color="muted.500">
                  {journal instanceof IncomeJournal ? 'income' : 'expense'}
                </Text>
              </Center>
              <Center marginRight={'4'} marginLeft={'5px'} flex="1">
                <Icon
                  as={Feather}
                  name={
                    journal instanceof IncomeJournal
                      ? 'arrow-up-circle'
                      : 'arrow-down-circle'
                  }
                  size="xl"
                  color={
                    journal instanceof IncomeJournal ? 'info.500' : 'red.400'
                  }
                />
              </Center>
            </Box>
          </Box>
        )}
      </Pressable>
    </>
  );
};

export default JournalListView;
