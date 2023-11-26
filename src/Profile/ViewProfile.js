import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

const ViewProfile = ({ navigation, name, gender, height, weight, age }) => {
  useEffect(() => {
    console.log(gender);
  }, []);
  return (
    <View style={[styles.container, { flexDirection: "column", margin: "5%" }]}>
      <View
        style={{
          flex: 0.05,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "5%, 0, 20%",
        }}
      >
        <View style={{ flex: 8 }}></View>
        <Pressable
          style={({ pressed }) => [
            {
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flex: 1,
              backgroundColor: pressed ? "#bbbbbb" : "#f2f2f2",
              // #f2f2f2 is default background color
            },
          ]}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../../assets/close.png")}
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View
        style={{
          flex: 0.15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.headerLine, { flex: 1, marginBottom: "5%" }]}>
          <Text style={[styles.header, {}]}>View Your Profile</Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.6,
          flexDirection: "column",
          margin: "0%, 10%",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.smallText, { flex: 1 }]}>Name: {name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.smallText, { flex: 1 }]}>Age: {age}</Text>

          <View style={{ flex: 0.25 }}></View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.smallText, { flex: 1 }]}>Weight: {weight}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.smallText, { flex: 1 }]}>Height: {height}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.smallText, { flex: 1 }]}>Gender: {gender}</Text>
        </View>
      </View>

      <View style={{ flex: 0.13, marginLeft: "20%", marginRight: "20%" }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              flex: 1,
              padding: "2%",
              backgroundColor: pressed ? "#bbbbbb" : "#000000",
            },
          ]}
          onPress={() => navigation.push("UpdateProfile")}
        >
          <Text
            style={[
              styles.buttonTitle,
              {
                fontSize: RFValue(18),
                fontWeight: "bold",
              },
            ]}
          >
            Update
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 0.07, marginLeft: "30%", marginTop: "5%" }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              flex: 1,
              padding: "2%",
              backgroundColor: pressed ? "#bbbbbb" : "#000000",
            },
          ]}
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("profile");
              console.log("Profile deleted");
            } catch (e) {
              console.error(e);
            }
          }}
        >
          <Text
            style={[
              styles.buttonTitle,
              {
                fontSize: RFValue(18),
                fontWeight: "bold",
              },
            ]}
          >
            Clear current Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    marginBottom: "5%",
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: RFValue(28),
  },

  smallText: {
    textAlign: "left",
    justifyContent: "center",
    fontSize: RFValue(24),
  },

  textInput: {
    textAlign: "left",
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
    margin: "2%",
    borderStyle: "solid",
    borderColor: "#A3A3A3",
    borderWidth: 1,
    borderRadius: 20,
    padding: "4%",
    fontSize: RFValue(16),
  },

  button: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    margin: "2%",
    borderRadius: 20,
  },
  buttonTitle: {
    textAlign: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
  headerLine: {
    paddingBottom: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
  },
});
