import { View, Text, TextInput } from "react-native";
import React, { useContext } from "react";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { StepperContext } from "./../../contexts/StepperContext";
import { Entypo } from "@expo/vector-icons";

export default function Register() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  return (
    <View className="p-4 rounded-xl border border-gray-300 flex flex-col">
      <View className="mt-4">
        <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
          Phone Number
        </Text>
        <View className="flex flex-row items-center">
          <TextInput
            value={userData["phone"] || ""}
            onChangeText={(text) => handleChange("phone", text)}
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
            value={userData["password"] || ""}
            onChangeText={(text) => handleChange("password", text)}
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
    </View>
  );
}
