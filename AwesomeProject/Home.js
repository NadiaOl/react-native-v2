import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import RegistrationScreen from './Screens/auth/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen';
import PostsScreen from './Screens/main/PostsScreen';
import CreatePostsScreen from './Screens/main/CreatePostsScreen';
import ProfileScreen from './Screens/main/ProfileScreen';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const Home = (isAuth) => {

    const centerTabBarIcon = (name, size, focused) => {

        return (
            <View style={styles.mainButton}>
                <Ionicons
                    name={name}
                    size={size}
                    style={[styles.icon]}
                />
            </View>
        );
    };

    const renderTabBarIcon = (name, size, focused) => {
        const iconColor = focused ? "#FF6C00" : "gray";
    
        return (
            <View style={styles.tabBarButton}>
                <Ionicons
                    name={name}
                    size={size}
                    style={[styles.tabIcon, { color: iconColor }]}
                />
            </View>
        );
    };
    if (!isAuth) {
        return (
            <AuthStack.Navigator>
                <AuthStack.Screen options={{headerShown: false}} name="Register" component={RegistrationScreen} />
                <AuthStack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
            </AuthStack.Navigator>
        );
    }
        return (
            <MainTab.Navigator screenOptions={{
                tabBarStyle: {
                    height: 70,
                },
                tabBarLabel: () => null,
                }}>
                <MainTab.Screen options={{headerShown: false,
                    tabBarIcon: ({ focused }) =>
                    renderTabBarIcon("grid-outline", 24, focused),}} 
                    name="Posts" component={PostsScreen} />
                <MainTab.Screen options={{headerShown: false,
                    tabBarIcon: ({ focused }) =>
                    centerTabBarIcon("add-outline", 24, focused),}} 
                    name="Create" component={CreatePostsScreen} />
                <MainTab.Screen  options={{headerShown: false,
                    tabBarIcon: ({ focused }) =>
                    renderTabBarIcon("person-outline", 24, focused),}} 
                    name="Profile" component={ProfileScreen} />
            </MainTab.Navigator>
        );
};

const styles = StyleSheet.create({
    tabBarButton: {
        flex: 1,
        height: 20,
        justifyContent: "center",
    },

    tabIcon: {
        color: "gray",
    },

    mainButton: {
        position: "relative",
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FF6C00",
    },

    icon: {
        position: "absolute",
        left: 24,
        top: 7,
        color: "#FFFFFF",

    },
});

