/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ImageBackground, View} from 'react-native';
import EmptyRectangle from '../EmptyRectangle';
import {firebase} from '@react-native-firebase/database';
import ActionsRectangle from '../ActionsRectangle';

const databaseRef = firebase
  .app()
  .database(
    'https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/',
  );

function TeacherAccountOptions({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var accountType: string = route.params.accountType;
  var email: string = route.params.email;
  const [id, setId] = useState(0);
  databaseRef
    .ref('Emails/' + email.replace('@', '').replace('.', ''))
    .once('value')
    .then(snapshot => {
      setId(snapshot.val().id);
    });
  return (
    id != null && (
      <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../Images/BackgroundBlend.png')}>
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
                name="TeacherSchedule"
                navigation={navigation}
                accountType={accountType}
                id={id}
                pageName="Schedule"
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
                name="TeacherGrades"
                navigation={navigation}
                accountType={accountType}
                id={id}
                pageName="Grades"
              />
              <ActionsRectangle
                name="Parent Contacts"
                navigation={navigation}
                accountType={accountType}
                id={id}
                pageName="Parent Contacts"
              />
              <EmptyRectangle name="Grades" navigation={navigation} />
              <EmptyRectangle name="Grades" navigation={navigation} />
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  );
}
export default TeacherAccountOptions;
