import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const signIn = () => {
  router.push("/clogin");
};

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <View className="flex flex-row justify-between mx-3 mt-4 mb-4">
      <TouchableOpacity
        className={`bg-black rounded-md px-7 py-4`}
        onPress={currentStep === 1 ? signIn : () => handleClick()}
      >
        <Text className="font-mediumFont text-sm text-white">
          {currentStep === 1 ? "Sign in" : "Back"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-[#7b091c] rounded-md px-7 py-4"
        onPress={() => handleClick("next")}
      >
        <Text className="font-mediumFont text-sm text-white">
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepperControl;
