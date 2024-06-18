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
import TeacherContacts from './AppFiles/TeacherContacts';
import Schedule from './AppFiles/Schedule';
import Grades from './AppFiles/Grades';
import SubjectGradePage from './AppFiles/SubjectGradePage';
import TeacherAccountOptions from './AppFiles/TeacherPages/TeacherAccountOptions';
import TeacherSchedule from './AppFiles/TeacherPages/TeacherSchedule';
import TeacherGrades from './AppFiles/TeacherPages/TeacherGrades';
const Stack = createNativeStackNavigator();


const MyApp = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="WelcomePage" component={WelcomePage}/>
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name="TeacherAccountOptions" component={TeacherAccountOptions}/>
        <Stack.Screen name="AccountOptions" component={AccountOptions}/>
        <Stack.Screen name="ChooseUser" component={ChooseUser}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Teacher Contacts" component={TeacherContacts}/>
        <Stack.Screen name="Schedule" component = {Schedule}/>
        <Stack.Screen name="TeacherSchedule" component= {TeacherSchedule}/>
        <Stack.Screen name="Grades" component = {Grades}/>
        <Stack.Screen name="TeacherGrades" component = {TeacherGrades}/>
        <Stack.Screen name="SubjectGradePage" component = {SubjectGradePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;