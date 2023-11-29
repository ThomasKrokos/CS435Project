import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "./Popup";

const Foodtracker = ({ navigation }) => {
  const [targetCal, SetTargetCal] = useState(0);
  const [currentCal, SetCurrentCal] = useState(0);
  const [targetProtein, SetTargetProtein] = useState(0);
  const [currentProtein, SetCurrentProtein] = useState(0);
  const [updatingCalories, SetUpdatingCalories] = useState(false);
  const [updatingProtein, SetUpdatingProtein] = useState(false);
  const [popupInput, SetPopupInput] = useState(0);

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  const getMaxCalorie = (profileString) => {
    const profile = JSON.parse(profileString);

    if (profile.gender === "Male") return profile.weight * 12;
    else return profile.weight * 10;
  };
  const getMaxProtein = (profileString) => {
    const profile = JSON.parse(profileString);
    return profile.weight * 0.6;
  };

  const getNutrientTracker = async () => {
    try {
      const profileString = await AsyncStorage.getItem("profile");
      const nutrientTrackerString = await AsyncStorage.getItem(
        "nutrientTracker"
      );
      if (
        nutrientTrackerString != null &&
        JSON.parse(nutrientTrackerString).date === getDate()
      ) {
        const nutrientTracker = JSON.parse(nutrientTrackerString);
        SetTargetCal(nutrientTracker.targetCal);
        SetCurrentCal(nutrientTracker.currentCal);
        SetTargetProtein(nutrientTracker.targetProtein);
        SetCurrentProtein(nutrientTracker.currentProtein);
      } else {
        const newNutrientTracker = {
          currentCal: 0,
          targetCal: profileString ? getMaxCalorie(profileString) : 2000,
          currentProtein: 0,
          targetProtein: profileString ? getMaxProtein(profileString) : 100,
          date: getDate(),
        };
        const newNutrientTrackerString = JSON.stringify(newNutrientTracker);
        await AsyncStorage.setItem("nutrientTracker", newNutrientTrackerString);
        SetTargetCal(newNutrientTracker.targetCal);
        SetCurrentCal(newNutrientTracker.currentCal);
        SetTargetProtein(newNutrientTracker.targetProtein);
        SetCurrentProtein(newNutrientTracker.currentProtein);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getNutrientTracker();
  }, []);

  const updateCurrentCalorieLocally = async () => {
    try {
      const newNutrientTracker = {
        currentCal: currentCal + popupInput,
        targetCal: targetCal,
        currentProtein: currentProtein,
        targetProtein: targetProtein,
        date: getDate(),
      };

      const newNutrientTrackerString = JSON.stringify(newNutrientTracker);
      await AsyncStorage.setItem("nutrientTracker", newNutrientTrackerString);
    } catch (e) {
      console.error(e);
    }
  };
  const updateCurrentProteinLocally = async () => {
    try {
      const newNutrientTracker = {
        currentCal: currentCal,
        targetCal: targetCal,
        currentProtein: currentProtein + popupInput,
        targetProtein: targetProtein,
        date: getDate(),
      };

      const newNutrientTrackerString = JSON.stringify(newNutrientTracker);
      await AsyncStorage.setItem("nutrientTracker", newNutrientTrackerString);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={[styles.container, { flex: 1, flexDirection: "column" }]}>
      <Popup isVisible={updatingCalories}>
        <Pressable
          style={[
            styles.container,
            {
              flexDirection: "column",
            },
          ]}
          onPress={Keyboard.dismiss}
        >
          <View style={[styles.Popup, { flexDirection: "column", flex: 0.5 }]}>
            <View StyleSheet></View>
            <Text style={[styles.header, { flex: 0.75 }]}>Add Calories</Text>

            <TextInput
              style={[styles.textInput, { flex: 1, marginBottom: "10%" }]}
              placeholder="0"
              keyboardType="number-pad"
              onChange={(event) => {
                SetPopupInput(Number(event.nativeEvent.text));
              }}
            />

            <View style={{ flexDirection: "row", flex: 1 }}>
              <Pressable
                style={[styles.button, { flex: 0.5, padding: "10%" }]}
                onPress={() => {
                  SetCurrentCal(currentCal + popupInput);
                  SetUpdatingCalories(false);
                  SetPopupInput(0);
                  updateCurrentCalorieLocally();
                }}
              >
                <Text style={[{ textAlign: "center", color: "#ffffff" }]}>
                  Add
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {
                    flex: 0.5,
                    padding: "10%",
                    backgroundColor: "#ffffff",
                    borderColor: "#000000",
                    borderWidth: 2,
                    borderStyle: "solid",
                  },
                ]}
                onPress={() => {
                  SetUpdatingCalories(false);
                  SetPopupInput(0);
                }}
              >
                <Text style={[{ textAlign: "center" }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Popup>
      <Popup isVisible={updatingProtein}>
        <Pressable
          style={[
            styles.container,
            {
              flexDirection: "column",
            },
          ]}
          onPress={Keyboard.dismiss}
        >
          <View style={[styles.Popup, { flexDirection: "column", flex: 0.5 }]}>
            <View StyleSheet></View>
            <Text style={[styles.header, { flex: 0.75 }]}>Add Protein </Text>

            <TextInput
              style={[styles.textInput, { flex: 1, marginBottom: "10%" }]}
              placeholder="0"
              keyboardType="number-pad"
              onChange={(event) => {
                SetPopupInput(Number(event.nativeEvent.text));
              }}
            />

            <View style={{ flexDirection: "row", flex: 1 }}>
              <Pressable
                style={[styles.button, { flex: 0.5, padding: "10%" }]}
                onPress={() => {
                  SetCurrentProtein(currentProtein + popupInput);
                  SetUpdatingProtein(false);
                  SetPopupInput(0);
                  updateCurrentProteinLocally();
                }}
              >
                <Text style={[{ textAlign: "center", color: "#ffffff" }]}>
                  Add
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {
                    flex: 0.5,
                    padding: "10%",
                    backgroundColor: "#ffffff",
                    borderColor: "#000000",
                    borderWidth: 2,
                    borderStyle: "solid",
                  },
                ]}
                onPress={() => {
                  SetUpdatingProtein(false);
                  SetPopupInput(0);
                }}
              >
                <Text style={[{ textAlign: "center" }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Popup>
      <View
        style={{
          flex: 0.05,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
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
            },
          ]}
          onPress={() => navigation.navigate("Home")}
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
          flex: 0.25,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.headerLine, { flex: 1 }]}>
          <Text style={[styles.header, {}]}>Track your food</Text>
        </View>
      </View>

      <Pressable
        style={[
          {
            flex: 0.3,
            flexDirection: "row",
            alignItems: "center",
            padding: "0%",
          },
        ]}
        onPress={() => SetUpdatingCalories(true)}
      >
        <Text style={[styles.header, { flex: 1 }]}>
          Calories: {currentCal} / {targetCal}
        </Text>
      </Pressable>

      <Pressable
        style={[
          {
            flex: 0.3,
            flexDirection: "row",
            alignItems: "center",
            padding: "0%",
          },
        ]}
        onPress={() => SetUpdatingProtein(true)}
      >
        <Text style={[styles.header, { flex: 1 }]}>
          Protein: {currentProtein} / {targetProtein} Grams
        </Text>
      </Pressable>

      <StatusBar style="auto" />
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
    marginLeft: "5%",
    marginRight: "5%",
  },
  header: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: RFValue(28),
  },

  textInput: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginLeft: "0%",
    marginRight: "0%",
    borderStyle: "solid",
    borderColor: "#A3A3A3",
    borderWidth: 1,
    borderRadius: 20,
    width: 40,

    fontSize: RFValue(32),
    padding: "5%",
  },

  Popup: {
    backgroundColor: "#f2f2f2",
    borderRadius: "20px",
    padding: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    margin: "2%",
    borderRadius: 20,
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "#A3A3A3",
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "20%",
    paddingRight: "20%",
    marginBottom: "5%",

    fontSize: RFValue(28),
  },
  headerLine: {
    paddingBottom: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
  },
});
