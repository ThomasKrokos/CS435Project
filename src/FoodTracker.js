// calorie counter
// macro counter
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Foodtracker = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Foodtracker</Text>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <StatusBar style="auto" />
    </View>
  )
}

export default Foodtracker

const styles = StyleSheet.create({})