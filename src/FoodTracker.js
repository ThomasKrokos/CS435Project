// calorie counter
// macro counter
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import React from "react";

const Foodtracker = ({ navigation }) => {
  return (
    <View style={[ { flex: 1, flexDirection: "column" }]}>
      <Pressable
        style={[
          styles.container,
          {
            flexDirection: "column",
          },
        ]}
        onPress={Keyboard.dismiss}
      >
        <View style={{ flex: 0.5 }}>
          <Text style={[styles.header, {}]}>Calories</Text>
        </View>

        <Pressable
          style={[{ flex: 1, flexDirection: "row", alignItems: "center" }]}
        >
          <TextInput
            style={[styles.textInput, { marginRight: "0%" }]}
            placeholder="0"
            keyboardType="number-pad"
          />
          <Text style={[styles.header, { marginLeft: "0%" }]}> / 2000</Text>
        </Pressable>

        <View style={{ flex: 0.5 }}>
          <Text style={[styles.header, { marginTop: "10%" }]}>Protein</Text>
        </View>

        <Pressable
          style={[{ flex: 1, flexDirection: "row", alignItems: "center" }]}
        >
          <TextInput
            style={[styles.textInput, { marginRight: "0%" }]}
            placeholder="0"
            keyboardType="number-pad"
          />
          <Text style={[styles.header, { marginLeft: "0%" }]}> / 100</Text>
        </Pressable>
        <Pressable style={[{ flex: 1 }]} onPress={() => navigation.popToTop()}>
          <Text>Return to Home</Text>
        </Pressable>

        <StatusBar style="auto" />
      </Pressable>
    </View>
  );
};

export default Foodtracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "20%",
    marginBottom: "5%",
  },
  header: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: RFValue(32),
  },

  textInput: {
    textAlign: "left",
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
    marginLeft: "0%",
    borderStyle: "solid",
    borderColor: "#A3A3A3",
    borderWidth: 1,
    borderRadius: 20,
  
    fontSize: RFValue(32),
    padding:"5%"
  },

  smallText: {
    textAlign: "left",
    justifyContent: "center",
    fontSize: RFValue(20),
  },
});
