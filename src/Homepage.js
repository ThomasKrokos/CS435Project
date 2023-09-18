// Add step counter in here
// this will be the first page they see
// with navigation to the other pages
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react';


const Homepage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>We will have a step tracker here</Text>
      <Text>This is the Homepage</Text>
      <Button
        title="Go to FoodTracker"
        onPress={() => navigation.navigate('Tracker')}
      />
            <Button
        title="Go to Workouts"
        onPress={() => navigation.navigate('Workouts')}
      />

      <StatusBar style="auto" />
    </View>
  )
}

export default Homepage

const styles = StyleSheet.create({
})