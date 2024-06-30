/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';

const blackColor = '#434343';
const beigeColor = '#F4F1E3';
const backgroundImage = '../Images/BackgroundBlend.png';
const databaseRef = firebase
  .app()
  .database(
    'https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/',
  );

let textStyle = {
  fontSize: 24,
  fontFamily: 'Inter-ExtraBold',
  color: blackColor,
};
let classTextStyle = {
  fontSize: 30,
  fontFamily: 'Inter-ExtraBold',
  color: blackColor,
};
function TeacherGrades({route, navigation}: {route: any; navigation: any}) {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState();
  var id = route.params.id;
  useEffect(() => {
    if (loading === false) {
      return;
    }
    databaseRef
      .ref('Teachers/' + id)
      .once('value')
      .then(snapshot => {
        setClasses(snapshot.val().classes);
      });
    if (classes) {
      setLoading(false);
    }
  }, [loading, id, classes]);

  const renderDataItem = ({item}: any) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Custom Grades', {currentClass: item});
        }}>
        <View>
          <Text style={classTextStyle}>{item}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
        <ImageBackground style={{flex: 1}} source={require(backgroundImage)} />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground style={{flex: 1}} source={require(backgroundImage)}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, marginLeft: '10%'}}>
            <View
              style={{
                height: 32,
                width: 200,
                backgroundColor: blackColor,
                borderRadius: 7,
                justifyContent: 'center',
                marginTop: '20%',
              }}>
              <Text
                style={{
                  marginLeft: '5%',
                  color: beigeColor,
                  fontFamily: 'Inter-SemiBold',
                  fontSize: 20,
                }}>
                Choose class
              </Text>
            </View>
            <FlatList data={classes} renderItem={renderDataItem} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default TeacherGrades;
