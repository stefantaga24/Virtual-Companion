import React, {useEffect, useState} from 'react';
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
import TeacherSchedule from './AppFiles/TeacherPages/TeacherSchedule';
import TeacherGrades from './AppFiles/TeacherPages/TeacherGrades';
import SelectClassPage from './AppFiles/TeacherPages/SelectClassPage';
import CustomGrades from './AppFiles/TeacherPages/CustomGrades';
import OverviewGrades from './AppFiles/TeacherPages/OverviewGrades';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const MyApp = () => {
  const [_user, setUser] = useState();

  function onAuthStateChanged(currentUser: any) {
    setUser(currentUser);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {_user == null ? (
          <>
            <Stack.Screen name="WelcomePage" component={WelcomePage} />
            <Stack.Screen name="ChooseUser" component={ChooseUser} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="AccountOptions" component={AccountOptions} />
            <Stack.Group>
              <Stack.Screen
                name="Teacher Contacts"
                component={TeacherContacts}
              />
              <Stack.Screen
                name="TeacherSchedule"
                component={TeacherSchedule}
              />
              <Stack.Screen
                name="SelectClassPage"
                component={SelectClassPage}
              />
              <Stack.Screen name="Custom Grades" component={CustomGrades} />
              <Stack.Screen name="Overview Grades" component={OverviewGrades} />
            </Stack.Group>
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="Grades" component={Grades} />
            <Stack.Screen name="TeacherGrades" component={TeacherGrades} />
            <Stack.Screen
              name="SubjectGradePage"
              component={SubjectGradePage}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;
