import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";

const MapScreen = ({navigation}) => (
  <View style={styles.container}>
            {/* <View style={styles.header}>
            <TouchableOpacity style={styles.logArrow} >
                <Ionicons name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={styles.title}>Мапа</Text>
        </View>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 50.516339,
        longitude: 30.602185,
        latitudeDelta: 0.001,
        longitudeDelta: 0.006,
      }}
    >
      <Marker
        coordinate={{ latitude: 50.516339, longitude: 30.602185 }}
        title="travel photo"
      />
    </MapView> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    fontFamily: "Roboto-Regular",
    padding: 16,
    width: 390,
    height: 760,
    backgroundColor: "white",
},
header: {    
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
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
},

});

export default MapScreen;