/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ImageBackground,
  View,
  FlatList,
  Text,
  TouchableNativeFeedback,
} from 'react-native';

const blackColor = '#434343';
const beigeColor = '#F4F1E3';
const backgroundImage = '../Images/BackgroundBlend.png';

let classTextStyle = {
  fontSize: 30,
  fontFamily: 'Inter-ExtraBold',
  color: blackColor,
};
function SelectClassPage({route, navigation}: {route: any; navigation: any}) {
  let classes = route.params.classes;
  let pageName = route.params.targetPage;

  const renderDataItem = ({item}: any) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate(pageName, {currentClass: item});
        }}>
        <View>
          <Text style={classTextStyle}>{item}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };
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
                {pageName}
              </Text>
            </View>
            <FlatList data={classes} renderItem={renderDataItem} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default SelectClassPage;
