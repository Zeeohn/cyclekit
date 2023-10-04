import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { Stack } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import VendorProfile from "./../../components/VendorProfile";
import Svg, {
  G,
  Path,
  ClipPath,
  Circle,
  Defs,
  Mask,
  Rect,
} from "react-native-svg";

export default function Vprofile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: "#7b091c",
              }}
            >
              Account
            </Text>
          ),
          headerTitleAlign: "center",
        }}
      />
      <View>
        <VendorProfile />
      </View>
    </SafeAreaView>
  );
}
