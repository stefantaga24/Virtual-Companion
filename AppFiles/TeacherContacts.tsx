/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  FlatList,
  Image,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import Clipboard from '@react-native-clipboard/clipboard';

const databaseRef = firebase
  .app()
  .database(
    'https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/',
  );

const headerRectangleStyle = {
  height: 24,
  width: 80,
  backgroundColor: '#434343',
  borderRadius: 7,
  alignItems: 'center',
};
const headerTextStyle = {
  fontFamily: 'Inter-SemiBold',
  fontSize: 15,
  color: '#F4F1E3',
};
function TeacherContacts({route}: {route: any}) {
  const [currentClass, setCurrentClass] = useState('');
  const [currentProfessors, setCurrentProfessors] = useState();
  const [loading, setLoading] = useState(true);
  var id = route.params.id;
  useEffect(() => {
    if (loading === false) {
      return;
    }
    databaseRef
      .ref('Students/' + id)
      .once('value')
      .then(snapshot => {
        setCurrentClass(' ' + snapshot.val().ClassID);
        databaseRef
          .ref('Teachers')
          .once('value')
          .then(snapshot2 => {
            var professors: any = [];
            for (let key in snapshot2.val()) {
              var currentProfessor = snapshot2.val()[key];
              if (currentProfessor == null) {
                continue;
              }
              for (var i = 0; i < currentProfessor.classes.length; i++) {
                var currClass = currentProfessor.classes[i];
                if (
                  currClass.replace(' ', '') === currentClass.replace(' ', '')
                ) {
                  professors.push(currentProfessor);
                }
              }
            }
            if (professors) {
              setCurrentProfessors(professors);
              setLoading(false);
            }
          });
      });
  });
  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
        <ImageBackground
          style={{flex: 1}}
          source={require('./Images/BackgroundBlend.png')}
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('./Images/BackgroundBlend.png')}>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('./Images/TeacherContactsHeader.png')}
            style={{width: 106, height: 106}}
          />
          <Text
            style={{color: '#434343', fontSize: 20, fontFamily: 'Inter-Bold'}}>
            Teacher Contacts
          </Text>
        </View>
        <View style={{flex: 5}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={headerRectangleStyle}>
                <Text style={headerTextStyle}>Name</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={headerRectangleStyle}>
                <Text style={headerTextStyle}>Subject</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={headerRectangleStyle}>
                <Text style={headerTextStyle}>Contact</Text>
              </View>
            </View>
          </View>
          <FlatList
            data={currentProfessors}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={{width: 80, alignItems: 'start'}}>
                    <Text
                      style={{
                        color: '#434343',
                        marginTop: 5,
                        fontSize: 11,
                        fontFamily: 'Inter-Bold',
                      }}>
                      {item.Name}
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={{width: 80, alignItems: 'start'}}>
                    <Text
                      style={{
                        color: '#434343',
                        marginTop: 5,
                        fontSize: 11,
                        fontFamily: 'Inter-Medium',
                      }}>
                      {item.Subject}
                    </Text>
                  </View>
                </View>
                <View
                  style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#434343',
                      marginTop: 5,
                      fontSize: 11,
                      fontFamily: 'Inter-Medium',
                      width: '80%',
                    }}>
                    {item.Email}
                  </Text>
                  <TouchableNativeFeedback
                    onPress={() => {
                      Clipboard.setString(item.Email.toString());
                    }}
                    useForeground={true}>
                    <Image
                      source={require('./Images/Copy.png')}
                      style={{height: 17, width: 17}}
                    />
                  </TouchableNativeFeedback>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
export default TeacherContacts;
