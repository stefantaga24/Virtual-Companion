import React, { useState, useRef, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { ImageBackground, View, FlatList, Image, Text, TouchableNativeFeedback} from "react-native";
import { firebase } from '@react-native-firebase/database';
import Clipboard from '@react-native-clipboard/clipboard';

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

const headerRectangleStyle = { height: 24, width: 80, backgroundColor: "#434343", borderRadius: 7, alignItems: 'center' }
const headerTextStyle = { fontFamily: "Inter-SemiBold", fontSize: 15, color: "#F4F1E3" }
function TeacherContacts({ route, navigation }: { route: any, navigation: any }) {
    const [currentID, setCurrentID] = useState("");
    const [currentName, setCurrentName] = useState("");
    const [currentClass, setCurrentClass] = useState("");
    const [currentProfessors, setCurrentProfessors] = useState();
    const [loading, setLoading] = useState(true);
    var id = route.params.id;
    var accountType = route.params.accountType;
    useEffect(() => {
        databaseRef.ref('Students/' + id).once('value').then(snapshot => {
            setCurrentName(" " + snapshot.val().Name);
            setCurrentID(" " + snapshot.key);
            setCurrentClass(" " + snapshot.val().ClassID);
            databaseRef.ref('Teachers').once('value').then(snapshot => {
                var professors: any = [];
                for (let key in snapshot.val()) {
                    var currentProfessor = snapshot.val()[key];
                    for (var i = 0; i < currentProfessor.Classes.length; i++) {
                        var currClass = currentProfessor.Classes[i];
                        if (currClass.replace(" ", "") == currentClass.replace(" ", "")) {
                            professors.push(currentProfessor);
                        }
                    }
                }
                if (professors) {
                    setCurrentProfessors(professors);
                    setLoading(false);
                }
            });
        });
    })
    if (loading) {
        return (<View style={{ flex: 1, backgroundColor: "#F6F2DB" }}>
            <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
            </ImageBackground></View>);
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#F6F2DB" }}>
            <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('./Images/TeacherContactsHeader.png')}
                        style={{ width: 106, height: 106 }}
                    >
                    </Image>
                </View>
                <View style={{ flex: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={headerRectangleStyle}>
                                <Text style={headerTextStyle}>
                                    Name
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={headerRectangleStyle}>
                                <Text style={headerTextStyle}>
                                    Subject
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={headerRectangleStyle}>
                                <Text style={headerTextStyle}>
                                    Contact
                                </Text>
                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={currentProfessors}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ color: '#434343', marginTop: 5, fontSize: 11, fontFamily: "Inter-Medium" }}>
                                        {"Prof. " + item.Name}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ color: '#434343', marginTop: 5, fontSize: 11, fontFamily: "Inter-Medium" }}>
                                        {item.Subject}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' , flexDirection:"row"}}>
                                    <Text style={{ color: '#434343', marginTop: 5, fontSize: 11, fontFamily: "Inter-Medium", width:"80%"}}>
                                        {item.Email}
                                    </Text>
                                    <TouchableNativeFeedback onPress={() => { Clipboard.setString(item.Email.toString()); }} useForeground={true}>
                                        <Image
                                            source={require('./Images/Copy.png')}
                                            style={{ height: 17, width: 17 }}>
                                        </Image>
                                    </TouchableNativeFeedback>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};
export default TeacherContacts;