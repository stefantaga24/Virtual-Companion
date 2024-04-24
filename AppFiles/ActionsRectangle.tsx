import React from "react";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { Image, View, Text } from "react-native";

const styles = StyleSheet.create({
    rectangle: {

        width: 137,
        height: 135,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    subTitle: {
        color: "#F4F2E4",
        fontFamily: "Inter-Bold", 
        fontSize: 18,
    }
});
function onPressButton({ navigation, targetPage}: { navigation: any, targetPage: string}) {
    navigation.navigate(targetPage);
}
const sizes : any = {
    "Schedule" :{width: 56, height:56 },
    "Grades" :{width : 68, height: 71},
    "Announcements" : {width: 85, height: 85},
    "Teacher Contacts":{width : 76, height: 76},
    "School Map" : {width: 74, height:74},
    "Settings": {width: 124, height: 124}
}
const possibleSources : any = {
    "Grades" : require('./Images/Grades.png'),
    "Schedule" : require('./Images/Schedule.png'),
    "Announcements": require('./Images/Announcements.png'),
    "Teacher Contacts": require('./Images/TeacherContacts.png'),
    "School Map":require('./Images/SchoolMap.png'),
    "Settings":require('./Images/Settings.png')
}; 
function ActionsRectangle({ name, navigation }: { name: string, navigation: any }) {
    return (
        <TouchableNativeFeedback onPress={() => onPressButton({
            navigation: navigation,
            targetPage: name,
        })}>
                <View style={styles.rectangle}>
                    <Image source={possibleSources[name]} style={{ height: sizes[name].height, width: sizes[name].width }}/>
                    <Text style={styles.subTitle}>{name}</Text>
                </View>
        </TouchableNativeFeedback>
    );
}
export default ActionsRectangle;