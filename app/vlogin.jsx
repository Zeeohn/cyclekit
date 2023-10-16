import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Stack, Link, router } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function VendorLogin() {
  const [phoneInput, setPhoneInput] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handlePhoneInput = (text) => {
    setPhoneInput(text);
  };

  const handlePasswordInput = (text) => {
    setPassword(text);
  };

  const handleSignIn = () => {
    if (!phoneInput || !password) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Oh-Uh",
        button: "Ok",
        textBody: "Phone and Password cannot be empty!",
      });
      return;
    }

    const loginDetails = {
      phone: phoneInput,
      password: password,
    };

    axios
      .post("https://dev.cyclekits.ng/api/vendor/login", loginDetails)
      .then(async (response) => {
        const data = response.data;

        if (data.status) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: `${data.message}`,
          });
          await AsyncStorage.setItem("authToken", data.token);
          await AsyncStorage.setItem("role", "vendor");
          await router.replace("/(vendor)/");
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: `Sign in error: ${data.message}`,
          });
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const validationErrors = error.response.data.errors;
          const errorMessages = Object.values(validationErrors)
            .flat() // Flatten the error messages array
            .join("\n"); // Join error messages with newlines

          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: errorMessages,
          });
          console.log("Error Status:", error.response.status);
          console.log("Error Headers:", error.response.headers);
        } else if (error.request) {
          console.log("Request Error:", error.request);

          const errorMessage = error.request._response
            ? JSON.parse(error.request._response).message
            : null;

          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: `${errorMessage}`,
          });
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: `An unexpected error occurred during sign in, please try again later!`,
          });
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#7b091c" }}>
        <View className="flex flex-1 items-center justify-center mt-20">
          <Image
            className="w-18 h-18"
            source={require("../assets/images/logo.png")}
            style={{ tintColor: "white" }}
          />
          <Text className="font-mediumFont text-2xl text-white mt-4">
            Cyclekits
          </Text>
          <View className="bg-white rounded-2xl px-2 py-2 mt-8">
            <Text className="text-[#7b091c] font-boldFont text-2xl">
              WELCOME BACK VENDOR
            </Text>
          </View>
          <View className="p-4 rounded-xl bg-white mt-12 w-[90%]">
            <View className="p-4 rounded-xl border border-gray-300 flex flex-col">
              <Text className="text-base text-[#7b091c] font-normalFont text-center">
                Login to your account
              </Text>
              <View className="mt-4">
                <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
                  Phone Number
                </Text>
                <View className="flex flex-row items-center">
                  <TextInput
                    value={phoneInput}
                    onChangeText={handlePhoneInput}
                    keyboardType="number-pad"
                    maxLength={11}
                    minLength={11}
                    className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
                    placeholder="Enter your phone number"
                    style={{
                      borderColor: "black",
                      color: "black",
                    }}
                  />
                  <Entypo
                    name="phone"
                    size={24}
                    color="#7b091c"
                    style={{ marginLeft: -30, marginRight: 10 }}
                  />
                </View>
              </View>
              <View className="mt-4">
                <Text className="font-mediumFont text-base pb-1 text-[#7b091c]">
                  Password
                </Text>
                <View className="flex flex-row items-center">
                  <TextInput
                    value={password}
                    onChangeText={handlePasswordInput}
                    className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    style={{
                      borderColor: "black",
                      color: "black",
                    }}
                  />
                  <Entypo
                    name="key"
                    size={24}
                    color="#7b091c"
                    style={{ marginLeft: -30, marginRight: 10 }}
                  />
                </View>
              </View>
              <View className="flex items-center mt-8 mb-3">
                <TouchableOpacity
                  className="bg-[#7b091c] rounded-xl px-4 py-3"
                  onPress={handleSignIn}
                >
                  <Text className="font-normalFont text-white text-base">
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row justify-center">
                <Text className="font-normalFont text-base text-[#7b091c]">
                  Don't have an account?
                </Text>
                <Link href="/vsignup">
                  <Text className="underline font-normalFont text-base text-[#7b091c]">
                    {" "}
                    Sign up
                  </Text>
                </Link>
              </View>
              <View className="flex flex-row justify-center">
                <Text className="font-normalFont text-base text-[#7b091c]">
                  Forgotten your password?
                </Text>
                <Link href="/vreset">
                  <Text className="underline font-normalFont text-base text-[#7b091c]">
                    {" "}
                    Reset Password
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
