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

const Profile = ({navigation, handleProfileCreation}) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [fieldsFilled, setFieldsFilled] = useState([
    false,
    false,
    false,
    false,
  ]);

  const genderOptions = ["Male", "Female"];

  const handleSubmit = async () => {

    if (
      fieldsFilled[0] &&
      fieldsFilled[1] &&
      fieldsFilled[2] &&
      fieldsFilled[3]
    ) {
      const profile = {
        name: name,
        gender: gender,
        age: age,
        weight: weight,
        height: height,
      };

      try {
        const profileString = JSON.stringify(profile);

        await AsyncStorage.setItem("profile", profileString);
      } catch (e) {
        // console.error(e);
      }
      handleProfileCreation(profile);
      // navigation.navigate("ViewProfile")
    } else {
      console.error("Please fill out all fields");
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
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
            <Text style={[styles.header, {}]}>Create Your Profile</Text>
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
              placeholder="name"
              onChangeText={(text) => {
                setName(text);
                const updatedFieldsFilled = [...fieldsFilled];
                updatedFieldsFilled[0] = true;
                setFieldsFilled(updatedFieldsFilled);
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
              style={[styles.textInput, { flex: 0.25 }]}
              placeholder="age"
              keyboardType="number-pad"
              onChangeText={(text) => {
                setAge(text);

                const updatedFieldsFilled = [...fieldsFilled];
                updatedFieldsFilled[1] = true;
                setFieldsFilled(updatedFieldsFilled);
              }}
            />
            <View style={{ flex: 0.5 }}></View>
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
              style={[styles.textInput, { flex: 0.25 }]}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setWeight(text);
                const updatedFieldsFilled = [...fieldsFilled];
                updatedFieldsFilled[2] = true;
                setFieldsFilled(updatedFieldsFilled);
              }}
              placeholder="lbs"
            />
            <View style={{ flex: 0.5 }}></View>
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
              style={[styles.textInput, { flex: 0.25 }]}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setHeight(text);
                const updatedFieldsFilled = [...fieldsFilled];
                updatedFieldsFilled[3] = true;
                setFieldsFilled(updatedFieldsFilled);
              }}
              placeholder="inches"
            />
            <View style={{ flex: 0.5 }}></View>
          </View>
          <View style={{ flex: 1, marginTop: "10%" }}>
            <SegmentedControl
              values={genderOptions}
              selectedIndex={0}
              style={{}}
              onChange={(event) => {
                setGender(genderOptions[event.nativeEvent.selectedSegmentIndex]);
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
      </Pressable>
    </View>
  );
};

export default Profile;

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
