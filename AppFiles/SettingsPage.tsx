import React, { useState, useRef } from "react";
import { Modal, StyleSheet } from "react-native";
import { ImageBackground, View, Text, Image, TouchableNativeFeedback } from "react-native";
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import HeaderLoginPage from "./HeaderLoginPage";
import Clipboard from '@react-native-clipboard/clipboard';
import { TouchEventType } from "react-native-gesture-handler/lib/typescript/TouchEventType";
import { AnimatedStyle, FadeIn, FadeOut, useAnimatedStyle, useSharedValue, interpolate, withTiming } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { createAnimatedComponent } from "react-native-reanimated/lib/typescript/createAnimatedComponent";
import LanguageRectangle from "./LanguageRectangles";
const databaseRef = firebase.app().database("https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/");

const reverseTypeId: any = {
    'Student': 0,
    'Teacher': 1,
    'Parent': 2
}

/*

<Animated.View style={{display:displayProp, transform:[{scaleX: langWidth }, {scaleY: langHeight}], flexDirection:'row'}}>
                             <Animated.Text>
                                Hello
                             </Animated.Text>
                        </Animated.View>

*/


function Settings({ route, navigation }: { route: any, navigation: any }) {
    const [currentID, setCurrentID] = useState("");
    const [currentName, setCurrentName] = useState("");
    const [pressed, setPressed] = useState(false);
    const [displayProp, setDisplayProp] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(2);
    
    var id = route.params.id;

    const flipAnim = useSharedValue(0);
    const translateXAnim = useSharedValue(0);
    const isDisplayed = useSharedValue(0);

    const OFFSETX = 100;
    const handlePress = () => {
        const value = pressed ? 0 : 1;
        const valueX = pressed ? 0 : OFFSETX;
        translateXAnim.value = withTiming(valueX);
        flipAnim.value = withTiming(value);
        isDisplayed.value = withTiming(value);
        setPressed(!pressed);
        setDisplayProp(!displayProp);
    };

    const createLanguageTextStyle = (selectedPosition : any) =>{
        return {
            color: selectedPosition == selectedLanguage ? '#434343': '#F3F1E4',
            fontSize: 9,
            fontFamily: 'Inter-Medium',
        }
    };

    const createLanguageRectStyle = (selectedPosition : any) =>{
        return {
            backgroundColor: selectedPosition == selectedLanguage ? '#F3F1E4': '#434343',
            paddingLeft: 5,
            paddingRight : 5,
            paddingTop:2,
            paddingBottom:2,
            borderRadius: 9,
            marginLeft: '3%',
        }
    };

    const handleLanguageChange = (selectedPosition :any ) =>{
        if (selectedPosition != selectedLanguage)
        {
            console.log(selectedPosition);
            setSelectedLanguage(selectedPosition);
        }
    };
    const imageStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateXAnim.value }, { rotate: flipAnim.value * 180 + "deg" }],
    }));
    const languageRectangleStyle = useAnimatedStyle(() => ({
        display: isDisplayed.value >= 0.5 ? "flex" : "none"
    }));
    const languageRectangleStyle2 = useAnimatedStyle(() => ({
        display: isDisplayed.value >= 0.5 ? "flex" : "none"
    }));
    const languageRectangleStyle3 = useAnimatedStyle(() => ({
        display: isDisplayed.value >= 0.5 ? "flex" : "none"
    }));
    databaseRef.ref('Students/' + id).once('value').then(snapshot => {
        setCurrentName(" " + snapshot.val().Name);
        setCurrentID(" " + snapshot.key);
    });
    var accountType = route.params.accountType;
    return (
        <View style={{ flex: 1, backgroundColor: "#F6F2DB" }}>
            <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
                <View style={{ flex: 2 }}>
                    <HeaderLoginPage name={accountType} thisSource={reverseTypeId[accountType]}>

                    </HeaderLoginPage>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ flexDirection: 'row', width: "80%" }}>
                        <View style={{ flex: 2, alignItems: 'flex-start' }}>
                            <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 12 }}>
                                Name:
                                <Text style={{ color: 'black', fontFamily: 'Inter' }}>
                                    {currentName}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ flex: 2, alignItems: 'flex-end', flexDirection: "row" }}>
                            <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', marginLeft: "30%", fontSize: 12 }}>
                                ID:
                                <Text style={{ color: 'black', fontFamily: 'Inter' }}>
                                    {currentID}
                                </Text>
                                {"  "}
                            </Text>
                            <TouchableNativeFeedback onPress={() => { console.log("Did it"); Clipboard.setString(id.toString()); }} useForeground={true}>
                                <Image
                                    source={require('./Images/Copy.png')}
                                    style={{ height: 17, width: 17 }}>
                                </Image>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <View style={{ width: "80%", flexDirection: 'row', alignItems: 'flex-end' }}>
                        <TouchableNativeFeedback onPress={() => handlePress()}>
                            <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 12 }}>
                                Change Language
                            </Text>
                        </TouchableNativeFeedback>
                        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} 
                        style={[languageRectangleStyle, createLanguageRectStyle(0)]}>
                            <TouchableNativeFeedback onPress={()=>handleLanguageChange(0)}>
                                <Text style={createLanguageTextStyle(0)}>
                                    DE
                                </Text>
                            </TouchableNativeFeedback>
                        </Animated.View>
                        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} 
                        style={[languageRectangleStyle2, createLanguageRectStyle(1)]}>
                            <TouchableNativeFeedback onPress={()=>handleLanguageChange(1)}>
                                <Text style={createLanguageTextStyle(1)}>
                                    RO
                                </Text>
                            </TouchableNativeFeedback>
                        </Animated.View>
                        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} 
                        style={[languageRectangleStyle3, createLanguageRectStyle(2)]}>
                            <TouchableNativeFeedback onPress={()=>handleLanguageChange(2)}>
                                <Text style={createLanguageTextStyle(2)}>
                                    EN
                                </Text>
                            </TouchableNativeFeedback>
                        </Animated.View>
                        <TouchableNativeFeedback onPress={() => handlePress()} useForeground={true}>
                            <Animated.Image
                                source={require('./Images/arrowRight.png')}
                                style={[imageStyle, { width: 13, height: 13, marginBottom: "1.5%", marginLeft: 105, position: 'absolute' }]}
                            >
                            </Animated.Image>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{ width: "80%", flexDirection: 'row', alignItems: 'flex-end',marginTop:"2%"}}>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 12 }}>
                            Download Transcript of Records 
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};
export default Settings;