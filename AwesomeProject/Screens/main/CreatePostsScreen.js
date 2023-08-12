import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {db} from "../../firebase/config"
import {app} from "../../firebase/config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export default function CreatePostsScreen() {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState("");
    const [location, setLocation] = useState([]);
    const [comment, setComment] = useState("");
    const [locationName, setLocationName] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [isShowKeyboard,setIsShowKeyboard]= useState(false)
    const {userId, name} = useSelector((state) => state.auth)

    const navigation = useNavigation();

const keyboardHide =() => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

}

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
            console.log("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePhoto = async () => {
        console.log('comment', comment);
        console.log('location', location);
        if (camera) {
            const photo = await camera.takePictureAsync();
            setPhoto(photo.uri);
            console.log('photo', photo)

        }
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        setLocation(coords);
        // console.log('photo', photo)
        // console.log('location', location)
    };

    
    const sendPhoto = () => {
        uploadPhotoToServer()
        navigation.navigate("DefaultScreen", {photo, comment, locationName, location});
        setLocation([]);
        setPhoto('');
        setComment('');
        setLocationName('');
        setIsShowKeyboard(false);
    }

    const uploadPhotoToServer = async () => {
    
        const uniquePostId = Date.now().toString();
        const storageRef = ref(storage, `postImage/${uniquePostId}`);
        const metadata = {
            contentType: 'image/jpeg',
        };
    
        const data = await uploadBytes(storageRef, photo, metadata);

        const prossesPhoto = await 
        getDownloadURL(ref(storage, `postImage/${uniquePostId}`))
        console.log('prossesPhoto', prossesPhoto)
    };

    const deletePhoto = () => {
        setPhoto('');
        setLocation([]);
        setComment('');
        setLocationName('');
        setIsShowKeyboard(false);
    }


    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.logArrow} >
                <Ionicons name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={styles.title}>Створити публікацію</Text>
        </View>
        <View style={styles.cameraContainer}>
            <Camera style={{...styles.camera, height: isShowKeyboard ? 120 : 240}} ref={setCamera}>
                {photo && 
                    <View style={styles.photoContainer}>
                        <Image style={styles.photo} source={{ uri: photo }} />
                    </View>
                }
                <TouchableOpacity onPress={takePhoto}>
                    <Ionicons name="camera-outline" size={24} style={{...styles.logCamera, marginTop: isShowKeyboard ? 30 : 90}} />
                </TouchableOpacity>
            </Camera>
        </View>
        <Text style={{...styles.editPhoto, marginBottom: isShowKeyboard ? 12 : 32}}>Редагувати фото</Text>

        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <TextInput
                style={styles.input}
                placeholderTextColor={"#BDBDBD"}
                placeholder="Назва..."
                onFocus={() => setIsShowKeyboard(true)}
                value={comment}
                onChangeText={(value) => setComment(value)}
            />
            <TextInput
                style={styles.inputLocation}
                placeholderTextColor={"#BDBDBD"}
                placeholder="Місцевість..."
                onFocus={() => setIsShowKeyboard(true)}
                value={locationName}
                onChangeText={(value) => setLocationName(value)}
            />
            <TouchableOpacity style={{...styles.locationIcon, marginBottom: isShowKeyboard ? 12 : 32}}>
            <Ionicons name="location-outline" size={24} style={styles.logLocation} onPress={() =>
                navigation.navigate("Map", {location})}/>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={sendPhoto}>
            {photo ?         
            <Text style={styles.buttonActive}>
                Опублікувати
            </Text> :
            <Text style={styles.button}>
            Опублікувати
        </Text>
        }
        </TouchableOpacity>
        <TouchableOpacity onPress={deletePhoto}>
        {photo ?  
            <Ionicons name="trash-outline" size={24} style={styles.logTrashActive} /> :
            <Ionicons name="trash-outline" size={24} style={styles.logTrash} />}
        </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        fontFamily: "Roboto-Regular",
        padding: 16,
        paddingTop: 40,
        width: 390,
        height: 760,
        backgroundColor: "white",
    },
    header: {    
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginTop: 30,
        borderBottomWidth: 1,
        paddingBottom: 11,
        borderColor: '#BDBDBD'
    },
    logArrow: {
        color: 'rgba(33, 33, 33, 0.8)',
        position: 'absolute',

        left: 20,
    },

    camera: {
        height: 240,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 30,
        backgroundColor: "#212121",
    },

    logCamera: {
        height: 50,
        width: 50,
        marginTop: 90,
        backgroundColor: "#rgba(255, 255, 255, 0.3)",
        alignSelf: "center",
        color: "#FFFFFF",
        borderRadius: 100,
        padding: 12,
        textAlign: "center",
    },

    photoContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        borderColor: "#BDBDBD",
        borderRadius: 10,
    },

    photo: {
        width: 135,
        height: 85,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,
    },

    header: {
        display: "flex",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 11,
        borderColor: "#BDBDBD",
    },

    title: {
        fontSize: 17,
        fontWeight: 500,
    },

    body: {
        marginTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },

    editPhoto: {
        marginTop: 8,
        marginBottom: 32,
        color: "#BDBDBD",
        fontSize: 16,
    },

    input: {
        height: 50,
        width: "100%",
        marginBottom: 16,
        borderBottomWidth: 1,
        paddingBottom: 11,
        borderColor: "#BDBDBD",
        color: "#212121",
        fontSize: 16,
    },

    inputLocation: {
        height: 50,
        width: "100%",
        marginBottom: 16,
        borderBottomWidth: 1,
        paddingBottom: 11,
        borderColor: "#BDBDBD",
        color: "#212121",
        fontSize: 16,
        paddingLeft: 28,
    },
    locationIcon: {
        position: "relative",
        marginBottom: 32,
    },


    logLocation: {
        position: "absolute",
        bottom: 35,
        left: 0,
        color: "#BDBDBD",
    },

    button: {
        height: 50,
        width: "100%",

        backgroundColor: "#F6F6F6",
        color: "#BDBDBD",
        borderRadius: 100,
        padding: 12,
        textAlign: "center",
        fontSize: 16,
    },
    buttonActive: {
        height: 50,
        width: "100%",

        backgroundColor: "#FF6C00",
        color: "#FFFFFF",
        borderRadius: 100,
        padding: 12,
        textAlign: "center",
        fontSize: 16,
    },


    logTrash: {
        height: 50,
        width: 80,
        backgroundColor: "#F6F6F6",
        alignSelf: "center",
        color: "#BDBDBD",
        borderRadius: 100,
        padding: 12,
        textAlign: "center",
        marginTop: 30,
    },

    logTrashActive: {
        height: 50,
        width: 80,
        backgroundColor: "#FF6C00",
        alignSelf: "center",
        color: "#FFFFFF",
        borderRadius: 100,
        padding: 12,
        textAlign: "center",
        marginTop: 30,
    },
});