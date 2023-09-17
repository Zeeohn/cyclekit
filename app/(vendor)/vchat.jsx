import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchBar from "./../../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import VendorChat from "./../../components/VendorChat";

export default function Vchat() {
  const navigation = useNavigation();

  const navigateToNotification = () => {
    navigation.navigate("notifications");
  };

  const notifications = "2";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "white" },
          headerLeft: () => <SearchBar />,
          headerRight: () => (
            <View className="right-4">
              <TouchableOpacity onPress={navigateToNotification}>
                <View className="relative">
                  <Ionicons
                    name="ios-notifications-sharp"
                    size={26}
                    color="#7b091c"
                  />
                  {notifications > 0 && (
                    <View className="absolute top-0 left-3 rounded-full h-5 w-5 items-center justify-center bg-red-900 border-2 border-white">
                      <Text className="font-normalFont text-white text-xs -mt-0.5 ">
                        {notifications}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: "#7b091c",
              }}
            >
              Message
            </Text>
          ),
          headerTitleAlign: "center",
        }}
      />
      <View className="flex flex-1 pb-24 bg-[#7b091c]">
        <VendorChat />
      </View>
    </SafeAreaView>
  );
}
