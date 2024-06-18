import React, { useState, useRef, useEffect } from "react";
import { ActivityIndicator, Touchable } from "react-native";
import { ImageBackground, View, FlatList, Image, Text, TouchableNativeFeedback } from "react-native";
import { firebase } from '@react-native-firebase/database'; 

const blackColor = "#434343";
const beigeColor = "#F4F1E3";
const backgroundImage = '../Images/BackgroundBlend.png';
const databaseRef = firebase.app().database("https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/");
 
function TeacherGrades({ route, navigation }: { route: any, navigation: any }) {

    const [loading, setLoading] = useState(false); 
    const [grades, setGrades] = useState();
    const [allSubjects,setSubjects] = useState();
    var id = route.params.id;
    var accountType = route.params.accountType;

    useEffect(() => {
        if (loading == false) {
            return;
        }
        /*databaseRef.ref('Students/' + id +'/Grades').once('value').then(snapshot => {
            var finalGrades : any  = {};
            var finalSubjects : any = [];
            for (let i=0;i<snapshot.val().length;i++)
            {
                const currSubject = snapshot.val()[i].Subject;
                if (!(currSubject in finalGrades))
                {
                    finalGrades[currSubject] = [];
                    finalSubjects.push(currSubject);
                } 
                finalGrades[currSubject].push(
                {
                    'Value' : snapshot.val()[i].Value,
                    'Type' : snapshot.val()[i].Type,
                    'Date' : snapshot.val()[i].Date
                });
            }
            setGrades(finalGrades);
            setSubjects(finalSubjects);
        });*/
        if (grades) {
            setLoading(false);
        }
    }) 

    if (loading) {
        return (<View style={{ flex: 1, backgroundColor: "#F6F2DB" }}>
            <ImageBackground style={{ flex: 1 }} source={require(backgroundImage)}>
            </ImageBackground></View>);
    } 
     return (
        <View style={{ flex: 1, backgroundColor: "#F6F2DB" }}>
            <ImageBackground style={{ flex: 1 }} source={require(backgroundImage)}>
                <View style={{flex:1, flexDirection : "row"}}>
                    <View style={{flex:1}}>
                        <View style={{height: 32, width:167, backgroundColor: blackColor, borderRadius: 7, 
                                      justifyContent:"center" , 
                                      marginLeft:"10%", marginTop:"20%"}}>
                            <Text style={{ marginLeft: "5%", color: beigeColor, fontFamily: "Inter-SemiBold", fontSize: 20}}>
                                Grades
                            </Text>
                        </View> 
                    </View>
                    <View style={{flex:1}}>

                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};
export default TeacherGrades;