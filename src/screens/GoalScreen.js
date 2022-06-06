import React, {useState} from 'react';
import CreateJournalView from '../components/CreateJournalView';
import {ScrollView, Fab, Box, Icon, IconButton, Center} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth, journalKeyMemo, windowHeight} from '../../App';
import NavBar from '../components/NavBar';
import {IncomeJournal, ExpenseJournal} from '../journal';
import GoalListView from '../components/GoalListView';
import {Goal} from '../budget';
import {listOfGoals} from '../userSpace';
import CreateGoal from '../components/CreateGoal';
import {useRefresh} from '../../App';

const GoalScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  useRefresh();

  return (
    <>
      <Box bg="light.200" flex={1}>
        <NavBar title={'Goals'} navigation={navigation} />
        <ScrollView flex="1">
          <Box alignItems="center" bg="light.200">
            {Object.keys(listOfGoals).map(key => {
              return (
                <GoalListView
                  key={key}
                  goal={listOfGoals[key]}
                  colorIndex={journalKeyMemo[key]}
                />
              );
            })}
          </Box>
        </ScrollView>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="md"
          icon={<Icon color="white" as={Feather} name="plus" size="md" />}
          onPress={() => setShowModal(true)}
        />
      </Box>
      <CreateGoal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default GoalScreen;
