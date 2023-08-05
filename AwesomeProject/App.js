import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from './components/Main';
import * as Font from "expo-font";


export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bolt': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
  });

  
  return (
  <Provider store={store}>
      <Main/>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
