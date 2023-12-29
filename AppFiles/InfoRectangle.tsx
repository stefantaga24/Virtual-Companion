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
const possibleSources = [require('./Images/Mortarboard_light.png'),
require('./Images/Book_open_alt.png'),
require('./Images/Glasses_light.png')];
const targetPageName = ["Elev", "Profesor", "Parinte"];
function InfoRectangle({ name, thisSource}: { name: string, thisSource: number}) {
    return (
        <View style={{height:"100%",width:"100%" , alignItems:'center' , justifyContent:'center'}}>
            <View  style={{ width: "100%", alignItems: "center", justifyContent: "center"   }}>
                
                <View style={styles.transpRectangle}>
                    <Text style={styles.subTitle}>
                        {name}
                    </Text>
                </View>
                <View style={styles.rectangle}>
                    <Image source={possibleSources[thisSource]} style={{ height: 58, width: 58 }}>

                    </Image>
                </View>
            </View>
        </View>
    );
}
export default InfoRectangle;