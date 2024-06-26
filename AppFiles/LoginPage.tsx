/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import HeaderLoginPage from './HeaderLoginPage';

const styles = StyleSheet.create({
  transpRectangle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5E242D',
    width: '100%',
    height: 59,
    color: 'white',
    fontSize: 15,
    paddingLeft: 25,
    borderRadius: 30,
  },
  title: {
    color: '#434343',
    textAlign: 'left',
    fontFamily: 'Inter-Medium',
    fontSize: 18,
  },
});

function tryAuthentication(
  email: string,
  password: string,
  setWrongPassword: any,
) {
  if (email === '' || password === '') {
    setWrongPassword(true);
    return;
  }

  auth()
    .signInWithEmailAndPassword(email, password)
    .catch(_error => {
      setWrongPassword(true);
    });
}

const LoginPage = ({route, navigation}: {route: any; navigation: any}) => {
  const id: number = route.params.id;
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: '#F6F2DB'}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('./Images/BackgroundBlend.png')}>
        {!wrongPassword && (
          <View style={{flex: 2}}>
            <HeaderLoginPage thisSource={id} />
          </View>
        )}
        {wrongPassword && (
          <View style={{flex: 3}}>
            <View
              style={{
                flexShrink: 1,
                flex: 1,
                marginLeft: '5%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexShrink: 1,
                  width: '80%',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Image source={require('./Images/Wow.png')} />
                <View style={{flexShrink: 1}}>
                  <Text
                    adjustsFontSizeToFit
                    style={StyleSheet.compose(styles.title, {
                      flexShrink: 1,
                      color: '#5E242D',
                    })}>
                    Adresa de e-mail sau parola a fost introdusă greșit
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexShrink: 1,
                  width: '80%',
                  marginTop: '5%',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Image source={require('./Images/happy.png')} />
                <View style={{flexShrink: 1}}>
                  <Text
                    adjustsFontSizeToFit
                    style={StyleSheet.compose(styles.title, {
                      flexShrink: 1,
                      color: '#5E242D',
                    })}>
                    Introdu datele din nou pentru a-ți accesa contul
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        <View style={{flex: 3, alignContent: 'center'}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '65%'}}>
              <Text style={styles.title}>Email</Text>
              <TextInput
                inputMode="email"
                onChangeText={newText => setEmailText(newText)}
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  color: 'black',
                  height: 40,
                }}
              />
            </View>
            <View style={{width: '65%', marginTop: '3%'}}>
              <Text adjustsFontSizeToFit style={styles.title}>
                Password
              </Text>
              <TextInput
                onChangeText={newText => setPasswordText(newText)}
                secureTextEntry={true}
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  color: 'black',
                  height: 40,
                }}
              />
            </View>
            <View style={{width: '65%', marginTop: '5%'}}>
              <Text style={styles.title}>Forgot your password?</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 2,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                marginBottom: '8%',
                marginLeft: '6%',
              }}>
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.goBack();
                  //navigation.navigate("ChooseUser");
                }}>
                <Image
                  source={require('./Images/arrowLeft.png')}
                  style={{height: 24, width: 24}}
                />
              </TouchableNativeFeedback>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginBottom: '8%',
                marginRight: '6%',
              }}>
              <TouchableNativeFeedback
                onPress={() =>
                  tryAuthentication(emailText, passwordText, setWrongPassword)
                }>
                <Image
                  source={require('./Images/arrowRight.png')}
                  style={{height: 24, width: 24}}
                />
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginPage;
