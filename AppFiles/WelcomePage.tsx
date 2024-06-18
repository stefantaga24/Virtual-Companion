import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, ImageBackground, View, TouchableNativeFeedback} from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import TypewriterText from './TypeWriterText';

const styles = StyleSheet.create({
  rectangle : {

      width: 70,
      height: 73,
      backgroundColor: '#5E242D',
      borderRadius: 30,
  },
  fiftyFifty: {
    height : '50%',
    marginTop : '50%',
  },
  title:{
    color: 'black',
    textAlign:'center',
    fontFamily: 'Content',
    fontWeight: "700",
    fontSize: 25,
  },
  subTitle:{
    color: 'black',
    fontWeight: "700",
    textAlign:'center',
    fontFamily: 'Content',
    fontSize: 15,
  }
});
const databaseRef = firebase.app().database("https://appcaragiale-default-rtdb.europe-west1.firebasedatabase.app/");

const WelcomePage = ({navigation} :{navigation : any}) => {
  const [initializing, setInitializing] = useState(true);
  const [id,setId] = useState(0);
  const [user, setUser] = useState();
  const [cachedAccountType,setAccountType] = useState();
  function navigateWithAccountType(accountType:any, email:string)
  {
      if (accountType == "Student")
      {
          navigation.navigate("AccountOptions", {accountType: accountType, email: email});
      }
      else 
      if (accountType == "Teacher")
      {
          navigation.navigate("TeacherAccountOptions", {accountType: accountType, email: email});
      }
  }
  function onAuthStateChanged(user : any) {
    setUser(user);
    if (user!=null)
    {
      if (!cachedAccountType)
      {
          databaseRef.ref('Emails/' + user.email.replace("@","").replace(".","")).once('value').then(snapshot=>{
            let accountType = snapshot.val().accountType;
            setAccountType(accountType);
          });
      }
      navigateWithAccountType(cachedAccountType,user.email);
    }
    if (initializing) setInitializing(false);
  }
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
      <View style={{flex: 1, backgroundColor: "#F6F2DB"}}>
        <ImageBackground style={{ flex: 1 }} source={require('./Images/BackgroundBlend.png')}>
            <View style={{flex:2 , alignItems: 'flex-end', justifyContent:'center', marginRight:"5%" }}>
              <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'flex-end'}}>
                <Text style={{color : 'black', fontFamily:'Inter-Medium', fontSize: 18, lineHeight:50}}>
                  Powered by
                </Text>
                <Image
                source={require('./Images/LogoHighRes.png')}
                style={{height: 69, width:87}}>

                </Image>
              </View>
            </View>
            <View style={{flex:3, alignItems:'center', justifyContent:'center'}}>
              <View>
                
                <TypewriterText text={"Welcome to" + "\n" + "Virtual Companion!"} speed={100} 
                textStyle={{color:'black', fontFamily:'Inter-Bold', fontSize:33}}>
                </TypewriterText> 
                <Text style = {{color:'grey', fontFamily:'Inter-Medium', fontSize: 25, marginTop:"1%"}}>
                  Here to assist in your daily educational encounters
                </Text>
              </View>
            </View>
            <View style={{flex:5, justifyContent:'flex-end', alignItems:'flex-end' , marginBottom:"8%", marginRight:"6%"}}>
              <TouchableNativeFeedback onPress={() => {
            navigation.navigate("ChooseUser");
        }}>
              <Image
                  source={require('./Images/arrowRight.png')}
                  style={{height:24, width:24}}
                >
                </Image>
              </TouchableNativeFeedback>
            </View>
        </ImageBackground>
      </View>
  );
};

export default WelcomePage;