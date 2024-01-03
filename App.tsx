import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Add the missing import statement for the optionRectangle component
import FirstPage from './AppFiles/FirstPage';
import LoginPage from './AppFiles/LoginPage';
import AccountOptions from './AppFiles/AccountOptions';
const Stack = createNativeStackNavigator();


const MyApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="FirstPage" component={FirstPage}/>
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name="AccountOptions" component={AccountOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;