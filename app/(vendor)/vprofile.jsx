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
  const [nameInput, handleNameInput] = useState("");
  const [businessInput, handleBusinessInput] = useState("");
  const [addressInput, handleAddressInput] = useState("");
  const [bankInput, handleBankInput] = useState("");
  const [phoneInput, handlePhoneInput] = useState("");

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
