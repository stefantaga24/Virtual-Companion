import React, { useState, } from "react";
import { View , Text, TouchableNativeFeedback,Modal, ImageBackground} from "react-native";

const blackColor = "#434343";

function HourComponent(props:any) {
    const [modalVisible,setModalVisible] = useState(false);
    return (
        <View>
            <Modal 
                animationType = "fade"
                transparent = {true}
                visible = {modalVisible}
                onRequestClose={()=>{
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:'rgba(0,0,0,0.8)'  }}>
                    
                        
                    <Text style={{fontSize: 18, fontFamily: "Inter-Medium", color: blackColor}}>
                        {props.class_location + " " + props.teacher_name}
                    </Text>
                </View>
            </Modal>
            <TouchableNativeFeedback onPress= {() => {setModalVisible(true);}}>   
                <View key={props.id}>
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