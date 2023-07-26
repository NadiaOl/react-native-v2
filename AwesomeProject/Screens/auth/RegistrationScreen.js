
import { ImageBackground, StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Avatar from '../../assets/img/Userphoto.png'
import Add from '../../assets/img/add.jpg'
import { useState } from 'react';

const initialState = {
name: "",
email: "",
password: "",
}
export default function RegistrationScreen() {
const [isShowKeyboard,setIsShowKeyboard]= useState(false)
const [state, setState]=useState(initialState)

const keyboardHide =() => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    console.log(state)
}

return (
<TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
        <ImageBackground style={styles.bgImage} source={require("../../assets/img/PhotoBGpng.png")}>
            <View style={{...styles.registrationSection, paddingBottom: isShowKeyboard ? 5 : 70, paddingTop: isShowKeyboard ? 60 : 92}}>
        
                <Image source={Avatar} style={styles.avatar}/>
                <Image source={Add} style={styles.addAvatar}/>
                <Text style={styles.title}>Реєстрація</Text>

                <View style={styles.form}>
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <TextInput
                        style={styles.input}
                        placeholderTextColor={'#BDBDBD'}
                        placeholder="Логін"
                        value={state.name}
                        autoCompleteType="on"
                        onFocus={() => setIsShowKeyboard(true)}
                        onChangeText={(value) => setState((prevState) => ({...prevState, name: value}))}
                        />
            
                        <TextInput
                        style={styles.input}
                        placeholderTextColor={'#BDBDBD'}
                        placeholder="Адреса електронної пошти"
                        keyboardType="email-address"
                        value={state.email}
                        autoCompleteType="on"
                        onFocus={() => setIsShowKeyboard(true)}
                        onChangeText={(value) => setState((prevState) => ({...prevState, email: value}))}
                        />

                        <View style={styles.inputView}>
                            <TextInput
                            style={styles.input}
                            placeholderTextColor={'#BDBDBD'}
                            placeholder="Пароль"
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            value={state.password}                  
                            autoCompleteType="off"
                            onFocus={() => setIsShowKeyboard(true)}
                            onChangeText={(value) => setState((prevState) => ({...prevState, password: value}))}
                            />
            
                            <Text style={styles.showPassword}>Показати</Text>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <TouchableOpacity style={styles.button} onPress={keyboardHide}>
                    <Text style={styles.buttonText}>Зареєстуватися</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signIn} onPress={keyboardHide}>
                    <Text>Вже є акаунт? Увійти</Text>
                </TouchableOpacity>

            </View>

        </ImageBackground>

    </View>
</TouchableWithoutFeedback>
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
    justifyContent: "flex-end",
    paddingBottom: 40,
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
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    color: "#212121",
    marginBottom: 33,
    fontSize: 30,
    textAlign: "center",
},

form: {
marginHorizontal: 16,
},

input: {
    fontFamily: "Roboto-Medium",
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

inputView:{
    position: 'relative',
},

showPassword: {
    fontFamily: "Roboto-Medium",
    position: 'absolute',
    top: 15,
    right: 40,
    fontSize: 16,
},

button: {
    height: 50,
    width: 343,
    marginTop: 27,
    backgroundColor:'#FF6C00',
    borderRadius: 100,
    padding: 14,
    textAlign: "center",
},

buttonText: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    color: "#FFFFFF"
},

signIn: {
    fontFamily: "Roboto-Medium",
    marginTop: 16,
    color: '#1B4371'
}
});
