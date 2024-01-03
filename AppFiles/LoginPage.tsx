import React, { useState } from 'react';
import {Image, StyleSheet, Text, ImageBackground, View, TextInput, TouchableNativeFeedback } from 'react-native';
import InfoRectangle from './InfoRectangle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps, } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
    transpRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5E242D',
        width: "100%",
        height: 59,
        color: "white",
        fontSize: 15,
        paddingLeft: 25,
        borderRadius: 30,
    },
    title: {
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Content',
        fontWeight: "700",
        fontSize: 25,
        fontStyle: "normal",
    },
});

function tryAuthentication(email: string, password: string, navigation: any, setWrongPassword: any) {
    if (email === '' || password === '') {
        setWrongPassword(true);
        return;
    }

    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            navigation.navigate('AccountOptions');
        })
        .catch(error => {
            setWrongPassword(true);
        });

}

const LoginPage = ({ route, navigation }: { route: any, navigation: any }) => {
    const name: string = route.params.name;
    const id: number = route.params.id;
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);
    return (
        <ImageBackground style={{ flex: 1 }} source={require('./Images/imageBackground.png')}>
            { !wrongPassword && <View style={{ flex: 2 }}>
                <InfoRectangle name={name} thisSource={id} />
            </View> }
            {
                wrongPassword && <View style={{ flex:3  }}>
                    <View style={{flexShrink:1 ,flex:1,marginLeft: "5%" , justifyContent: "center" }}>
                        <View style = {{flex: 1 , flexShrink:1 ,width:"80%", alignItems: "flex-end", justifyContent: "flex-start" , flexDirection: 'row'}}>
                            <Image  source = {require('./Images/Wow.png')}/>
                            <View style = {{flexShrink: 1 }}>
                                <Text adjustsFontSizeToFit style = {StyleSheet.compose( styles.title , 
                                    {flexShrink: 1 ,color: '#5E242D'} )}>Adresa de e-mail sau parola a fost introdusă greșit</Text>
                            </View>
                        </View>
                        <View style = {{flex: 1,flexShrink:1,width:"80%", marginTop: "5%", alignItems: "flex-start", justifyContent: "flex-start" , flexDirection: 'row'}}>
                            <Image  source = {require('./Images/happy.png')}/>
                            <View style = {{flexShrink: 1}}>
                                <Text adjustsFontSizeToFit style = {StyleSheet.compose( styles.title , 
                                    {flexShrink: 1 , color: '#5E242D'} )}>Introdu datele din nou pentru a-ți accesa contul</Text>
                            </View>
                        </View>
                    </View>
                    </View>
            }
            <View style={{flex: 3, alignContent: "center" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={{ width: "65%" }}>
                        <Text style={styles.title}>
                            Adresa de e-mail
                        </Text>
                        <TextInput inputMode="email" onChangeText={newText => setEmailText(newText)}
                            style={styles.transpRectangle} />
                    </View>
                    <View style={{ width: "65%", marginTop: "3%" }}>
                        <Text adjustsFontSizeToFit style={styles.title}>
                            Parola
                        </Text>
                        <TextInput onChangeText={newText => setPasswordText(newText)}
                            secureTextEntry={true} style={styles.transpRectangle} />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <TouchableNativeFeedback onPress={() => tryAuthentication(emailText, passwordText, navigation, setWrongPassword)}>
                        <Image source={require('./Images/Arrow_right.png')} style={{ marginBottom: "3%", marginRight: "3%" }}></Image>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </ImageBackground>
    );
};

export default LoginPage;