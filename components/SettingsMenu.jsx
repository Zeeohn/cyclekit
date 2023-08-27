import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import Profile from "./Profile"; // Import the Profile component

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    username: "John Doe",
    bio: "Hello, I'm John Doe!",
    profilePhoto: null,
  });

  const onUpdateProfile = (newProfileData, newProfilePhoto) => {
    setProfileData({ ...newProfileData, profilePhoto: newProfilePhoto });
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
      <Profile
          profileData={profileData}
          onUpdateProfile={onUpdateProfile}
        />
        
        
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    alignItems: "center",
    paddingVertical: 20,
  },
  navItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: "100%",
    alignItems: "flex-start",
  },
});