import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import React from "react";

const Profile = ({ navigation }) => {
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
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../assets/close.png")}
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
            }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View style={{ flex: 5 }}>
        <Text style={[styles.header, {
            
        }]}>Create Your Profile</Text>
      </View>
    </View>
  );
};

export default Profile;

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
});
