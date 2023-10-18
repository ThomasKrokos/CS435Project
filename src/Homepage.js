// Add step counter in here
// this will be the first page they see
// with navigation to the other pages
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>We will have a step tracker here</Text>
      <Text>This is the Homepage</Text>
      <Button
        title="Go to FoodTracker"
        onPress={() => navigation.navigate("Tracker")}
      />
      <Button
        title="Go to Workouts"
        onPress={() => navigation.navigate("Workouts")}
      />
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>

      <StatusBar style="auto" />
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({});
