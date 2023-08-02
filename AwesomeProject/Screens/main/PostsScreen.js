import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import UserPhoto from '../../assets/img/Userphoto.png'
import Ionicons from "react-native-vector-icons/Ionicons";

const PostsScreen = ({route}) => {
  console.log('route.params', route.params)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.header}>             
        <Text style={styles.title}>Публікації</Text>
        <Ionicons name="log-out-outline" size={24} style={styles.logOut} />
      </View>
      <View style={styles.userSection}>
        <Image source={UserPhoto} style={styles.userPhoto}/>
          <View style={styles.userInfo}>            
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              // alignItems: "center",
            }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 380, height: 240 }}
            />
            <Text style={styles.descriptionText}>{item.comment}</Text>
            <View style={styles.details}>
              <TouchableOpacity style={styles.reactions} >
                <Ionicons name="chatbubble" size={25} style={styles.commentsIcon} />
                <Text>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.location}>
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

export default PostsScreen;
