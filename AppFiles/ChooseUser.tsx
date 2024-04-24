import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, ImageBackground, View, TouchableNativeFeedback} from 'react-native';
import auth from '@react-native-firebase/auth';
import OptionRectangle from './OptionRectangle';
const styles = StyleSheet.create({
  rectangle : {

      width: 70,
      height: 73,
      backgroundColor: '#5E242D',
      borderRadius: 30,
  },
  fiftyFifty: {
    height : '50%',
    marginTop : '50%',
  },
  title:{
    color: 'black',
    textAlign:'center',
    fontFamily: 'Content',
    fontWeight: "700",
    fontSize: 25,
  },
  subTitle:{
    color: 'black',
    fontWeight: "700",
    textAlign:'center',
    fontFamily: 'Content',
    fontSize: 15,
  }
});

const ChooseUser = ({navigation} :{navigation : any}) => {
  return (
      <View style={{flex: 1, backgroundColor: "#F6F2DB"}}>
        <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
             <View style={{flex:2, justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'black', fontFamily:'Inter-SemiBold',fontSize:35
                , textShadowColor:"rgba(0,0,0,0.25)", textShadowOffset:{width: 0 , height: 4} , textShadowRadius: 4 }}>
                    Choose User
                </Text>
             </View>
             <View style={{flex:3}}>
             <View style = {{flex:1}}>
              <OptionRectangle name = "Student" thisSource = {0} navigation = {navigation}/>
              <OptionRectangle name = "Teacher" thisSource = {1} navigation = {navigation}/>
              <OptionRectangle name = "Parent" thisSource = {2} navigation = {navigation}/>
              </View>
             </View>
             <View style={{flex:5, justifyContent:'flex-end', alignItems:'flex-start' , marginBottom:"8%", marginLeft:"6%"}}>

              <TouchableNativeFeedback onPress={() => {
                   navigation.goBack();
              }}>
              <Image
                  source={require('./Images/arrowLeft.png')}
                  style={{height:24, width:24}}
                >
                </Image>
              </TouchableNativeFeedback>
            </View>
        </ImageBackground>
      </View>
  );
};

export default ChooseUser;