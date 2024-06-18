import React, { useState, } from "react";
import { View , Text, TouchableNativeFeedback,Modal, ImageBackground} from "react-native";
import { BlurView } from '@candlefinance/blur-view';

const blackColor = "#434343";
const beigeColor = "#F4F1E3";

function HourComponent(props:any) {
    const [modalVisible,setModalVisible] = useState(false);
    return (
        <View key={props.id}>
            <Modal 
                animationType = "fade"
                transparent = {true}
                visible = {modalVisible}
                onRequestClose={()=>{
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(0,0,0,0.5)"}}>
                    <View style={{width:"90%", height:"30%", backgroundColor:blackColor,borderRadius:10}}>
                        <View style={{marginLeft:"2%",marginTop:"2%"}}>
                            <Text style={{fontSize: 18, fontFamily:"Inter-Bold", color:beigeColor}}>
                                {props.timePeriodString}
                            </Text>
                            <Text style={{fontSize: 18, fontFamily:"Inter-Bold", color:beigeColor}}>
                                {props.subjectName}  
                            </Text>
                            <Text style={{fontSize: 18, fontFamily:"Inter-Bold", color:beigeColor}}>
                                {"Prof." + " " + props.teacher_name}
                            </Text>
                            <Text style={{fontSize: 18, fontFamily: "Inter-Medium", color: beigeColor}}>
                                {"Room: " + props.class_location}
                            </Text>
                        </View>
                        
                    </View>
                </View>
            </Modal>
            <TouchableNativeFeedback onPress= {() => {setModalVisible(true);}}>   
                <View>
                    <Text style={{ color: blackColor, fontSize: 18, fontFamily: "Inter-ExtraBold" }}>
                        {props.timePeriodString}
                    </Text>
                    <Text style={{ color: blackColor, fontSize: 18, fontFamily: "Inter-Medium" }}>
                        {props.subjectName}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
export default HourComponent;