import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Profile from "../../components/Profile";
import { Stack } from "expo-router";
import SearchBar from "./../../components/SearchBar";
import { useThemeColor } from "./../../hooks/useThemeColor";

const NavigationItem = ({ label, colorScheme, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.navigationItem,
        { backgroundColor: colorScheme === "#121212" ? "black" : "white" },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: colorScheme === "#121212" ? "white" : "black" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

let height = Dimensions.get("window").height;
// let height = Dimensions.get("window").height;
height = height - 180;

export default function ProfileScreen() {
  const navigation = useNavigation();

  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  const [profileData, setProfileData] = useState({
    username: "Marie Curie",
    bio: "08143878904",
    profilePhoto: null,
  });

  const onUpdateProfile = (newProfileData, newProfilePhoto) => {
    setProfileData({ ...newProfileData, profilePhoto: newProfilePhoto });
  };

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  const navigateToProfile = () => {
    navigation.navigate("profileupdate");
  };

  const navigateToTransaction = () => {
    navigation.navigate("transactions");
  };

  const navigateToPassword = () => {
    navigation.navigate("password");
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme }}>
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
      <ScrollView style={{ height: height, marginBottom: 80 }}>
        <View style={styles.content}>
          <Profile
            profileData={profileData}
            onUpdateProfile={onUpdateProfile}
          />

          <NavigationItem
            label="Profile"
            colorScheme={colorScheme}
            onPress={navigateToProfile}
          />
          <NavigationItem
            label="Settings"
            colorScheme={colorScheme}
            onPress={navigateToSettings}
          />
          <NavigationItem
            label="Transaction History"
            colorScheme={colorScheme}
            onPress={navigateToTransaction}
          />
          <NavigationItem
            label="Change Password"
            colorScheme={colorScheme}
            onPress={handleLogout}
            onPress={navigateToPassword}
          />
          <NavigationItem
            label="Logout"
            colorScheme={colorScheme}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
  },
  navigationItem: {
    marginVertical: 3,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#bd6379",
    width: "90%",
    alignItems: "flex-start",
    shadowColor: "#bd6379",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.73,
    shadowRadius: 5,
    elevation: 10,
  },
});
