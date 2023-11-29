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

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "./popup";

const defaultNutrientTracker = {
  currentCal: "Waiting for data...",
  maxCal: "Waiting for data...",
  currentProtein: "Waiting for data...",
  maxProtein: "Waiting for data...",
  date: "Waiting for data...",
};

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
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    console.log(today);
    return today;
  };

  const getMaxCalorie = (profileString) => {
    const profile = JSON.parse(profileString);
    console.log(profileString);
    console.log(profile);

    if (profile.gender === "Male") return profile.weight * 12;
    else return profile.weight * 10;
  };
  const getMaxProtein = (profileString) => {
    const profile = JSON.parse(profileString);
    console.log(profileString);
    console.log(profile);
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
        console.log(nutrientTracker);
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

  const updateCalorieCount = () => {
    SetUpdatingCalories(!updatingCalories);
  };
  const updateProteinCount = () => {
    SetUpdatingProtein(!updatingProtein);
  };

  //   NutrientTracker: {
  //     currentCal: "" // current amount of calories you ate today so far
  //     targetCal: "" // target amount of calories to eat based on profile.bodyweight
  //     currentProtein: "" // current amount of protein you ate today so far
  //     targetProtein: "" // target amount of protein based on profile.bodyweight
  //     Date
  // }
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
            <View StyleSheet>

            </View>
            <Text style={[styles.header, { flex: 1 }]}>Add Calories</Text>
            
              <TextInput
                width="40%"
                style={[
                  styles.textInput,
                  { flex: 1 },
                ]}
                placeholder="0"
                keyboardType="number-pad"
                onChange={(event) => {
                  SetPopupInput(Number(event.nativeEvent.text));
                  console.log(event.nativeEvent.text);
                }}
              />

            <View style={{ flexDirection: "row", flex: 1 }}>
              <Pressable
                style={[styles.button, { flex: 0.5, padding: "10%" }]}
                onPress={() => {
                  SetCurrentCal(currentCal + popupInput);
                  SetUpdatingCalories(false);
                  SetPopupInput(0);
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

      <Pressable
        style={[{ flex: 1, flexDirection: "row", alignItems: "center" }]}
        onPress={() => SetUpdatingCalories(true)}
      >
        <Text style={[styles.header, { flex: 1 }]}>
          Calories: {currentCal} / {targetCal}
        </Text>
      </Pressable>

      <Pressable
        style={[{ flex: 1, flexDirection: "row", alignItems: "center" }]}
        onPress={() => SetUpdatingProtein(true)}
      >
        <Text style={[styles.header, { flex: 1 }]}>
          Protein: {currentProtein} / {targetProtein}
        </Text>
      </Pressable>
      <Pressable style={[{ flex: 2 }]} onPress={() => navigation.popToTop()}>
        <Text>Return to Home</Text>
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
    // marginTop: "20%",
    // marginBottom: "5%",
  },
  header: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: RFValue(32),
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

  smallText: {
    textAlign: "left",
    justifyContent: "center",
    fontSize: RFValue(20),
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
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderColor: "#A3A3A3",
    borderWidth: 1,
    borderRadius: 20,
    padding: "10%",
    fontSize: RFValue(16),
  },
});
