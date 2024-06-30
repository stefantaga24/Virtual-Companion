import React from 'react';
import {
  ImageBackground,
  View,
  TouchableNativeFeedback,
  Text,
} from 'react-native';
const arrowLeftImage = '../Images/arrowLeftBeige.png';
const beigeColor = '#F4F1E3';

function TabGrades({
  params,
  navigation,
  pageName,
}: {
  params: any;
  navigation: any;
  pageName: any;
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.goBack(params);
        }}>
        <ImageBackground
          source={require(arrowLeftImage)}
          style={{width: 35, height: 35}}
        />
      </TouchableNativeFeedback>
      <View>
        <TabOption
          navigation={navigation}
          subtitle={'Add grades'}
          image={'addGradesIcon'}
          targetPage="Custom Grades"
          params={params}
          transparent={pageName !== 'Custom Grades'}
        />
      </View>
      <View>
        <TabOption
          navigation={navigation}
          subtitle={'Edit grades'}
          image={'editGradesIcon'}
          targetPage="Edit Grades"
          params={params}
          transparent={pageName !== 'Edit Grades'}
        />
      </View>
      <View style={{marginRight: '5%'}}>
        <TabOption
          navigation={navigation}
          subtitle={'Overview'}
          image={'overviewGradesIcon'}
          targetPage="Overview Grades"
          params={params}
          transparent={pageName !== 'Overview Grades'}
        />
      </View>
    </View>
  );
}
export default TabGrades;

function TabOption({
  navigation,
  subtitle,
  image,
  targetPage,
  params,
  transparent,
}: {
  navigation: any;
  subtitle: string;
  image: string;
  targetPage: string;
  params: any;
  transparent: any;
}) {
  let iconWidth = 40;
  let iconHeight = 40;
  let imageOptions: any = {
    addGradesIcon: require('../Images/addGradesIcon.png'),
    editGradesIcon: require('../Images/editGradesIcon.png'),
    overviewGradesIcon: require('../Images/overviewGradesIcon.png'),
  };
  let opacity = 1;
  if (transparent) {
    opacity = 0.5;
  }
  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.navigate(targetPage, params);
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <ImageBackground
          style={{height: iconHeight, width: iconWidth, opacity: opacity}}
          source={imageOptions[image]}
        />
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            fontSize: 14,
            color: beigeColor,
            opacity: opacity,
          }}>
          {subtitle}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}
