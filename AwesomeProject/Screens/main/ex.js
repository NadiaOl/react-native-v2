import React, { useEffect, useState } from "react";
import {FlatList, Image, StyleSheet, Text, View, } from "react-native";
import UserPhoto from '../../assets/img/Userphoto.png'
import Ionicons from "react-native-vector-icons/Ionicons";


export default function PostsScreen({route}) {
const [posts, setPosts]= useState([]);

    console.log('route', route.params)
    
useEffect(()=>{
    if(route.params) {
        setPosts((prevState) => [...prevState, route.params]);
    }
}, [route.params]);
    console.log('posts', posts)

    return (
    <View style={styles.container}>

            <View style={styles.header}>             
                    <Text style={styles.title}>Публікації</Text>
                    <Ionicons name="log-out-outline" size={24} style={styles.logOut} />
            </View>
            <View style={styles.body}>
                <View style={styles.userSection}>
                    <Image source={UserPhoto} style={styles.userPhoto}/>
                    <View style={styles.userInfo}>            
                        <Text style={styles.userName}>Natali Romanova</Text>
                        <Text style={styles.userEmail}>email@example.com</Text>
                    </View>
                </View>
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => {return index.toString()}}
                    renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item.photo }} style={styles.post} />
                    </View> )}
                />
                <Text style={styles.descriptionText}>Ліс</Text>
                <View style={styles.details}>
                    <View style={styles.reactions} >
                        <Ionicons name="chatbubble" size={25} style={styles.commentsIcon} />
                        <Text>8</Text>
                    </View>
                    <View style={styles.location}>
                        <Ionicons name="location-outline" size={24} style={styles.logLocation} />
                        <Text style={styles.locationText}                             
                            >
                        Ukraine</Text>
                    </View>
                </View>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    
    container: {
        position: 'relative',
        fontFamily: 'Roboto-Regular',
        padding: 6,
        marginTop: 44,
        width: 390,
        backgroundColor: 'white',
        flex: 0,
    },

    header: {
        display: 'flex',
        alignItems: 'center',  
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
    
    body: {
        marginTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "flex-start",
        height: 615,
        gap: 8,
    },

    userSection: {
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

    forest: {
        width: "100%",
        marginTop: 32,
    },

    descriptionText: {
        alignSelf: 'flex-start',
        marginTop: 8,
    },

    details: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: "space-between",
    },

    reactions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },

    location: {
        display: 'flex',
        flexDirection: 'row',
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

});