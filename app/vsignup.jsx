import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Stack, Link, Redirect, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VendorSignup() {
  const [nameInput, setNameInput] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();

  const statesInNigeria = [
    "Federal Capital Territory",
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleNameInput = (text) => {
    setNameInput(text);
  };
  const handleBusinessInput = (text) => {
    setBusinessName(text);
  };
  const handleEmailInput = (text) => {
    setEmail(text);
  };
  const handlePhoneInput = (text) => {
    setPhoneInput(text);
  };
  const handleStateInput = (text) => {
    setStateInput(text);
  };
  const handleRegionInput = (text) => {
    setRegion(text);
  };
  const handleAddressInput = (text) => {
    setAddress(text);
  };
  const handlePasswordInput = (text) => {
    setPassword(text);
  };
  const handleConfirmPasswordInput = (text) => {
    setConfirmPassword(text);
  };

  const handleRegister = () => {
    if (
      !nameInput ||
      !email ||
      !businessName ||
      !phoneInput ||
      !address ||
      !password
    ) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Oh-Uh",
        button: "Ok",
        textBody: "Please fill in all required fields!",
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

    let requestData = {
      full_name: nameInput,
      business_name: businessName,
      email: email,
      phone: phoneInput,
      address: address,
      password: password,
      profile_image: selectedImage,
    };

    // let formData = new FormData();
    // formData.append("full_name", nameInput);
    // formData.append("business_name", businessName);
    // formData.append("email", email);
    // formData.append("phone", phoneInput);
    // formData.append("address", address);
    // formData.append("password", password);
    // formData.append("profile_image", selectedImage);

    const config = {
      method: "post",
      url: "https://dev.cyclekits.ng/api/vendor/register",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    console.log(config.data);

    axios(config)
      .then(async (response) => {
        const data = response.data;
        console.log(data);

        if (data.status) {
          console.log("Vendor Created Successfully");
          console.log("Token:", data.token);
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
            textBody: `Registration failed: ${data.message}`,
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
            textBody: `An unexpected error occurred during registration, please try again later!`,
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
        <View className="flex flex-1 items-center justify-center mt-16">
          <Text className="font-normalFont text-white text-lg mb-4">
            Signup for a new account
          </Text>
          <View className="flex bg-white rounded-full p-2 w-36 h-36">
            <View className="rounded-full border-4 p-3 border-black">
              <View className="rounded-full w-24 h-24 justify-center items-center overflow-hidden">
                {selectedImage ? (
                  <Image
                    className="w-24 h-24"
                    source={{ uri: selectedImage }}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/profile.png")}
                    className="w-24 h-24"
                  />
                )}
              </View>
            </View>
            <View className="left-28 flex items-start -top-8">
              <TouchableOpacity
                className="bg-white p-1 rounded-lg"
                onPress={handleImageUpload}
              >
                <FontAwesome name="edit" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="font-normalFont mt-4 text-white text-base">
            Optional
          </Text>
        </View>
        <View className="mx-5">
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              Name
            </Text>
            <TextInput
              value={nameInput}
              onChangeText={handleNameInput}
              minLength={5}
              required={true}
              className="border flex-1 rounded-lg bg-white py-2 px-4 font-normalFont text-base text-black"
              placeholder="Enter your full name"
              style={{
                borderColor: "black",
                color: "black",
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              Business Name
            </Text>
            <TextInput
              value={businessName}
              onChangeText={handleBusinessInput}
              minLength={3}
              required={true}
              className="border flex-1 rounded-lg bg-white py-2 px-4 font-normalFont text-base text-black"
              placeholder="Enter your Business/Brand Name"
              style={{
                borderColor: "black",
                color: "black",
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={handleEmailInput}
              minLength={3}
              required={true}
              className="border flex-1 rounded-lg bg-white py-2 px-4 font-normalFont text-base text-black"
              placeholder="Enter your email"
              style={{
                borderColor: "black",
                color: "black",
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              Phone Number
            </Text>
            <TextInput
              value={phoneInput}
              onChangeText={handlePhoneInput}
              keyboardType="number-pad"
              maxLength={11}
              minLength={11}
              required={true}
              className="border flex-1 rounded-lg bg-white py-2 px-4 font-normalFont text-base text-black"
              placeholder="Enter your phone number"
              style={{
                borderColor: "black",
                color: "black",
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              State
            </Text>
            <View className="border flex-1 rounded-lg h-full bg-white font-normalFont text-base text-black">
              <Picker
                selectedValue={stateInput}
                onValueChange={handleStateInput}
              >
                <Picker.Item label="Select a state" value="" />
                {statesInNigeria.map((state, index) => (
                  <Picker.Item label={state} value={state} key={index} />
                ))}
              </Picker>
            </View>
          </View>
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              City/Region
            </Text>
            <TextInput
              value={region}
              onChangeText={handleRegionInput}
              className="border flex-1 rounded-lg bg-white py-2 px-4 font-normalFont text-base text-black"
              style={{
                borderColor: "black",
                color: "black",
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              Address
            </Text>
            <TextInput
              value={address}
              onChangeText={handleAddressInput}
              minLength={5}
              required={true}
              className="border flex-1 rounded-lg bg-white py-2 px-4 font-normalFont text-base text-black"
              placeholder="Enter your address"
              style={{
                borderColor: "black",
                color: "black",
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={handlePasswordInput}
              minLength={5}
              required={true}
              className="border flex-1 rounded-lg bg-white py-2 px-4 font-normalFont text-base text-black"
              placeholder="Enter your password"
              secureTextEntry={true}
              style={{
                borderColor: "black",
                color: "black",
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="font-mediumFont pb-1 text-base text-white">
              Retype Password
            </Text>
            <TextInput
              value={confirmPassword}
              onChangeText={handleConfirmPasswordInput}
              minLength={5}
              required={true}
              className="border flex-1 rounded-lg bg-white py-2 px-4 font-normalFont text-base text-black"
              placeholder="Confirm your password"
              secureTextEntry={true}
              style={{
                borderColor: "black",
                color: "black",
              }}
            />
          </View>
        </View>
        <View className="items-center mt-4">
          <TouchableOpacity
            className="rounded-lg mt-3 px-4 py-3 bg-white"
            onPress={handleRegister}
          >
            <Text className="font-mediumFont text-[#7b091c] text-base">
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center mt-2 mb-4">
          <Text className="font-normalFont text-base text-white">
            Already have an account?
          </Text>
          <Link href="/vlogin">
            <Text className="underline font-normalFont text-base text-white">
              {" "}
              Sign in
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
