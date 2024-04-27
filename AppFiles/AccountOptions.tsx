import React,{useState} from "react";
import { StyleSheet, TouchableNativeFeedback, } from "react-native";
import { ImageBackground, View, Text } from "react-native";
import ActionsRectangle from "./ActionsRectangle";
import EmptyRectangle from "./EmptyRectangle";
import { firebase } from '@react-native-firebase/database';

const databaseRef = firebase.app().database("https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/");

function AccountOptions({ route, navigation}: { route: any, navigation: any}) {
    var accountType : string = route.params.accountType; 
    var email : string = route.params.email;
    const [id, setId] = useState(0);
    databaseRef.ref('Emails/' + email.replace("@","").replace(".","")).once('value').then(snapshot=>{
        setId(snapshot.val().id);
    });
    return ( 
        (id!=null && <View style={{flex: 1, backgroundColor: "#F6F2DB"}}>
        <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
        <View style = {{flex: 1 , flexDirection : "row" , justifyContent :"space-around"}}>
            <View style = {{flex: 1 , justifyContent : "space-around" , alignItems: "center"}}>
                <ActionsRectangle name = "Schedule"  navigation = {navigation} accountType = {accountType} id={id}/>
                <ActionsRectangle name = "Announcements" navigation = {navigation} accountType = {accountType} id={id}/>
                <ActionsRectangle name = "School Map"  navigation = {navigation} accountType = {accountType} id={id}/>
                <ActionsRectangle name = "Settings"  navigation = {navigation} accountType = {accountType} id={id}/>
            </View>
            <View style = {{flex: 1 , justifyContent : "space-around" , alignItems:"center"}}>
                <ActionsRectangle name = "Grades" navigation = {navigation} accountType = {accountType} id={id}/>
                <ActionsRectangle name = "Teacher Contacts" navigation = {navigation} accountType = {accountType} id={id}/>
                <EmptyRectangle name = "Grades" navigation = {navigation}/>
                <EmptyRectangle name = "Grades" navigation = {navigation}/>
            </View>
        </View>
    </ImageBackground>
    </View>)
    );
};
export default AccountOptions;