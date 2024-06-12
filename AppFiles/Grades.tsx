import React, { useState, useRef, useEffect } from "react";
import { ActivityIndicator, Touchable } from "react-native";
import { ImageBackground, View, FlatList, Image, Text, TouchableNativeFeedback } from "react-native";
import { firebase } from '@react-native-firebase/database';
import Clipboard from '@react-native-clipboard/clipboard';
import { TouchEventType } from "react-native-gesture-handler/lib/typescript/TouchEventType";
import TypewriterText from "./TypeWriterText";

const blackColor = "#434343";
const beigeColor = "#F4F1E3";
const databaseRef = firebase.app().database("https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/");
 
function Grades({ route, navigation }: { route: any, navigation: any }) {

    const [loading, setLoading] = useState(true); 
    const [grades, setGrades] = useState();
    var id = route.params.id;
    var accountType = route.params.accountType;

    useEffect(() => {
        if (loading == false) {
            return;
        }
        databaseRef.ref('Students/' + id +'/Grades').once('value').then(snapshot => {
            setGrades(snapshot.val());
            console.log(snapshot.val());
        });
        if (grades) {
            setLoading(false);
        }
    })
    if (loading) {
        return (<View style={{ flex: 1, backgroundColor: "#F6F2DB" }}>
            <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
            </ImageBackground></View>);
    } 
     return (
        <View style={{ flex: 1, backgroundColor: "#F6F2DB" }}>
            <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
                 
            </ImageBackground>
        </View>
    );
};
export default Grades;