import React from 'react';
import {View, ImageBackground} from 'react-native';
const backgroundImage = '../Images/BackgroundBlend.png';

function Background() {
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground style={{flex: 1}} source={require(backgroundImage)} />
    </View>
  );
};
export default Background;
