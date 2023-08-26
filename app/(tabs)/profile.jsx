import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import Profile from "../../components/Profile"; // Import the Profile component

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
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Navigation items */}
        <TouchableOpacity style={styles.navItem}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Transaction History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>

        {/* Display the profile */}
        <Profile
          profileData={profileData}
          onUpdateProfile={onUpdateProfile}
        />
      </View>
    </SafeAreaView>
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
