import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Switch,
} from "react-native";
import { useThemeColor } from "./../hooks/useThemeColor";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const renderThemeColors = () => {
    const colorsArr = [
      "#7b091c",
      "#0c61e2",
      "#ffcc00",
      "#f36a34",
      "red",
      "pink",
      "green",
      "#121212",
      "#f2f2f2",
    ];

    return colorsArr.map((color) => (
      <TouchableOpacity
        className="colors h-24 w-24 rounded-full mb-5 mt-4"
        key={color}
        onPress={() => setThemeColor(color)}
        style={{
          backgroundColor: `${color}`,
          borderWidth: themeColor === color ? 3 : 0,
          borderColor:
            themeColor === color && colorScheme === "#121212"
              ? "#ffffff"
              : "#000000",
        }}
      ></TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={{ backgroundColor: themeColor, flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colorScheme },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} style={{ marginRight: 15 }}>
              <Ionicons
                name="ios-chevron-back"
                size={28}
                color={colorScheme === "#121212" ? "white" : "black"}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Settings
            </Text>
          ),
        }}
      />
      <View className="flex justify-center items-center mt-4">
        <Text
          className="font-boldFont text-lg"
          style={{
            color: `${themeColor === "#f2f2f2" ? "black" : "white"}`,
          }}
        >
          Choose Modes:
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            className="font-normalFont text-sm"
            style={{
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
            }}
          >
            Light
          </Text>
          <Switch
            value={colorScheme === "#121212"} // Use the colorScheme value to set the initial state
            onValueChange={toggleColorMode}
          />
          <Text
            className="font-normalFont text-sm pl-2"
            style={{
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
            }}
          >
            Dark
          </Text>
        </View>
      </View>
      <View className="flex justify-center items-center mt-4">
        <Text
          className="font-boldFont text-lg"
          style={{
            color: `${themeColor === "#f2f2f2" ? "black" : "white"}`,
          }}
        >
          Choose app theme color:
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        {renderThemeColors()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
