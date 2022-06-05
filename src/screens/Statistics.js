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
import {PieChart, LineChart} from 'react-native-chart-kit';
import {IncomeJournal, ExpenseJournal, Journal} from '../journal';
import listOfJournals from '../userSpace';
import {journalKeyMemo, getRandomColor} from '../../App';
import {useRefresh} from '../../App';
import NavBar from '../components/NavBar';
import {bgColors} from '../../App';

import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Statistics = ({navigation, dateMin, dateMax}) => {
  //   useRefresh();

  //   const dateMin = new Date('June 04, 2022 05:24:00');
  //   const dateMax = new Date();
  const data = [];
  const colors = ['#cd3132', '#007add'];
  let colorIndex = 0;

  // Populating data
  for (const journal of Object.values(listOfJournals)) {
    if (
      journal.timeOfCreation.getTime() > dateMin.getTime() &&
      journal.timeOfCreation.getTime() <= dateMax.getTime()
    )
      data.push({
        name: journal.title,
        population: journal.contribution,
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
        <Text fontSize={'sm'} fontWeight="semibold" color="muted.500">
          YOUR JOURNALS AT A GLANCE
        </Text>
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
      {/* <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}
    </Box>
  );
};

export default Statistics;
