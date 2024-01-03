import React from "react";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { Image, View, Text } from "react-native";

const styles = StyleSheet.create({
    rectangle: {

        width: "41%",
        height: "20%",
        backgroundColor: '#5E242D',
        borderRadius: 30,
        left: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    transpRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        width: "70%",
        height: 59,
        borderRadius: 30,
    },
    subTitle: {
        color: "black",
        fontFamily: "Content",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 25,
    }
});
function onPressButton({ navigation, targetPage}: { navigation: any, targetPage: string}) {
    navigation.navigate(targetPage);
}

const possibleSources = [require('./Images/Mortarboard_light.png'),
require('./Images/Book_open_alt.png'),
require('./Images/Glasses_light.png')];
const targetPageName = ["Notele mele", "Orarul meu", "Asociatii" , 
            "Evenimente", "Anunturi" , "Consiliul Elevilor", "Google Classroom" ,"Planul Scolii"];
function ActionsRectangle({ name, thisSource, navigation }: { name: string, thisSource: number, navigation: any }) {
    return (
        <TouchableNativeFeedback onPress={() => onPressButton({
            navigation: navigation,
            targetPage: targetPageName[thisSource],
        })}>
            <View style={styles.rectangle}>
                <View >
                    <Image source={possibleSources[thisSource]} style={{ height: 58, width: 58 }}/>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}
export default ActionsRectangle;