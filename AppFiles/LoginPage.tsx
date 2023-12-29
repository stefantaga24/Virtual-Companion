import React, {useState} from 'react';
import {Image, StyleSheet, Text, ImageBackground, View, TextInput, TouchableNativeFeedback} from 'react-native';
import InfoRectangle from './InfoRectangle';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type { NativeStackScreenProps, } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
    transpRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5E242D',
        width: "100%",
        height: 59,
        color:"white",
        fontSize:15,
        paddingLeft: 25,
        borderRadius: 30,
    },
    title:{
        color: 'black',
        textAlign:'left',
        fontFamily: 'Content',
        fontWeight: "700",
        fontSize: 25,
        fontStyle: "normal",
        lineHeight: 38,
      },
});
 
function tryAuthentication(email : string , password : string ,navigation : any)
{
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        navigation.navigate('FirstPage');
    })
    .catch(error => {
        //navigation.navigate('FirstPage');
    });

}

const LoginPage = ({route, navigation} :{route:any, navigation : any}) => { 
  const name : string = route.params.name;
  const id :number = route.params.id;
  const [emailText,setEmailText] = useState('');
  const [passwordText,setPasswordText] = useState('');
  return (
    <ImageBackground style = {{flex: 1}} source= {require('./Images/imageBackground.png')}>
        <View style = {{flex:2}}>
            <InfoRectangle name = {name} thisSource = {id}/>
        </View>
        <View style={{flex:3 , alignContent:"center"}}>
            <View  style = {{width:"100%" , alignItems:"center"}}>
                <View style = {{width:"65%"}}>
                    <Text style = {styles.title}>
                        Adresa de e-mail
                    </Text>
                    <TextInput inputMode = "email" onChangeText = {newText => setEmailText(newText)} 
                        style ={styles.transpRectangle}/>
                </View>
                <View style = {{width:"65%" , marginTop:"3%"}}>
                    <Text style = {styles.title}>
                        Parola
                    </Text>
                    <TextInput onChangeText = {newText => setPasswordText(newText)} 
                        secureTextEntry = {true} style ={styles.transpRectangle}/>
                </View>
            </View>
            <View style = {{flex:1 , alignItems:"flex-end" , justifyContent: "flex-end"}}>
            <TouchableNativeFeedback onPress={() => tryAuthentication(emailText,passwordText,navigation)}>
                <Image source= {require('./Images/Arrow_right.png')} style = {{marginBottom:"3%",  marginRight : "15%"}}></Image>
            </TouchableNativeFeedback>
            </View>
        </View>
    </ImageBackground>
  );
};

export default LoginPage;