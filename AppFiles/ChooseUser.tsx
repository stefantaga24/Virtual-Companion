/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Text,
  ImageBackground,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import OptionRectangle from './OptionRectangle';

const ChooseUser = ({navigation}: {navigation: any}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('./Images/BackgroundBlend.png')}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Inter-SemiBold',
              fontSize: 35,
              textShadowColor: 'rgba(0,0,0,0.25)',
              textShadowOffset: {width: 0, height: 4},
              textShadowRadius: 4,
            }}>
            Choose User
          </Text>
        </View>
        <View style={{flex: 3}}>
          <View style={{flex: 1}}>
            <OptionRectangle
              name="Student"
              thisSource={0}
              navigation={navigation}
            />
            <OptionRectangle
              name="Teacher"
              thisSource={1}
              navigation={navigation}
            />
            <OptionRectangle
              name="Parent"
              thisSource={2}
              navigation={navigation}
            />
          </View>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            marginBottom: '8%',
            marginLeft: '6%',
          }}>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('./Images/arrowLeft.png')}
              style={{height: 24, width: 24}}
            />
          </TouchableNativeFeedback>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChooseUser;
