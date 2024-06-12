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

function SubjectGradePage({ route, navigation }: { route: any, navigation: any }) {

    const [loading, setLoading] = useState(true);
    var subjectName = route.params.subjectName;
    var grades = route.params.grades;
    console.log(grades);
    const renderGrade = ({item} : any ) =>
        { 
              return (<View style={{flexDirection:"row", alignItems:"center", marginTop:"1%"}}>
                            <View style={{width:"30%"}}>
                                <Text style={{fontFamily:"Inter-Medium", fontSize: 10, color: blackColor}}>
                                    {item.Date}
                                </Text>
                            </View>
                            <View style={{width:"50%"}}>
                                <Text style={{fontFamily:"Inter-Medium", fontSize: 14, color: blackColor}}>
                                    {item.Type}
                                </Text>
                            </View>
                            <View style={{width:"20%"}}>
                                <View style={{width:57, height:18, 
                                              backgroundColor:blackColor,
                                              borderRadius:7}}>
                                    <Text style={{fontFamily:"Inter-SemiBold", fontSize: 15, color: beigeColor ,textAlign:"center", lineHeight:18 }}>
                                        {item.Value.toString()}
                                    </Text>
                                </View>
                                
                            </View>
                      </View>); 
        };


    return (
        <View style={{ flex: 1, backgroundColor: "#F6F2DB" }}>
            <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
                <View style={{ flex: 1}}>
                    <View style={{
                        height: 32, width: 167, backgroundColor: blackColor, borderRadius: 7,
                        justifyContent: "center",
                        marginLeft: "10%", marginTop: "20%"
                    }}>
                        <Text style={{ marginLeft: "5%", color: beigeColor, fontFamily: "Inter-SemiBold", fontSize: 20 }}>
                            {subjectName}
                        </Text>
                    </View>
                    <View style={{flex:1, alignItems:"center",marginTop:"10%"}}> 
                        <View style={{width:"80%", alignItems:"center"}}> 
                            <View style={{flexDirection:"row"}}>
                                <View style={{width:"30%"}}>
                                    <Text style={{fontFamily:"Inter-SemiBold", fontSize: 14, color: blackColor}}>
                                        Date
                                    </Text>
                                </View>
                                <View style={{width:"50%"}}>
                                    <Text style={{fontFamily:"Inter-SemiBold", fontSize: 14, color: blackColor}}>
                                        Assignment Type
                                    </Text>
                                </View>
                                <View style={{width:"20%"}}>
                                    <Text style={{fontFamily:"Inter-SemiBold", fontSize: 14, color: blackColor}}>
                                        Grades
                                    </Text>
                                </View>
                            </View> 
                            <FlatList
                                data={grades}
                                renderItem = {renderGrade}
                            />
                        </View> 
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};
export default SubjectGradePage;