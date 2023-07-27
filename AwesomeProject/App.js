
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import { NavigationContainer, useRoute } from "@react-navigation/native";
import { Home } from './Home';

export default function App() {
  const routing = Home({});
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bolt': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
  });

  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
