import React from "react";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { ImageBackground, View, Text } from "react-native";
import auth from '@react-native-firebase/auth';
import ActionsRectangle from "./ActionsRectangle";
import EmptyRectangle from "./EmptyRectangle";
const styles = StyleSheet.create({
    rectangle: {

        width: 70,
        height: 73,
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
function onPressButton({ navigation, targetPage ,name , id }: { navigation: any, targetPage: string ,name : string ,id :number }) {
    navigation.navigate(targetPage, {name : name ,id:id });
}

const possibleSources = [require('./Images/Mortarboard_light.png'),
require('./Images/Book_open_alt.png'),
require('./Images/Glasses_light.png')];
const targetPageName = ["Student", "Teacher", "Parent"];
function AccountOptions({ route, navigation}: { route: any, navigation: any}) {
    return ( 
        <View style={{flex: 1, backgroundColor: "#F6F2DB"}}>
            <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
            <View style = {{flex: 1 , flexDirection : "row" , justifyContent :"space-around"}}>
                <View style = {{flex: 1 , justifyContent : "space-around" , alignItems: "center"}}>
                    <ActionsRectangle name = "Schedule"  navigation = {navigation}/>
                    <ActionsRectangle name = "Announcements" navigation = {navigation}/>
                    <ActionsRectangle name = "School Map"  navigation = {navigation}/>
                    <ActionsRectangle name = "Settings"  navigation = {navigation}/>
                </View>
                <View style = {{flex: 1 , justifyContent : "space-around" , alignItems:"center"}}>
                    <ActionsRectangle name = "Grades" navigation = {navigation}/>
                    <ActionsRectangle name = "Teacher Contacts" navigation = {navigation}/>
                    <EmptyRectangle name = "Grades" navigation = {navigation}/>
                    <EmptyRectangle name = "Grades" navigation = {navigation}/>
                </View>
            </View>
        </ImageBackground>
        </View>
    );
};
export default AccountOptions;