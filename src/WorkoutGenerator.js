// look up a workout
// or have diagram of body that you 
// can pick a muscle group and it gives workouts
// or both if we crazy

// Querying chatgpt for workout ideas/example splits

// Videos? or some sort of explanation for workouts
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from 'react-native'
import RoutineForm from "./RoutineForm";
import React from 'react'
import RoutineFormContainer from "./RoutineForm";

const WorkoutGenerator = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>WorkoutGenerator</Text>
      <Button
        title="Go Back to Home"
        onPress={() => navigation.popToTop()}
      />
      <Text>&nbsp;</Text>
      <RoutineFormContainer />
      <StatusBar style="auto" />
    </View>
  )
}

export default WorkoutGenerator

const styles = StyleSheet.create({})