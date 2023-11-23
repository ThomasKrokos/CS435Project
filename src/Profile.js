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

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const genderOptions = ["Male", "Female"];
  const handleSubmit = () => {
    const profile = {
      name: name,
      gender: gender,
      age: age,
      weight: weight,
      height: height,
    };
    console.log(profile);
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
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/close.png")}
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
              onChangeText={(text) => setName(text)}
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
              onChangeText={(text) => setAge(text)}
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
              onChangeText={(text) => setWeight(text)}
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
              onChangeText={(text) => setHeight(text)}
              placeholder="inches"
            />
            <View style={{ flex: 0.5 }}></View>
          </View>
          <View style={{ flex: 1, marginTop: "10%" }}>
            <SegmentedControl
              values={genderOptions}
              selectedIndex={gender}
              style={{}}
              onChange={(event) => {
                console.log(
                  genderOptions[event.nativeEvent.selectedSegmentIndex]
                );
                setGender(event.nativeEvent.selectedSegmentIndex);
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
