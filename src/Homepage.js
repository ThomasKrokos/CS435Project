import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WorkoutButton from "./Workout/WorkoutButton";

/*********  Stuff for Step Counter  *********/
import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";

const Homepage = ({ navigation }) => {
  /*********  Stuff for Step Counter  *********/
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [profileExists, SetProfileExists] = useState(false);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }
      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  const getLocalData = async () => {
    try {
      let profile = await AsyncStorage.getItem("profile");
      let nutrientTracker = await AsyncStorage.getItem("nutrientTracker");
      let split = await AsyncStorage.getItem("split");
      if (profile != null) {
        SetProfileExists(true);
      } else {
        SetProfileExists(false);
      }
    } catch (e) {
      console.error(e);
    }

    // console.log(values)
  };

  useEffect(() => {
    const subscription = subscribe();
    getLocalData();
    // return () => subscription && subscription.remove();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      {profileExists ? (
        <>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 5 }}>
              <Text
                style={{ textAlign: "right", justifyContent: "center" }}
              ></Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                {
                  marginRight: "5%",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flex: 1,
                  backgroundColor: pressed ? "#bbbbbb" : "#f2f2f2",
                  borderRadius: "50px",

                  // #f2f2f2 is default background color
                },
              ]}
              onPress={() => navigation.push("Profile")}
            >
              <Image
                source={require("../assets/profileicon.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  flex: 1,
                }}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <View style={{ flex: 2 }}>
            <Text style={[styles.header, {}]}>Homepage</Text>
          </View>

          <View style={{ flex: 2 }}>
            <Text style={[styles.header, {}]}>
              This is where Stats will display
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-evenly",
              flex: 3,
              flexDirection: "row",
            }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  flex: 1,
                  padding: "5%",
                  backgroundColor: pressed ? "#bbbbbb" : "#000000",
                },
              ]}
              onPress={() => navigation.navigate("Tracker")}
            >
              <Text
                style={[
                  styles.buttonTitle,
                  {
                    fontSize: RFValue(26),
                    fontWeight: "bold",
                  },
                ]}
              >
                Track your food!
              </Text>
            </Pressable>

            <WorkoutButton />
          </View>

          <View style={{ flex: 2, marginTop: "10%" }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: RFValue(20),
              }}
            >
              {pastStepCount}/10,000 Steps!
            </Text>
          </View>

          <StatusBar style="auto" />
        </>
      ) : (
        <>
          <View style={{ flex: 0.4, margin: "5%" }}>
            <Text style={styles.header}>
              {" "}
              Please create a profile to continue{" "}
            </Text>
          </View>
          <View style={{ flex: 0.2, marginLeft: "20%", marginRight: "20%" }}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  flex: 1,
                  padding: "2%",
                  backgroundColor: pressed ? "#bbbbbb" : "#000000",
                },
              ]}
              onPress={() => navigation.navigate("Profile")}
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
                Create your Profile
              </Text>
            </Pressable>
          </View>
          <View style={{ flex: 0.4 }}></View>
        </>
      )}
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: RFValue(32),
  },
  button: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    margin: "1%",
    borderRadius: 20,
  },
  buttonTitle: {
    textAlign: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
});
