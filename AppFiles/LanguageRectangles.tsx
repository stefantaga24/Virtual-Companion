import React from "react";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import { Image, View, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

function LanguageRectangle({displayValue}: {displayValue:any }) {
    return (
           <Animated.Text entering={FadeIn}>
             Hello
           </Animated.Text>     
    );
}
export default LanguageRectangle;