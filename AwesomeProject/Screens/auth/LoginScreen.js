
import { ImageBackground, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { useState } from 'react';

import { useDispatch } from 'react-redux';
import {authSignInUser} from "../../redux/auth/authOperations"

const initialState = {
email: "",
password: "",
}
export default function LoginScreen({navigation}) {
const [isShowKeyboard,setIsShowKeyboard]= useState(false)
const [state, setState]=useState(initialState)
const [showPassword, setShowPassword]=useState(true)
const dispatch = useDispatch()

const keyboardHide =()=> {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
}

const handleSubmit =() => {
    keyboardHide()
    dispatch(authSignInUser(state));
    setState(initialState);
}

return (
<TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
        <ImageBackground style={styles.bgImage} source={require("../../assets/img/PhotoBGpng.png")}>
            <View style={{...styles.registrationSection, paddingBottom: isShowKeyboard ? 5 : 70}}>

                <Text style={styles.title}>Увійти</Text>

                <View style={styles.form}>
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    
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
                            secureTextEntry={showPassword}
                            value={state.password}                  
                            autoCompleteType="off"
                            onFocus={() => setIsShowKeyboard(true)}
                            onChangeText={(value) => setState((prevState) => ({...prevState, password: value}))}
                            />
            
                            <Text style={styles.showPassword} onPress={()=>{setShowPassword(!showPassword)}} >Показати</Text>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=> {handleSubmit(); navigation.navigate("Posts")}}>
                    <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signIn} onPress={()=> {handleSubmit(); navigation.navigate("Register")}}>
                    <Text>Немає акаунту? 
                        <Text style={styles.signInSpan}>Зареєструватися</Text>
                    </Text>
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
    paddingTop: 50,
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
},

signInSpan: {
    marginLeft: 10,
    textDecorationLine: 'underline',
},

});
