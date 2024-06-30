/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {ImageBackground, View, Text} from 'react-native';
import ActionsRectangle from './ActionsRectangle';
import EmptyRectangle from './EmptyRectangle';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const backgroundImage = './Images/BackgroundBlend.png';

const databaseRef = firebase
  .app()
  .database(
    'https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/',
  );

const pageConstants: any = {
  Teacher: {
    scheduleNavigation: 'TeacherSchedule',
    schedulePageName: 'Schedule',
    gradesNavigation: 'TeacherGrades',
    gradesPageName: 'Grades',
    contactsNavigation: 'Parent Contacts',
    contactsPageName: 'Parent Contacts',
  },
  Student: {
    scheduleNavigation: 'Schedule',
    schedulePageName: 'Schedule',
    gradesNavigation: 'Grades',
    gradesPageName: 'Grades',
    contactsNavigation: 'Teacher Contacts',
    contactsPageName: 'Teacher Contacts',
  },
};

function AccountOptions({navigation}: {navigation: any}) {
  const [id, setId] = useState(0);
  const [accountType, setAccountType] = useState('');
  const [loading, setLoading] = useState(true);
  let user = auth().currentUser;
  if (user == null || user.email == null) {
    return <Text>Please Login</Text>;
  }
  useEffect(() => {
    if (loading === false) {
      return;
    }
    console.log('The email: ' + user.email);
    console.log("At least I'm trying");
    var email: any = user.email;
    databaseRef
      .ref('Emails/' + email.replace('@', '').replace('.', ''))
      .once('value')
      .then(snapshot => {
        setAccountType(snapshot.val().accountType);
        setId(snapshot.val().id);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
        <ImageBackground style={{flex: 1}} source={require(backgroundImage)} />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('./Images/BackgroundBlend.png')}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <ActionsRectangle
              name={pageConstants[accountType].scheduleNavigation}
              navigation={navigation}
              accountType={accountType}
              id={id}
              pageName={pageConstants[accountType].schedulePageName}
            />
            <ActionsRectangle
              name="Announcements"
              navigation={navigation}
              accountType={accountType}
              id={id}
              pageName="Announcements"
            />
            <ActionsRectangle
              name="School Map"
              navigation={navigation}
              accountType={accountType}
              id={id}
              pageName="School Map"
            />
            <ActionsRectangle
              name="Settings"
              navigation={navigation}
              accountType={accountType}
              id={id}
              pageName="Settings"
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <ActionsRectangle
              name={pageConstants[accountType].gradesNavigation}
              navigation={navigation}
              accountType={accountType}
              id={id}
              pageName={pageConstants[accountType].gradesPageName}
            />
            <ActionsRectangle
              name={pageConstants[accountType].contactsNavigation}
              navigation={navigation}
              accountType={accountType}
              id={id}
              pageName={pageConstants[accountType].contactsPageName}
            />
            <EmptyRectangle />
            <EmptyRectangle />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default AccountOptions;
