import {
  Image,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import HomeAnimation from "./../../components/HomeAnimation";
import { useThemeColor } from "./../../hooks/useThemeColor";

function LogoTitle() {
  return (
    <View className="pt-1">
      <Image
        className="w-16 h-16"
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}

let height = Dimensions.get("window").height;
// let height = Dimensions.get("window").height;
height = height - 20;
// height = height - 80;

export default function index() {
  const [text, setText] = useState("User Preference");
  const [isHeaderShown, setIsHeaderShown] = useState(true);

  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();
  const router = useRouter();

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    // Determine whether to show or hide the header based on scroll position
    const shouldShowHeader = scrollPosition <= 0;

    if (shouldShowHeader !== isHeaderShown) {
      setIsHeaderShown(shouldShowHeader);
    }
  };

  return (
    <SafeAreaView className="h-full mb-10">
      <View
        className="justify-center items-center flex-1 flex"
        style={{ backgroundColor: colorScheme }}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: colorScheme },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: "center",
          }}
        />
      </View>
      <ScrollView
        style={{
          backgroundColor: colorScheme,
          color: "white",
          paddingBottom: 70,
          height: "100vh",
        }}
      >
        <View className="flex justify-center items-center mt-6">
          <Text
            className="font-boldFont text-2xl"
            style={{
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
            }}
          >
            Hello Marie,
          </Text>
          <HomeAnimation />
        </View>
        <View className="flex flex-row justify-center space-x-28 mb-4 pb-2">
          <View className="flex flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-[#0c61e2]"></View>
            <Text
              className="font-normalFont text-xs"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Ovulation
            </Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-[#7b091c]"></View>
            <Text
              className="font-normalFont text-xs"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Period
            </Text>
          </View>
        </View>
        <View className="border border-b border-gray-300 rounded-lg"></View>
        <View className="flex items-center">
          <Text
            className="font-boldFont text-xl p-2"
            style={{
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
            }}
          >
            Subscription Plan
          </Text>
        </View>
        <View className="border border-b border-gray-300 rounded-lg"></View>
        <View className="flex flex-row justify-center">
          <View className="flex flex-1 items-center p-2">
            <Text
              className="font-mediumFont text-sm"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Cycle Plan
            </Text>
            <Text
              className="font-mediumFont text-sm"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Available
            </Text>
            <Text
              className="font-mediumFont text-base"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              5
            </Text>
          </View>
          <View className="border border-l border-gray-300"></View>
          <View className="flex flex-1 items-center p-2">
            <Text
              className="font-mediumFont text-sm"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Total Cycle Pack
            </Text>
            <Text
              className="font-mediumFont text-sm"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Received
            </Text>
            <Text
              className="font-mediumFont text-base"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              1
            </Text>
          </View>
        </View>
        <View className="border border-b border-gray-300 rounded-lg"></View>
        <View className="flex flex-row mt-4 mb-40 items-center mx-2">
          <Text
            className="font-boldFont text-xl"
            style={{
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
            }}
          >
            Preference:
          </Text>
          <Text
            className="flex-1 pt-2 font-normalFont border-b-2  ml-1 text-center"
            style={{
              borderColor: `${colorScheme === "#121212" ? "white" : "black"}`,
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
            }}
          >
            User Preference
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
