import React, { useState, useRef, useEffect } from "react";
import { ActivityIndicator} from "react-native";
import { ImageBackground, View, FlatList, Image, Text } from "react-native";
import { firebase } from '@react-native-firebase/database';

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


function TeacherContacts({ route, navigation }: { route: any, navigation: any }) {
    const [currentID, setCurrentID] = useState("");
    const [currentName, setCurrentName] = useState("");
    const [currentClass, setCurrentClass] = useState("");
    const [currentProfessors, setCurrentProfessors] = useState();
    const [loading, setLoading] = useState(true);
    var id = route.params.id;
    var accountType = route.params.accountType;
    useEffect(()=>{
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
                if (professors)
                {
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
                        <FlatList
                            data={currentProfessors}
                            renderItem={({item}) => (
                                <View>
                                    <Text style={{color:'black'}}>
                                        {item.Name}
                                    </Text>
                                    <Text style={{color:'black'}}>
                                        {item.Subject}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                </ImageBackground>
            </View>
        );
};
export default TeacherContacts;