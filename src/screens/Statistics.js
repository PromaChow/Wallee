import React, {useState} from 'react';
import {
  Modal,
  Input,
  Text,
  FormControl,
  Button,
  Radio,
  Box,
  Center,
  ScrollView,
} from 'native-base';
import {PieChart, BarChart, LineChart} from 'react-native-chart-kit';
import {IncomeJournal, ExpenseJournal, Journal} from '../journal';
import listOfJournals, {listOfBudgets} from '../userSpace';
import {journalKeyMemo, getRandomColor} from '../../App';
import {useRefresh} from '../../App';
import NavBar from '../components/NavBar';
import {bgColors} from '../../App';

import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#333333',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#222222',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(68, 75, 87, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Statistics = ({navigation, dateMin, dateMax}) => {
  //   useRefresh();

  const data = [];
  const colors = [
    '#cd3132',
    '#007add',
    '#11A8CD',
    '#2472C8',
    '#0DBC79',
    '#E5E510',
    '#555753',
    '#23D18B',
    '#D670D6',
  ];

  let colorIndex = 0;

  // Populating data
  for (const journal of Object.values(listOfJournals)) {
    if (
      journal.timeOfCreation.getTime() > dateMin.getTime() &&
      journal.timeOfCreation.getTime() <= dateMax.getTime()
    )
      data.push({
        name: journal.title,
        population: journal.getContributionInRange(dateMin, dateMax),
        color: colors[colorIndex++],
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      });
  }

  return (
    <Box flex="1" mt="3" alignItems={'center'}>
      {/* <NavBar title={'Statistics'} navigation={navigation} /> */}

      <Center
        padding="20px"
        _text={{
          fontSize: 'xl',
          color: 'light.600',
        }}
        bg="white"
        borderRadius="lg"
        width="full"
        shadow="7"
        marginBottom="5px">
        <PieChart
          data={data}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 10]}
          absolute
        />
      </Center>

      <Center
        marginTop={'10px'}
        padding="20px"
        _text={{
          fontSize: 'xl',
          color: 'light.600',
        }}
        bg="white"
        borderRadius="lg"
        width="full"
        shadow="7"
        marginBottom="5px">
        <Text fontSize={'sm'} fontWeight="semibold" color="muted.500">
          YOUR BUDGET SIZES AT A GLANCE
        </Text>

        <BarChart
          data={{
            labels: Object.keys(listOfBudgets),
            datasets: [
              {
                data: Object.values(listOfBudgets).map(budget => budget.amount),
              },
            ],
          }}
          width={screenWidth} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
        />
      </Center>
    </Box>
  );
};

export default Statistics;
