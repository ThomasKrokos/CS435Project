// look up a workout
// or have diagram of body that you 
// can pick a muscle group and it gives workouts
// or both if we crazy

// Querying chatgpt for workout ideas/example splits

// Videos? or some sort of explanation for workouts
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import RoutineFormContainer from "./RoutineForm";

const WorkoutGenerator = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go Back to Home"
        onPress={() => navigation.popToTop()}
      />
      <Text>Create a Workout Plan!</Text>
      <Text>&nbsp;</Text>
      <Text>Select your split: </Text>
      <RoutineFormContainer />
      <StatusBar style="auto" />
    </View>
  )
}

export default WorkoutGenerator

const styles = StyleSheet.create({})