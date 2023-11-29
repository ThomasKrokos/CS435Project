import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

/*********  Stuff for Step Counter  *********/
import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";

const Homepage = ({ navigation }) => {
  /*********  Stuff for Step Counter  *********/
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

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
      await AsyncStorage.multiRemove(['profile', 'nutrientTracker', 'split'])
    } catch (e) {
      console.error(e)
    }
    console.log("hi")

    // console.log(values)

  }


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
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 5 }}>
          <Text style={{textAlign:"right", justifyContent:"center"}}>
            
            {/* conditional will be added later
            Create a Profile for Personalized Nutritional Information -&gt; 
            and
              Other option will be Update Profile
             */}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              marginRight: "5%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flex: 1,
              backgroundColor: pressed ? "#bbbbbb" : "#f2f2f2",
<<<<<<< Updated upstream
              borderRadius: "50px",
=======
>>>>>>> Stashed changes
              // #f2f2f2 is default background color
            },
          ]}
          onPress={() => navigation.navigate("Profile")}
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

      <View style={{ flex: 3, flexDirection: "row" }}>
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

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              flex: 1,
              padding: "5%",
              backgroundColor: pressed ? "#bbbbbb" : "#000000",
            },
          ]}
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
        </Pressable>
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
