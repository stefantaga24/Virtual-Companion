/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Image, View, Text} from 'react-native';

const styles = StyleSheet.create({
  rectangle: {
    width: 70,
    height: 73,
    backgroundColor: '#5E242D',
    borderRadius: 30,
    left: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  transpRectangle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: '70%',
    height: 59,
    borderRadius: 30,
  },
  subTitle: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 30,
  },
});
function onPressButton({
  navigation,
  targetPage,
  name,
  id,
}: {
  navigation: any;
  targetPage: string;
  name: string;
  id: number;
}) {
  navigation.navigate(targetPage, {name: name, id: id});
}

const possibleSources = [
  require('./Images/StudentIcon.png'),
  require('./Images/TeacherLogo.png'),
  require('./Images/ParentLogo.png'),
];
const targetPageName = ['Student', 'Teacher', 'Parent'];
function OptionRectangle({
  name,
  thisSource,
  navigation,
}: {
  name: string;
  thisSource: number;
  navigation: any;
}) {
  return (
    <TouchableNativeFeedback
      onPress={() =>
        onPressButton({
          navigation: navigation,
          targetPage: 'LoginPage',
          name: targetPageName[thisSource],
          id: thisSource,
        })
      }>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: '8%',
        }}>
        <View style={{flex: 3, alignItems: 'center'}}>
          <Image
            source={possibleSources[thisSource]}
            style={{height: 80, width: 80}}
          />
        </View>
        <View style={{flex: 4}}>
          <Text style={styles.subTitle}>{name}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
export default OptionRectangle;
