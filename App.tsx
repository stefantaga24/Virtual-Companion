import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import OptionRectangle from './OptionRectangle';
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
const MyApp = () => {
  return (
    <View style={{flex: 1}}>
      <View style = {{flex: 1}}>
      </View>
      <View id='containerIntro' style = {{flex:1 }}>
          <Text style = {styles.title}>
            Virtual Companion
          </Text>
          <Text style = {styles.subTitle}>
            Colegiul National "Ion Luca Caragiale"
          </Text>
          <View style ={{justifyContent:'center', alignItems:'center' , flexDirection : 'row'}}>
            <View style = {{flex:1}}>
            <OptionRectangle name = "Elev" thisSource = './Images/Mortarboard_light.png'/>
            <OptionRectangle name = "Profesor" thisSource = './Images/Glasses_light.png'/>
            <OptionRectangle name = "Parinte/Tutore" thisSource = './Images/Glasses_light.png'/>
            </View>
          </View>
      </View>
    </View>
  );
};

export default MyApp;