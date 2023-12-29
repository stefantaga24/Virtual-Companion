import React, {useState} from 'react';
import {Image, StyleSheet, Text, ImageBackground, View} from 'react-native';
import OptionRectangle from './OptionRectangle';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type { NativeStackScreenProps, } from '@react-navigation/native-stack';

// Add the missing import statement for the optionRectangle component
 
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

const FirstPage = ({navigation} :{navigation : any}) => {
  return (
    <View style={{flex: 1}}>

      <ImageBackground style = {{marginTop:"10%",position:'absolute' , height:"80%" , width:"100%"}} source = {require('./Images/imageCaragiale.png')}>
      </ImageBackground>
      <View id='containerIntro' style = {{ marginTop:'100%', height:'50%' , backgroundColor : 'white' , borderTopRightRadius : 35 , borderTopLeftRadius: 35}}>
          <Text style = {StyleSheet.compose(styles.title,{marginTop: 25})}  >
            Virtual Companion
          </Text>
          <Text style = {styles.subTitle}>
            Colegiul National "Ion Luca Caragiale"
          </Text>
          <View style ={{justifyContent:'center', alignItems:'center' , flexDirection : 'row'}}>
            <View style = {{flex:1}}>
            <OptionRectangle name = "Elev" thisSource = {0} navigation = {navigation}/>
            <OptionRectangle name = "Profesor" thisSource = {1} navigation = {navigation}/>
            <OptionRectangle name = "Parinte/Tutore" thisSource = {2} navigation = {navigation}/>
            </View>
          </View>
      </View>
    </View>
  );
};

export default FirstPage;