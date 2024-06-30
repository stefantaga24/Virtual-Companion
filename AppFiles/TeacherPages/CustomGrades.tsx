/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

function extractNumbers(input: any) {
  let numbers = input.match(/\d+/g);
  if (!numbers) {
    return '';
  }
  return numbers.join('');
}

import {firebase} from '@react-native-firebase/database';
import Styles from './Styles';
import TabGrades from '../Utilities/TabGrades';
const blackColor = '#434343';
const beigeColor = '#F4F1E3';
const placeHolderColor = 'rgba(67,67,67,0.5)';
const backgroundImage = '../Images/BackgroundBlend.png';
const databaseRef = firebase
  .app()
  .database(
    'https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/',
  );

const rectangleHeader = (interiorText: string) => {
  return (
    <View
      style={{
        width: 80,
        height: 24,
        backgroundColor: blackColor,
        borderRadius: 7,
      }}>
      <Text style={styles.rectangleStyle}>{interiorText}</Text>
    </View>
  );
};

function CustomGrades({route, navigation}: {route: any; navigation: any}) {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [dateValues, setDateValues]: any = useState({});
  const [gradeValues, setGradeValues]: any = useState({});
  
  let currentClass = route.params.currentClass;
  let subject = route.params.subject;
  var renderGrade = ({item}: any) => {
    let finalName = item.name.split(' ');
    finalName = finalName[0] + ' ' + finalName[1][0] + '.';
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: '10%',
        }}>
        <View
          style={{width: 80, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[styles.studentNameStyle]}>{finalName}</Text>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TextInput
            onChangeText={text => {
              const regex = /^[0123456789]*$/;
              if (!regex.test(text)) {
                text = extractNumbers(text);
              }
              const nextDateValues: any = {};
              for (const key in dateValues) {
                nextDateValues[key] = dateValues[key];
              }
              nextDateValues[item.studentId].day = text;
              setDateValues(nextDateValues);
            }}
            style={{color: blackColor}}
            placeholderTextColor={placeHolderColor}
            placeholder={'dd'}
            maxLength={2}
            onSubmitEditing={() => {
              this[item.studentId + 'monthInput'].focus();
            }}
            blurOnSubmit={false}
            value={dateValues[item.studentId].day}
          />
          <Text style={Styles.blackColor}>/</Text>
          <TextInput
            onChangeText={text => {
              const regex = /^[0123456789]*$/;
              if (!regex.test(text)) {
                text = extractNumbers(text);
              }
              const nextDateValues: any = {};
              for (const key in dateValues) {
                nextDateValues[key] = dateValues[key];
              }
              nextDateValues[item.studentId].month = text;
              setDateValues(nextDateValues);
            }}
            style={{color: blackColor}}
            placeholderTextColor={placeHolderColor}
            placeholder={'mm'}
            maxLength={2}
            ref={input => {
              this[item.studentId + 'monthInput'] = input;
            }}
            onSubmitEditing={() => {
              this[item.studentId + 'yearInput'].focus();
            }}
            blurOnSubmit={false}
            value={dateValues[item.studentId].month}
          />
          <Text style={Styles.blackColor}>/</Text>
          <TextInput
            onChangeText={text => {
              const regex = /^[0123456789]*$/;
              if (!regex.test(text)) {
                text = extractNumbers(text);
              }
              const nextDateValues: any = {};
              for (const key in dateValues) {
                nextDateValues[key] = dateValues[key];
              }
              nextDateValues[item.studentId].year = text;
              setDateValues(nextDateValues);
            }}
            style={{color: blackColor}}
            placeholderTextColor={placeHolderColor}
            placeholder={'year'}
            maxLength={4}
            ref={input => {
              this[item.studentId + 'yearInput'] = input;
            }}
            value={dateValues[item.studentId].year}
          />
        </View>
        <View style={{width: 80, alignItems: 'center'}}>
          <TextInput
            style={Styles.gradeInput}
            onChangeText={text => {
              const regex = /^[0123456789]*$/;
              if (!regex.test(text)) {
                text = '';
              } else if (Number(text) > 10 || Number(text) < 0) {
                text = text.slice(0, -1);
              }
              const nextGradeValues: any = {};
              for (const key in gradeValues) {
                nextGradeValues[key] = gradeValues[key];
              }
              nextGradeValues[item.studentId] = text;
              setGradeValues(nextGradeValues);
            }}
            value={gradeValues[item.studentId]}
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
        let finalTypeValues: any = {};
        for (const studentId in snapshot.val()) {
          if (snapshot.val()[studentId].ClassID === currentClass) {
            finalStudents.push({
              studentId: studentId,
              name: snapshot.val()[studentId].Name,
              grades: snapshot.val()[studentId].Grades,
            });
            finalTypeValues[studentId] = {
              day: '',
              month: '',
              year: '',
            };
            gradeValues[studentId] = '';
          }
        }
        setDateValues(finalTypeValues);
        setStudents(finalStudents);
        setGradeValues(gradeValues);
      });
    if (students) {
      setLoading(false);
    }
  }, [loading, students, gradeValues, currentClass]);
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
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground style={{flex: 1}} source={require(backgroundImage)}>
        <View style={{flex: 1}}>
          <View style={{flex: 10}}>
            <View style={{flexDirection: 'row'}}>
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
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <TouchableNativeFeedback
                  onPress={() => {
                    pushGrades();
                  }}>
                  <Text
                    style={{
                      color: blackColor,
                      fontFamily: 'Inter-SemiBold',
                      fontSize: 18,
                    }}>
                    Save
                  </Text>
                </TouchableNativeFeedback>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: '80%',
                  flexDirection: 'row',
                  marginTop: '10%',
                  justifyContent: 'space-between',
                }}>
                {rectangleHeader('Name')}
                {rectangleHeader('Date')}
                {rectangleHeader('Grade')}
              </View>
              <FlatList
                data={students}
                renderItem={renderGrade}
                style={{width: '80%'}}
              />
            </View>
          </View>
          <TabGrades
            params={route.params}
            navigation={navigation}
            pageName={'Custom Grades'}
          />
        </View>
      </ImageBackground>
    </View>
  );

  function pushGrades() {
    // This needs to be refactored in many ways
    // Need to add: Checking for the correct dates
    // Need to add: handling for if the user does not have internet
    // Need to add a module
    return;
    for (let i = 0; i < students.length; i++) {
      let student = students[i];
      let gradePosition = student.grades.length;
      console.log(student.studentId);
      databaseRef
        .ref('Students/' + student.studentId + '/Grades/' + gradePosition)
        .set({
          Date:
            dateValues[student.studentId].day +
            '/' +
            dateValues[student.studentId].month +
            '/' +
            dateValues[student.studentId].year,
          Value: gradeValues[student.studentId],
          Subject: subject,
        });
      students[i].grades.push({
        Date:
          dateValues[student.studentId].day +
          '/' +
          dateValues[student.studentId].month +
          '/' +
          dateValues[student.studentId].year,
        Value: gradeValues[student.studentId],
        Subject: subject,
      });
    }
    // Clear the grades
    const nextGradeValues: any = {};
    for (const key in gradeValues) {
      nextGradeValues[key] = '';
    }
    setGradeValues(nextGradeValues);
    const nextDateValues: any = {};
    for (const key in dateValues) {
      nextDateValues[key] = {day: '', month: '', year: ''};
    }
    setDateValues(nextDateValues);
  }
}
export default CustomGrades;

let styles = StyleSheet.create({
  subtitleStyle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: blackColor,
  },

  studentNameStyle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: blackColor,
  },
  rectangleStyle: {
    color: beigeColor,
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    textAlign: 'center',
  },
});
