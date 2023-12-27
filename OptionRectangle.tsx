import React from "react";
import { StyleSheet } from "react-native";
import { Image,View, Text } from "react-native";
 
const styles = StyleSheet.create({
    rectangle : {
  
        width: 70,
        height: 73,
        backgroundColor: '#5E242D',
        borderRadius: 30,
        left : 50,
        justifyContent :'center',
        alignItems : 'center',
        position: 'absolute',
    },
    transpRectangle :{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#D9D9D9',
        width: "70%",
        height: 59,
        borderRadius: 30,
    },
    subTitle:{
        color: "black",
        fontFamily: "Content",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 25,
    }
});

const possibleSources = [require('./Images/Mortarboard_light.png'),
                         require('./Images/Book_open_alt.png'),
                         require('./Images/Glasses_light.png')];

function OptionRectangle ({name,thisSource} : {name : string , thisSource: number})
{
    return (
        <View style = {{width: "100%" , alignItems : "center",justifyContent : "center" , marginTop: "8%"}}>
            <View style = {styles.transpRectangle}>
                <Text style={styles.subTitle}>
                        {name}
                </Text>
            </View>
          <View style = {styles.rectangle}>
            <Image source = {possibleSources[thisSource]} style = {{height: 58 , width: 58}}>

            </Image>
          </View>
        </View>
      );
}
export default OptionRectangle;