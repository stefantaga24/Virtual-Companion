import React from "react";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { Image, View, Text } from "react-native";

const styles = StyleSheet.create({
    rectangle: {

        width: "20%",
        height: 85,
        backgroundColor: '#5E242D',
        borderRadius: 30,
        left: "15%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    transpRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5E242D',
        width: "70%",
        height: 59,
        borderRadius: 30,
    },
    subTitle: {
        color: "white",
        fontFamily: "Content",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 25,
    }
});
const possibleSources = [require('./Images/ShadowedStudentLogo.png'),
require('./Images/ShadowedTeacherLogo.png'),
require('./Images/ShadowedParentLogo.png')];
function HeaderLoginPage({ name, thisSource}: { name: string, thisSource: number}) {
    return (
        <View style={{height:"100%",width:"100%" , alignItems:'center' , justifyContent:'center'}}>
            <View  style={{ width: "100%", alignItems: "center", justifyContent: "center"}}>
                    <Image source={possibleSources[thisSource]} style={{ height: 114, width: 114, 
                        shadowColor:"rgba(0,0,0,0.25)", shadowOffset:{width: 0 , height: 4} , shadowRadius: 4}}>
                    </Image>
            </View>
        </View>
    );
}
export default HeaderLoginPage;