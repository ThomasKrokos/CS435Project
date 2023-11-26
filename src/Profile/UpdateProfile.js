import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  View,
} from "react-native";
import { useState, useEffect } from "react";

import { RFValue } from "react-native-responsive-fontsize";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

let currentProfile = {};

const UpdateProfile = ({ navigation }) => {

  useEffect(() => {
    const getProfile = async () => {
      try {
        const value = await AsyncStorage.getItem("profile");
        if (value !== null) {
          currentProfile = JSON.parse(value);
          setName(currentProfile.name);
          if (currentProfile.gender === "Male") setGenIndex(0);
          else setGenIndex(1);
          setGender(currentProfile.gender)
          setAge(currentProfile.age);
          setWeight(currentProfile.weight);
          setHeight(currentProfile.height);
        } else {
          console.log("Profile is empty");
          navigation.goBack();
        }
      } catch (e) {
        // Handle error reading valuer
        console.log(e);
      }
    };
    getProfile();
  }, []);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [genIndex, setGenIndex] = useState(1);
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const genderOptions = ["Male", "Female"];

  const handleSubmit = async () => {
    const updatedProfile = {
      name: name,
      gender: gender,
      age: age,
      weight: weight,
      height: height,
    };

    try {
      const profileString = JSON.stringify(updatedProfile);

      await AsyncStorage.setItem("profile", profileString);
    } catch (e) {
      console.error(e);
    }
    navigation.push("Profile");
  };

  return (
    <View style={[styles.container, { flexDirection: "column" }]}>
      <Pressable
        style={[
          styles.container,
          {
            flexDirection: "column",
            margin: "5%",
          },
        ]}
        onPress={Keyboard.dismiss}
      >
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
            <Text style={[styles.header, {}]}>Update Your Profile</Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={[{ flex: 1, marginBottom: "5%" }]}>
            <Text style={[styles.smallText, {}]}>
              Fields left blank stay the same
            </Text>
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
            <Text style={[styles.smallText, { flex: 0.25 }]}>Name:</Text>
            <TextInput
              style={[styles.textInput, { flex: 0.5 }]}
              placeholder={`Current is ${currentProfile.name}`}
              onChangeText={(text) => {
                setName(text);
              }}
            />
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
            <Text style={[styles.smallText, { flex: 0.25 }]}>Age:</Text>
            <TextInput
              style={[styles.textInput, { flex: 0.5 }]}
              placeholder={`Current is ${currentProfile.age}`}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setAge(text);
              }}
            />
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
            <Text style={[styles.smallText, { flex: 0.25 }]}>Weight:</Text>
            <TextInput
              style={[styles.textInput, { flex: 0.5 }]}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setWeight(text);
              }}
              placeholder={`Current is ${currentProfile.weight}`}
            />
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
            <Text style={[styles.smallText, { flex: 0.25 }]}>Height:</Text>
            <TextInput
              style={[styles.textInput, { flex: 0.5 }]}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setHeight(text);
              }}
              placeholder={`Current is ${currentProfile.height}`}
            />
            <View style={{ flex: 0.25 }}></View>
          </View>
          <View style={{ flex: 1, marginTop: "10%" }}>
            <SegmentedControl
              values={genderOptions}
              selectedIndex={genIndex}
              style={{}}
              onChange={(event) => {
                setGender(
                  genderOptions[event.nativeEvent.selectedSegmentIndex]
                );
              }}
            />
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
            onPress={() => handleSubmit()}
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
              Submit
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default UpdateProfile;

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
    fontSize: RFValue(20),
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
    padding: "2%",
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
