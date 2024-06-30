/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';

const blackColor = '#434343';
const beigeColor = '#F4F1E3';
const backgroundImage = '../Images/BackgroundBlend.png';
let textStyle = {
  fontSize: 24,
  fontFamily: 'Inter-ExtraBold',
  color: blackColor,
};
function SelectOption({route, navigation}: {route: any; navigation: any}) {
  let currentClass = route.params.currentClass;

  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground style={{flex: 1}} source={require(backgroundImage)}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, marginLeft: '10%'}}>
            <View
              style={{
                height: 32,
                width: 167,
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
                Grades
              </Text>
            </View>
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate('Custom Grades', {
                  currentClass: currentClass,
                });
              }}>
              <Text style={[textStyle, {marginTop: '10%'}]}>
                Add Custom Grades
              </Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate('Exam Grades', {
                  currentClass: currentClass,
                });
              }}>
              <Text style={textStyle}>Add Exam Grades</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate('Overview Grades', {
                  currentClass: currentClass,
                });
              }}>
              <Text style={textStyle}>Overview Grades</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default SelectOption;
