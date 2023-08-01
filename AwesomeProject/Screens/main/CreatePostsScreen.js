import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export default function CreatePostsScreen() {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState("");
    const [location, setLocation] = useState([]);

    const [comment, setComment] = useState("");
    const [locationName, setLocationName] = useState("");

    const navigation = useNavigation();
    
    const [hasPermission, setHasPermission] = useState(null);

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
        if (camera) {
            const photo = await camera.takePictureAsync();
            setPhoto(photo.uri);
        }
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        setLocation(coords);
        console.log('photo', photo)
        console.log('location', location)
    };

    const sendPhoto = () => {
        navigation.navigate("Posts", {photo});
        // setLocation();
        // setPhoto();
    }

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Створити публікацію</Text>
        </View>
        <View style={styles.cameraContainer}>
            <Camera style={styles.camera} ref={setCamera}>
                {photo && 
                    <View style={styles.photoContainer}>
                        <Image style={styles.photo} source={{ uri: photo }} />
                    </View>
                }
                <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
                    <Ionicons name="camera-outline" size={24} style={styles.logCamera} />
                </TouchableOpacity>
            </Camera>
        </View>
        <Text style={styles.editPhoto}>Редагувати фото</Text>

        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <TextInput
                style={styles.input}
                placeholderTextColor={"#BDBDBD"}
                placeholder="Назва..."
                value={comment}
                onChangeText={(value) => setComment(value)}
            />
            <TextInput
                style={styles.inputLocation}
                placeholderTextColor={"#BDBDBD"}
                placeholder="Місцевість..."
                value={locationName}
                onChangeText={(value) => setLocationName(value)}
            />
            <TouchableOpacity style={styles.locationIcon}>
            <Ionicons name="location-outline" size={24} style={styles.logLocation} onPress={() =>
                navigation.navigate("Map", {location})}/>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        {photo &&         
        <Text style={styles.buttonActive} onPress={sendPhoto}>
            Опублікувати
        </Text>}

        {!photo && <Text style={styles.button} onPress={sendPhoto}>
            Опублікувати
        </Text> }
        <Ionicons name="trash-outline" size={24} style={styles.logTrash} />
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        fontFamily: "Roboto-Regular",
        padding: 16,
        marginTop: 44,
        width: 390,
        height: 760,
        backgroundColor: "white",
    },

    camera: {
        height: 240,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "grey",
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
        marginTop: 27,
        marginBottom: 100,
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
        marginTop: 27,
        marginBottom: 100,
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
    },


});