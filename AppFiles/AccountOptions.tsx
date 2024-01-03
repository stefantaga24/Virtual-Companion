import React from "react";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { Image, View, Text } from "react-native";
import auth from '@react-native-firebase/auth';
import ActionsRectangle from "./ActionsRectangle";
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
const targetPageName = ["Elev", "Profesor", "Parinte"];
function AccountOptions({ route, navigation}: { route: any, navigation: any}) {
    return ( 
            <View>
                <View>
                    <ActionsRectangle name = "Notele mele" thisSource = {0} navigation = {navigation}/>
                </View>
                <View>

                </View>
            </View>
    );
};
export default AccountOptions;