import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useThemeColor } from "./../hooks/useThemeColor";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function notifications() {
  const notificationsData = [
    {
      id: 1,
      message:
        "Hi! Marie, Just a reminder you just received treatment. Have a lovely day!",
      date: "2023-08-27 10:30 AM",
    },
    {
      id: 2,
      message:
        "Hi! Marie, Your Subscription has expired.  You have untill the next 10 days to renew your subscription, else your access will be limited.",
      date: "2023-08-28 01:45 PM",
    },
  ];

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
              Notifications
            </Text>
          ),
        }}
      />
      <ScrollView className="flex-1 p-5">
        {notificationsData.map((notification) => (
          <View
            key={notification.id}
            className="rounded-xl p-4 mb-3"
            style={{
              backgroundColor: `${
                themeColor === "#f2f2f2" ? "black" : "white"
              }`,
            }}
          >
            <Text
              className="font-normalFont text-base"
              style={{
                color: `${themeColor === "#f2f2f2" ? "white" : "black"}`,
              }}
            >
              {notification.message}
            </Text>
            <Text
              className="mt-1 text-right font-normalFont text-[10px]"
              style={{
                color: `${themeColor === "#f2f2f2" ? "white" : "black"}`,
              }}
            >
              Sent at: {notification.date}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
