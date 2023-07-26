
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import RegistrationScreen from './Screens/auth/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen';

const AuthStack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bolt': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
  });

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Register" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
