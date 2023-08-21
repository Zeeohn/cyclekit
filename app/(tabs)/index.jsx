import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import HomeAnimation from "./../../components/HomeAnimation";

function LogoTitle() {
  return (
    <View className="pt-10">
      <Image
        className="w-16 h-16"
        source={require("../../assets/images/logo-cyclekits.png")}
      />
    </View>
  );
}

export default function index() {
  const router = useRouter();
  return (
    <>
      <View className="bg-white justify-center items-center flex-1 flex">
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "#ffffff" },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: "center",
          }}
        />
      </View>
      <ScrollView className="bg-white">
        <View className="flex justify-center items-center">
          <Text className="font-boldFont text-2xl">Hello Marie,</Text>
          <HomeAnimation />
        </View>
        <View className="flex flex-row justify-center space-x-28 mb-4 pb-2">
          <View className="flex flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-blue-700"></View>
            <Text className="font-normalFont text-xs">Ovulation</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-red-500"></View>
            <Text className="font-normalFont text-xs">Period</Text>
          </View>
        </View>
        <View className="border border-b border-gray-300 rounded-lg"></View>
        <View className="flex items-center">
          <Text className="font-boldFont text-xl p-2">Subscription Plan</Text>
        </View>
        <View className="border border-b border-gray-300 rounded-lg"></View>
        <View className="flex flex-row justify-center">
          <View className="flex flex-1 items-center p-2">
            <Text className="font-mediumFont text-sm">Cycle Plan</Text>
            <Text className="font-mediumFont text-sm">Available</Text>
            <Text className="font-mediumFont text-base">5</Text>
          </View>
          <View className="border border-l border-gray-300"></View>
          <View className="flex flex-1 items-center p-2">
            <Text className="font-mediumFont text-sm">Total Cycle Pack</Text>
            <Text className="font-mediumFont text-sm">Received</Text>
            <Text className="font-mediumFont text-base">1</Text>
          </View>
        </View>
        <View className="border border-b border-gray-300 rounded-lg"></View>
      </ScrollView>
    </>
  );
}
