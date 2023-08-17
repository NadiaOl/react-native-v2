// import { StyleSheet } from 'react-native';
// import { useFonts } from 'expo-font';
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import Main from './components/Main';
// import * as Font from "expo-font";


// export default function App() {

//   const [fontsLoaded] = useFonts({
//     RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
//     RobotoBolt: require('./assets/fonts/Roboto-Bold.ttf'),
//     RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf')
//   });

  
//   return (
//   <Provider store={store}>
//       <Main/>
//   </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
import { Provider } from "react-redux";

import { StatusBar } from "expo-status-bar";

import { View, StyleSheet } from "react-native";

import { store } from "./redux/store";

import { useCallback } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Main from "./components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        <View onLayout={onLayoutRootView} style={styles.container}>
          <StatusBar style="auto" />
          <Main />
        </View>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});