import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

import Avatar from './Screens/img/Userphoto.png'
import Add from './Screens/img/add.jpg'
import { useState } from 'react';

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard ]=useState(false)

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./Screens/fonts/Roboto-Medium.ttf'),
    'Roboto-Bolt': require('./Screens/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./Screens/fonts/Roboto-Regular.ttf')
  });
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={require("./Screens/img/PhotoBGpng.png")}>
        <View style={{ ...styles.registrationSection, paddingBottom: isShowKeyboard ? 40 : 200 }}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <Image source={Avatar} style={styles.avatar}/>
          <Image source={Add} style={styles.addAvatar}/>
          <Text style={styles.title}>Реєстрація</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#BDBDBD'}
              placeholder="Логін"
              autoFocus={true}
              textContentType="username"
              autoCompleteType="on"
              onFocus={() => setIsShowKeyboard(true)}
            />
            
            <TextInput
              style={styles.input}
              placeholderTextColor={'#BDBDBD'}
              placeholder="Адреса електронної пошти"
              keyboardType="email-address"
              textContentType="username"
              autoCompleteType="on"
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={'#BDBDBD'}
              placeholder="Пароль"
              keyboardType="number-pad"
              secureTextEntry={true}
              textContentType="username"
              autoCompleteType="off"
              onFocus={() => setIsShowKeyboard(true)}
            />
        </View>
          <Text style={styles.showPassword}>Показати</Text>
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Зареєстуватися</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signIn}>
          <Text>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>

        </View>

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    position: "relative",
    flex: 1, 
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  registrationSection: {
    position: 'absolute',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar:{
    position: 'absolute',
    backgroundColor: '#F6F6F6',
    width: 120,
    height: 120,
    left: '33%',
    top: -60,
    zIndex: 2,
    borderRadius: 16,
    borderColor: '#F6F6F6',
    borderWidth: 1,
  },
  addAvatar: {
    position: 'absolute',
    width: 25,
    height: 25,
    right: '33%',
    top: 20,
    zIndex: 3,
    borderRadius: 100,
  },


  title: {
    fontFamily: 'Roboto-Medium',
    fontWeight: 500,
    color: "#212121",
    marginTop: 92,
    marginBottom: 33,
    fontSize: 30,
    textAlign: "center",
},
form: {
  marginHorizontal: 16,
},
  input: {
      height: 50,
      width: 343,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 8,
      backgroundColor: "#F6F6F6",
      borderColor: "#E8E8E8",
      padding: 14,
      fontSize: 16,
  },
  showPassword: {
    position: 'absolute',
    top: 317,
    right: 40,
    fontSize: 16,
  },

  button: {
    height: 50,
    width: 343,
    // marginHorizontal: 16,
    marginTop: 27,
    backgroundColor:'#FF6C00',
    borderRadius: 100,
    padding: 12,
    textAlign: "center",
  },

  buttonText: {
    textAlign: "center",
    color: "#FFFFFF"
  },

  signIn: {
    marginTop: 16,
    color: '#1B4371'

  }
});
