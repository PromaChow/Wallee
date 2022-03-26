/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screen/HomeScreen';
import { Profile } from './screen/Profile';
import { Feed } from './screen/Feed';
import { OTP } from './screen/OTPScreen';
import { SignUp } from './screen/SignUp';
import {ifExist, add_User,retrieve_data,update_doc,} from './FireStoreHelperFunctions';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';







const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  let str = 'pr';
  return (
    
    <Button title="Add" onPress={() => { var b; ifExist('1232423566776',b).then(()=>{console.log(b);}) }}></Button>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ title: 'Welcome' }}
    //     />
    //     <Stack.Screen
    //       name="Profile"
    //       component={Profile}
    //       options={{ title: 'Welcome' }}
    //     />
    //     <Stack.Screen
    //       name="Feed"
    //       component={Feed}
    //       options={{ title: 'Welcome' }}
    //     />


    //     <Stack.Screen
    //       name="OTP"
    //       component={OTP}
    //       options={{ title: 'Welcome' }}
    //     />

    //     <Stack.Screen
    //       name="SignUp"
    //       component={SignUp}
    //       options={{ title: 'Welcome' }}
    //     />
    //     {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>
    //   <SafeAreaView>
    //   <Button title="Rtrieve" onPress={() => retrieve_data('5opQHiDLez9N6oAgHQe4')} />
    //   <Button title="Rtrieve" onPress={() =>{ bl = ifExist('5opQHiDLez9N6oAgHQe4'); console.log(bl)}} />
    // </SafeAreaView>
    // const [confirm, setConfirm] = React.useState(null);

    // const [code, setCode] = React.useState('');

    // async function signInWithPhoneNumber(phoneNumber) {
    //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //   setConfirm(confirmation);
    // }

    // async function confirmCode() {
    //   try {
    //     await confirm.confirm(code);
    //   } catch (error) {
    //     console.log('Invalid code.');
    //   }
    // }

    // if (!confirm) {
    //   return (
    //     <Button
    //       title="Phone Number Sign In"
    //       onPress={() => signInWithPhoneNumber('+8801234567890')}
    //     />
    //   );
    // }

    // return (
    //   <>
    //     <TextInput value={code} onChangeText={text => setCode(text)} />
    //     <Button title="Confirm Code" onPress={() => confirmCode()} />
    //   </>
  );
}

// const isDarkMode = useColorScheme() === 'dark';

// const backgroundStyle = {
//   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// };

// return (
//   <SafeAreaView style={backgroundStyle}>
//     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//     <ScrollView
//       contentInsetAdjustmentBehavior="automatic"
//       style={backgroundStyle}>
//       <Header />
//       <View
//         style={{
//           backgroundColor: isDarkMode ? Colors.black : Colors.white,
//         }}>
//         <Section title="Step One">
//           Edit <Text style={styles.highlight}>App.js</Text> to change this
//           screen and then come back to see your edits.
//         </Section>
//         <Section title="See Your Changes">
//           <ReloadInstructions />
//         </Section>
//         <Section title="Debug">
//           <DebugInstructions />
//         </Section>
//         <Section title="Learn More">
//           Read the docs to discover what to do next:
//         </Section>
//         <LearnMoreLinks />
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// );


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
