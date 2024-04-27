import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Add the missing import statement for the optionRectangle component
import WelcomePage from './AppFiles/WelcomePage';
import LoginPage from './AppFiles/LoginPage';
import AccountOptions from './AppFiles/AccountOptions';
import ChooseUser from './AppFiles/ChooseUser';
import Settings from './AppFiles/SettingsPage';
const Stack = createNativeStackNavigator();


const MyApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="WelcomePage" component={WelcomePage}/>
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name="AccountOptions" component={AccountOptions}/>
        <Stack.Screen name="ChooseUser" component={ChooseUser}/>
        <Stack.Screen name="Settings" component={Settings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;