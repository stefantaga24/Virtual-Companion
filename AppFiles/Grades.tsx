/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  FlatList,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';

const blackColor = '#434343';
const beigeColor = '#F4F1E3';
const databaseRef = firebase
  .app()
  .database(
    'https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/',
  );

function Grades({route, navigation}: {route: any; navigation: any}) {
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState();
  const [allSubjects, setSubjects] = useState();
  var id = route.params.id;

  useEffect(() => {
    if (loading == false) {
      return;
    }
    databaseRef
      .ref('Students/' + id + '/Grades')
      .once('value')
      .then(snapshot => {
        var finalGrades: any = {};
        var finalSubjects: any = [];
        for (let i = 0; i < snapshot.val().length; i++) {
          const currSubject = snapshot.val()[i].Subject;
          if (!(currSubject in finalGrades)) {
            finalGrades[currSubject] = [];
            finalSubjects.push(currSubject);
          }
          finalGrades[currSubject].push({
            Value: snapshot.val()[i].Value,
            Type: snapshot.val()[i].Type,
            Date: snapshot.val()[i].Date,
          });
        }
        setGrades(finalGrades);
        setSubjects(finalSubjects);
      });
    if (grades) {
      setLoading(false);
    }
  }, [loading, id, grades]);

  const renderDateItem = ({item}: any) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          if (grades) {
            navigation.navigate('SubjectGradePage', {
              grades: grades[item],
              subjectName: item,
            });
          }
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: blackColor,
              fontFamily: 'Inter-ExtraBold',
              fontSize: 18,
            }}>
            {item}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                height: 32,
                width: 167,
                backgroundColor: blackColor,
                borderRadius: 7,
                justifyContent: 'center',
                marginLeft: '10%',
                marginTop: '20%',
              }}>
              <Text
                style={{
                  marginLeft: '5%',
                  color: beigeColor,
                  fontFamily: 'Inter-SemiBold',
                  fontSize: 20,
                }}>
                Subjects
              </Text>
            </View>
            <FlatList
              data={allSubjects}
              renderItem={renderDateItem}
              style={{marginTop: '15%', marginLeft: '13%'}}
              //onEndReached={fetchNextPage}
              //onEndReachedThreshold={0.8}
              //ListFooterComponent={ListEndLoader} // Loader when loading next page.
            />
          </View>
          <View style={{flex: 1}} />
        </View>
      </ImageBackground>
    </View>
  );
}
export default Grades;
