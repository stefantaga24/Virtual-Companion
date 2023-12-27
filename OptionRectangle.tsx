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
function OptionRectangle ({name,thisSource} : {name : string , thisSource: string})
{
    return (
        <View style = {{width: "100%" , alignItems : "center",justifyContent : "center" , marginTop: "8%"}}>
            <View style = {styles.transpRectangle}>
                <Text style={styles.subTitle}>
                        {name}
                </Text>
                <Image source = {require(thisSource)}>

                </Image>
            </View>
          <View style = {styles.rectangle}>
            
          </View>
        </View>
      );
}
export default OptionRectangle;