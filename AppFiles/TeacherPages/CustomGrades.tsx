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
import {firebase} from '@react-native-firebase/database';
import Styles from './Styles';
const blackColor = '#434343';
const beigeColor = '#F4F1E3';
const backgroundImage = '../Images/BackgroundBlend.png';
const arrowLeftImage = '../Images/arrowLeftBeige.png';
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
  const [typeValues, setTypeValues]: any = useState({});
  const [gradeValues, setGradeValues]: any = useState({});
  let currentClass = route.params.currentClass;

  var renderGrade = ({item}: any) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: '10%',
        }}>
        <View style={{width: 80, alignItems: 'center'}}>
          <Text style={[styles.studentNameStyle]}>{item.name}</Text>
        </View>
        <View style={{width: 80, alignItems: 'center'}}>
          <TextInput
            style={Styles.gradeInput}
            onChangeText={text => {
              const regex = /^[HPT]*$/;
              if (!regex.test(text)) {
                text = '';
              }
              const nextTypeValues: any = {};
              for (const key in typeValues) {
                nextTypeValues[key] = typeValues[key];
              }
              nextTypeValues[item.studentId] = text;
              setTypeValues(nextTypeValues);
            }}
            maxLength={1}
            value={typeValues[item.studentId]}
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
              for (const key in typeValues) {
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
            });
            finalTypeValues[studentId] = '';
            gradeValues[studentId] = '';
          }
        }
        setTypeValues(finalTypeValues);
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
          <View style={{flex: 12}}>
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
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: '3%',
                }}>
                <Text style={styles.subtitleStyle}>H=Homework</Text>
                <Text style={styles.subtitleStyle}>P=Project</Text>
                <Text style={styles.subtitleStyle}>T=Test</Text>
              </View>
              <View
                style={{
                  width: '80%',
                  flexDirection: 'row',
                  marginTop: '10%',
                  justifyContent: 'space-between',
                }}>
                {rectangleHeader('Name')}
                {rectangleHeader('Type')}
                {rectangleHeader('Grade')}
              </View>
              <FlatList
                data={students}
                renderItem={renderGrade}
                style={{width: '80%'}}
              />
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableNativeFeedback
              onPress={() => {
                navigation.goBack();
              }}>
              <ImageBackground
                source={require(arrowLeftImage)}
                style={{width: 35, height: 35, marginLeft: '5%'}}
              />
            </TouchableNativeFeedback>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
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
