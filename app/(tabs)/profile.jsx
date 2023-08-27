import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Profile from "../../components/Profile"; // Import the Profile component
import { Stack } from "expo-router";
import SearchBar from "./../../components/SearchBar";
import { useThemeColor } from "./../../hooks/useThemeColor";

export default function ProfileScreen() {
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

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
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colorScheme },
          headerLeft: () => <SearchBar />,
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Account
            </Text>
          ),
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.contentContainer}>
        {/* Display the profile */}
        <Profile profileData={profileData} onUpdateProfile={onUpdateProfile} />
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
