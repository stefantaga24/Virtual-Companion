import React from "react";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { Image, View, Text } from "react-native";

const styles = StyleSheet.create({
    rectangle: {

        width: 137,
        height: 135,
        borderRadius: 16.8512,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        opacity: 0.6,
    }, 
});
function EmptyRectangle({ name, navigation }: { name: string, navigation: any }) {
    return (
                <View style={styles.rectangle}>
                </View>
    );
}
export default EmptyRectangle;