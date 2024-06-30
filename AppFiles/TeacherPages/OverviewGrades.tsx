/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {ImageBackground, View, FlatList, Text} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import TabGrades from '../Utilities/TabGrades';
import Styles from './Styles';
const blackColor = '#434343';
const beigeColor = '#F4F1E3';
const backgroundImage = '../Images/BackgroundBlend.png';
const databaseRef = firebase
  .app()
  .database(
    'https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/',
  );

let studentNameStyle = {
  fontSize: 14,
  fontFamily: 'Inter-Bold',
  color: blackColor,
};
let rectangleStyle = {
  color: beigeColor,
  fontFamily: 'Inter-SemiBold',
  fontSize: 15,
  textAlign: 'center',
};
const recHeaderVarWidth = (interiorText: string, width: number) => {
  return (
    <View
      style={{
        width: width,
        height: 24,
        backgroundColor: blackColor,
        borderRadius: 7,
      }}>
      <Text style={rectangleStyle}>{interiorText}</Text>
    </View>
  );
};

function OverviewGrades({route, navigation}: {route: any; navigation: any}) {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  let currentClass = route.params.currentClass;
  var renderGrade = ({item}: any) => {
    console.log(item);
    return (
      <View>
        <Text style={Styles.gradeText}>{item.Value}</Text>
      </View>
    );
  };
  var renderStudentData = ({item}: any) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: '10%',
        }}>
        <View style={{width: 80, alignItems: 'center'}}>
          <Text style={[studentNameStyle]}>{item.name}</Text>
        </View>
        <View>
          <FlatList
            style={Styles.gradesListStyle}
            data={item.grades}
            renderItem={renderGrade}
            horizontal={true}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (loading === false) {
      return;
    }
    databaseRef
      .ref('Students/')
      .once('value')
      .then(snapshot => {
        let finalStudents: any = [];
        for (const studentId in snapshot.val()) {
          if (snapshot.val()[studentId].ClassID === currentClass) {
            finalStudents.push({
              studentId: studentId,
              name: snapshot.val()[studentId].Name,
              grades: snapshot.val()[studentId].Grades,
            });
          }
        }
        setStudents(finalStudents);
      });
    if (students) {
      setLoading(false);
    }
  }, [loading, students, currentClass]);
  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../Images/BackgroundBlend.png')}
        />
      </View>
    );
  }
  const nameHeaderWidth = 80;
  const gradesHeaderWidth = 180;
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground style={{flex: 1}} source={require(backgroundImage)}>
        <View style={{flex: 1}}>
          <View style={{flex: 10}}>
            <View
              style={{
                height: 41,
                width: 167,
                backgroundColor: blackColor,
                borderRadius: 7,
                justifyContent: 'center',
                marginTop: '20%',
                marginLeft: '10%',
              }}>
              <Text
                style={{
                  marginLeft: '5%',
                  color: beigeColor,
                  fontFamily: 'Inter-Medium',
                  fontSize: 30,
                }}>
                {currentClass}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: '80%',
                  flexDirection: 'row',
                  marginTop: '10%',
                  justifyContent: 'space-between',
                }}>
                {recHeaderVarWidth('Name', nameHeaderWidth)}
                {recHeaderVarWidth('Grades', gradesHeaderWidth)}
              </View>
              <FlatList
                data={students}
                renderItem={renderStudentData}
                style={{width: '80%'}}
              />
            </View>
          </View>
          <TabGrades
            currentClass={currentClass}
            navigation={navigation}
            pageName={'Overview Grades'}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default OverviewGrades;
