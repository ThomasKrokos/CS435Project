import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

/*********  Stuff for Step Counter  *********/
import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";

const Homepage = ({ navigation }) => {
  /*********  Stuff for Step Counter  *********/
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

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

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
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
      <TouchableOpacity
        style={{
          marginRight: "5%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <Image
          source={require("../assets/profileicon.png")}
          style={{
            width: "15%",
            height: "15%",
            flex: 1,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={{ flex: 2 }}>
        <Text style={[styles.header, {}]}>Homepage</Text>
      </View>

      <View style={{ flex: 2 }}>
        <Text style={[styles.header, {}]}>
          This is where Stats will display
        </Text>
      </View>

      <View style={{ flex: 3, flexDirection: "row" }}>
        <TouchableOpacity
          style={[styles.button, { flex: 1, padding: "5%" }]}
          onPress={() => navigation.navigate("Tracker")}
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
            Foodtracker
          </Text>
          <Text
            style={[
              styles.buttonTitle,
              {
                fontSize: RFValue(16),
              },
            ]}
          >
            0/2000 Calories
          </Text>
          <Text
            style={[
              styles.buttonTitle,
              {
                fontSize: RFValue(14),
              },
            ]}
          >
            0/100 Grams Protein
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { flex: 1, padding: "5%" }]}
          onPress={() => navigation.navigate("Workouts")}
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
            Start New Workout Plan!
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, marginTop:"5%" }}>
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
    borderStyle: "solid",
    borderColor: "#CC0000",
  },
  buttonTitle: {
    textAlign: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
});
