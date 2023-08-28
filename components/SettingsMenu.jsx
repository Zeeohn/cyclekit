import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import Profile from "./Profile"; // Import the Profile component
import { useThemeColor } from "../hooks/useThemeColor";

export default function SettingsScreen() {
  const [profileData, setProfileData] = useState({
    username: "John Doe",
    bio: "Hello, I'm John Doe!",
    profilePhoto: null,
  });
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();
  const onUpdateProfile = (newProfileData, newProfilePhoto) => {
    setProfileData({ ...newProfileData, profilePhoto: newProfilePhoto });
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <ScrollView>
    <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme }}>
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