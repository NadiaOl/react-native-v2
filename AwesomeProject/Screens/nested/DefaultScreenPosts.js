import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import UserPhoto from '../../assets/img/Userphoto.png'
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from "../../firebase/config"

const DefaultScreenPosts = ({navigation, route}) => {
    const dispatch=useDispatch()
    const {name, email} = useSelector((state) => state.auth)
    const [posts, setPosts] = useState([])



    const getAllPosts = async () => {
        const allPosts = await onSnapshot(
            collection(db, "posts"), 
            (data) => {
                setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            },
            (error) => {
             console.log(error)
            });
    }


    useEffect(() => {
        getAllPosts()
    }, [posts]);


const signOut =()=> {
    dispatch(authSignOutUser());
}

return (
    <View style={styles.container}>
        <View style={styles.header}>             
            <Text style={styles.title}>Публікації</Text>
            <TouchableOpacity style={styles.logOut}>
                <Ionicons name="log-out-outline" size={24}  onPress={signOut} />
            </TouchableOpacity>
        </View>
        <View style={styles.userSection}>
            <Image source={UserPhoto} style={styles.userPhoto}/>
            <View style={styles.userInfo}>            
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userEmail}>{email}</Text>
            </View>
        </View>
        <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={{marginBottom: 10, justifyContent: "center",}}>
                <Image
                    source={{ uri: item.photo }}
                    style={{ width: 380, height: 240, backgroundColor: "#BDBDBD", borderRadius: 8 }}/>
                <Text style={styles.descriptionText}>{item.comment}</Text>
                <View style={styles.details}>
                    <TouchableOpacity style={styles.reactions} onPress={()=> navigation.navigate('Comments', {postId: item.id})}>
                        <FontAwesome name="comment" size={24} color="#FF6C00" />
                        <Text>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.location} onPress={()=> navigation.navigate('Map')}>
                        <Ionicons name="location-outline" size={24} style={styles.logLocation} />
                        <Text style={styles.locationText}>{item.locationName}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}/>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

title: {
    fontSize: 17,
    fontWeight: 500,
},

logOut: {
    position: 'absolute',
    top: 2,
    right: 10,
    color: '#BDBDBD'
},
userSection: {
    marginTop: 32,
    marginBottom: 32,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    gap: 8,
},

userPhoto: {
    borderRadius: 16,
},

userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
},

userName: {
    fontSize: 13,
    fontWeight: 700,
},

userEmail: {
    fontSize: 11,
    fontWeight: 400,
},

descriptionText: {
    alignSelf: 'flex-start',
    marginTop: 8,
},

details: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    width: 350,
    justifyContent: "space-between",
    marginBottom: 32,
},

reactions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
},

location: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
},

commentsIcon: {
    color: '#FF6C00'
},

likeIcon: {
    color: '#FF6C00'
},

locationText: {
    textDecorationLine: 'underline',
},
logLocation: {
    color: '#BDBDBD'
},

});

export default DefaultScreenPosts;
