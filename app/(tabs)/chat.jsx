import { View, Text, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Message from "./../../components/Message";

export default function chat() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerRight: () => (
            <View className="mr-6">
              <Ionicons
                name="ios-notifications-sharp"
                size={24}
                color="black"
              />
            </View>
          ),
          headerTitle: () => (
            <Text className="font-boldFont text-xl flex justify-center items-center">
              Chat
            </Text>
          ),
        }}
      />
      <View>
        <Message />
      </View>
    </SafeAreaView>
  );
}
