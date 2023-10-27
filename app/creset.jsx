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

export default function CustomerReset() {
  const [phoneInput, setPhoneInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handlePhoneInput = (text) => {
    setPhoneInput(text);
  };

  const handleCodeInput = (text) => {
    setCode(text);
  };

  const handlePasswordInput = (text) => {
    setPassword(text);
  };

  const handlePasswordConfirm = (text) => {
    setConfirmPassword(text);
  };

  const handleGetCode = () => {
    if (!phoneInput) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Oh-Uh",
        button: "Ok",
        textBody: "Phone number is required!",
      });
      return;
    }

    const phoneDetails = {
      phone: phoneInput,
    };

    axios
      .post(
        "https://dev.cyclekits.ng/api/auth/reset-password-code",
        phoneDetails
      )
      .then(async (response) => {
        const data = response.data;

        if (data.status) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: `${data.message}`,
          });
          setCodeSent(!codeSent);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: `Error sending code: ${data.message}`,
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
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: `An unexpected error occurred when sending the code, please try again later!`,
          });
        }
      });
  };

  const handleReset = () => {
    if (!phoneInput || !code || !password || confirmPassword) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Oh-Uh",
        button: "Ok",
        textBody: "All input fields are required!",
      });
      return;
    }

    if (password !== confirmPassword) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Oh-Uh",
        button: "Ok",
        textBody: "Passwords do not match, check and try again!",
      });
      return;
    }

    const resetDetails = {
      phone: phoneInput,
      code: code,
      password: password,
    };

    axios
      .post("https://dev.cyclekits.ng/api/auth/reset-password", resetDetails)
      .then(async (response) => {
        const data = response.data;

        if (data.status) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: `${data.message}`,
          });

          await router.replace("/clogin");
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: `Password Reset Error: ${data.message}`,
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
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: `An unexpected error occurred during password reset, please try again later!`,
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
          <View className="p-4 rounded-xl bg-white mt-12 w-[90%]">
            <View className="p-4 rounded-xl border border-gray-300 flex flex-col">
              <Text className="text-lg text-[#7b091c] font-mediumFont text-center">
                Reset your password
              </Text>
              {!codeSent ? (
                <View>
                  <View className="mt-4">
                    <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
                      Phone Number
                    </Text>
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
                  </View>
                  <View className="flex items-center mt-8 mb-3">
                    <TouchableOpacity
                      className="bg-[#7b091c] rounded-xl px-4 py-3"
                      onPress={handleGetCode}
                    >
                      <Text className="font-normalFont text-white text-base">
                        Get Code
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  <View className="mt-4">
                    <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
                      Phone Number
                    </Text>
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
                  </View>
                  <View className="mt-4">
                    <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
                      Code
                    </Text>
                    <TextInput
                      value={code}
                      onChangeText={handleCodeInput}
                      keyboardType="number-pad"
                      className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
                      placeholder="Enter the received code"
                      style={{
                        borderColor: "black",
                        color: "black",
                      }}
                    />
                  </View>
                  <View className="mt-4">
                    <Text className="font-mediumFont text-base pb-1 text-[#7b091c]">
                      New Password
                    </Text>
                    <TextInput
                      value={password}
                      onChangeText={handlePasswordInput}
                      className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
                      placeholder="Enter your password"
                      minLength={6}
                      secureTextEntry={true}
                      style={{
                        borderColor: "black",
                        color: "black",
                      }}
                    />
                  </View>
                  <View className="mt-4">
                    <Text className="font-mediumFont text-base pb-1 text-[#7b091c]">
                      Confirm New Password
                    </Text>
                    <TextInput
                      value={confirmPassword}
                      onChangeText={handlePasswordConfirm}
                      className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
                      placeholder="Confirm your password"
                      minLength={6}
                      secureTextEntry={true}
                      style={{
                        borderColor: "black",
                        color: "black",
                      }}
                    />
                  </View>
                  <View className="flex items-center mt-8 mb-3">
                    <TouchableOpacity
                      className="bg-[#7b091c] rounded-xl px-4 py-3"
                      onPress={handleReset}
                    >
                      <Text className="font-normalFont text-white text-base">
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
