import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nested/DefaultScreenPosts";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{headerShown: false}}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} options={{headerShown: false}} />
      <NestedScreen.Screen name="Map" component={MapScreen} options={{headerShown: false}}/>
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;