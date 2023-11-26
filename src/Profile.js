import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CreateProfile from "./Profile/CreateProfile";
import ViewProfile from "./Profile/ViewProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const defaultProfile = {
    name: "Waiting for data...",
    gender: "Waiting for data...",
    age: "Waiting for data...",
    weight: "Waiting for data...",
    height: "Waiting for data...",
  };
  const [profileExists, setProfileExists] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);

  const handleProfileCreation = (profile) => {
    setProfileExists(true);
    setProfile(profile);
  };
  const handleProfileDeletion = () => {
    setProfileExists(false);
    setProfile(defaultProfile);
  };

  useEffect(() => {
    console.log("line 15 of Profile.js");
    const getProfile = async () => {
      try {
        const value = await AsyncStorage.getItem("profile");
        if (value !== null) {
          const profile = JSON.parse(value);

          setProfileExists(true);
          setProfile(profile);
        } else {
          console.log("Profile is empty");
          setProfileExists(false);
          setProfile(defaultProfile);
        }
      } catch (e) {
        // Handle error reading value
        console.log(e);
      }
    };
    getProfile();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        margin: "0%",
      }}
    >
      {profileExists ? (
        <ViewProfile
          handleProfileCreation={handleProfileCreation}
          handleProfileDeletion={handleProfileDeletion}
          navigation={navigation}
          name={profile.name}
          age={profile.age}
          weight={profile.weight}
          height={profile.height}
          gender={profile.gender}
        />
      ) : (
        <CreateProfile
          navigation={navigation}
          handleProfileCreation={handleProfileCreation}
          handleProfileDeletion={handleProfileDeletion}
        />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
