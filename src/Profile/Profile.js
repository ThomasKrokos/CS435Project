import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CreateProfile from "./CreateProfile";

const Profile = () => {
  return (
    <View style={{
      flex: 1,
      margin: "0%"
    }}>
      <CreateProfile />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
