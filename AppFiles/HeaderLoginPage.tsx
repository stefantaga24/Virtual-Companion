/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';

const possibleSources = [
  require('./Images/ShadowedStudentLogo.png'),
  require('./Images/ShadowedTeacherLogo.png'),
  require('./Images/ShadowedParentLogo.png'),
];
function HeaderLoginPage({thisSource}: {thisSource: number}) {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={possibleSources[thisSource]}
          style={{
            height: 114,
            width: 114,
            shadowColor: 'rgba(0,0,0,0.25)',
            shadowOffset: {width: 0, height: 4},
            shadowRadius: 4,
          }}
        />
      </View>
    </View>
  );
}
export default HeaderLoginPage;
