import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Keyboard, Platform, TouchableWithoutFeedback, KeyboardAvoidingView,  SafeAreaView,
    FlatList } from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {db} from "../../firebase/config";
import { doc, collection, addDoc, onSnapshot } from "firebase/firestore";


const CommentsScreen = ({navigation, route}) => {
    const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [postDate, setPostDate] = useState("");
  const [isShowKeyboard,setIsShowKeyboard]= useState(false)
  const [allComments, setAllComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const { name } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);
  
  useEffect(() => {
    navigation.setParams({ commentsCount: commentsCount });
  }, [commentsCount]);

  const createPost = async () => {
    const docRef = await doc(db, "posts", postId);

    await addDoc(collection(docRef, "comments"), {
      comment,
      name,
      postDate: new Date().toDateString(),
    });
    setComment("");
    keyboardHide();
  };

  const getAllPosts = async () => {
    try {
      const docRef = await doc(db, "posts", postId);

      onSnapshot(collection(docRef, "comments"), (data) =>
        setAllComments(
          data.docs.map((doc) => ({
            ...doc.data(),
          }))
       )
      );
      console.log('data', docRef)
      setCommentsCount(Number(allComments.length));
    } catch (error) {
      console.log(error);
    }
  };


  const keyboardHide =()=> {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
}

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.logArrow} >
                    <Ionicons name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.title}>Коментарі</Text>
            </View>
            <View style={styles.content}>
                <Image source={{ uri: photo }} style={styles.photo} />
                <FlatList style={{...styles.comments, height: isShowKeyboard ? 0 : 270}}
                        data={allComments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentName}>{item.name}</Text>
                            <View style={styles.commentText}>
                                <Text>{item.comment}</Text>
                                <View style={styles.commentData}>    
                                    <Text style={styles.data}>{item.postDate}</Text>
                                </View>
                            </View>
                        </View>
                        )}
                    />
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} 
                        placeholderTextColor={"#BDBDBD"}
                        placeholder="Коментувати..."
                        onFocus={() => setIsShowKeyboard(true)}
                        value={comment}
                        onChangeText={(value) => setComment(value)}/>
    
                        <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
                            <Ionicons name="arrow-up-outline" style={styles.logArrowUp} size={24} onPress={createPost} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    </TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        fontFamily: "Roboto-Regular",
        padding: 16,
        width: 390,
        // height: 400,
        backgroundColor: "white",
        flex: 1,
        // paddingBottom: 60,

    },
    header: {    
        position: "relative",
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
    title: {
        fontSize: 17,
        textAlign: "center",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    photo: {
        height: 240,
        backgroundColor: "#E8E8E8",
        borderRadius: 8,
        marginTop: 32,
        marginBottom: 32,
    },

    commentContainer: {
        marginBottom: 32,
        display: "flex",
        gap: 16,
        flexDirection: "row",
        alignItems: "stretch",

    },

    commentText: {
        backgroundColor: "#E8E8E8",
        padding: 16,
        flex: 1,
        borderRadius: 6,
        fontSize: 13,
    },
    commentData:{
        marginTop: 8,
alignSelf: "flex-end",

    },

data: {
    color: "#BDBDBD"
},

    inputContainer: {
        width: "100%",
        display: "flex",
        borderWidth: 3,
        borderColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between",

        alignItems: 'center',
        backgroundColor: "#E8E8E8",
        padding: 8,
        borderRadius: 50,
    },

    sendBtn: {
        width: 34,
        height: 34,
        borderRadius: 50,
        backgroundColor: "#FF6C00",
        justifyContent: "center",
        alignItems: "center",

    },
    logArrowUp: {
        color: "#FFFFFF",
    },

    input: {
        paddingLeft: 8,
    },
});

export default CommentsScreen;

