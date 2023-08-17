import {
  StyleSheet, View, FlatList, Image, Text, TouchableOpacity, ImageBackground } from "react-native";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {db} from "../../firebase/config";
import {collection, onSnapshot, where, query } from "firebase/firestore";


const ProfileScreen = ({ navigation, route }) => {
  const dispatch=useDispatch()
  const [userPosts, setUserPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const { userId, name } = useSelector((state) => state.auth);

  useEffect(() => {
    if (route.params?.commentsCount) {
      setCommentsCount((prev) => ({
        ...prev,
        [route.params.postId]: route.params.commentsCount,
      }));
    }
  }, [route.params]);

  useEffect(() => {
    getUserPosts();
    return () => getUserPosts();
  }, []);

  const getCommentsCount = async (postId) => {
    try {
      const commentsRef = collection(db, `posts/${postId}/comments`);
      const queryRef = query(commentsRef);
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const commentsCount = querySnapshot.docs.length;
        setCommentsCount((prev) => ({ ...prev, [postId]: commentsCount }));
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setCommentsCount((prev) => ({ ...prev, [postId]: 0 }));
    }
  };

  const getUserPosts = async () => {
    try {
      const userPostsRef = collection(db, "posts");
      const queryRef = query(userPostsRef, where("userId", "==", userId));
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const userPosts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserPosts(userPosts);

        if (userPosts && userPosts.length > 0) {
          userPosts.forEach((post) => {
            getCommentsCount(post.id.toString());
            
          });
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  };

  const signOut =()=> {
    dispatch(authSignOutUser());
}

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/PhotoBGpng.png")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.userInfo}>
            <View style={styles.imgBox}>
              <Image
                style={styles.avatar}
                source={require("../../assets/img/Userphoto.png")}
              />
            </View>
            <TouchableOpacity style={styles.logOut}>
                <Ionicons name="log-out-outline" size={24}  onPress={signOut} />
            </TouchableOpacity>
            <View style={styles.user}>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
          <View style={styles.postsList}>
            <FlatList
              data={userPosts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <Image source={{ uri: item.photo }} style={styles.post} />
                  <View>
                    <Text style={styles.title}>{item.comment}</Text>
                  </View>
                  <View style={styles.box}>
                    <View style={styles.commentWrapper}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId: item.id,
                          })
                        }
                      >
                        <FontAwesome name="comment" size={24} color="#FF6C00" />
                      </TouchableOpacity>
                      <Text style={styles.commentsCount}>
                        {commentsCount[item.id] || 0}
                      </Text>
                    </View>

                    <View style={styles.wrapperLocation}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.location,
                          })
                        }
                      >
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color="#BDBDBD"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MapScreen", {
                            location: item.location,
                          })
                        }
                      >
                        <Text style={styles.locationName}>
                          {item.locationName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  logOut: {
position: "absolute",
top: -30,
right: 5,
color: '#BDBDBD',

  },
  wrapper: {
    marginTop: 250,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  userInfo: {
    position: 'relative',
    flexDirection: "row",
    marginTop: 32,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imgBox: {
    position: "absolute",
    left: "35%",
    top: "-100%",
    width: 120,
    height: 120,
    backgroundColor: "#E8E8E8",
    marginRight: 8,
    borderRadius: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  postsList: {
    marginBottom: 120,
  },
  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#E8E8E8"
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  title: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 9,
  },
  wrapperLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationName: {
    marginLeft: 4,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});