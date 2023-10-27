import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Stepper from "./../components/Stepper";
import StepperControl from "./../components/StepperControl";
import Register from "./../components/steps/Register";
import PersonalDetails from "./../components/steps/PersonalDetails";
import Experience from "./../components/steps/Experience";
import Items from "./../components/steps/Items";
import Complete from "./../components/steps/Complete";

import { StepperContext } from "./../contexts/StepperContext";

export default function CustomerSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState("");

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const steps = ["Register", "Info", "Dates", "Items", "Complete"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Register />;
      case 2:
        return <PersonalDetails />;
      case 3:
        return <Experience />;
      case 4:
        return <Items />;
      case 5:
        return <Complete />;
      default:
        break;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#7b091c", flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#7b091c" },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} style={{ marginRight: 15 }}>
              <Ionicons name="ios-chevron-back" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: "white",
              }}
            >
              Sign Up
            </Text>
          ),
        }}
      />
      <ScrollView style={{ flex: 1 }}>
        <View className="flex flex-1 items-center mt-5">
          <Image
            className="w-18 h-18"
            source={require("../assets/images/logo.png")}
            style={{ tintColor: "white" }}
          />
          <Text className="font-mediumFont text-2xl text-white mt-4">
            Cyclekits
          </Text>
          <View className="p-4 rounded-xl bg-white mt-12 mb-10 w-[90%]">
            <View>
              <Stepper steps={steps} currentStep={currentStep} />
            </View>
            <View className="mt-10 mb-4">
              <StepperContext.Provider
                value={{
                  userData,
                  setUserData,
                  finalData,
                  setFinalData,
                }}
              >
                {displayStep(currentStep)}
              </StepperContext.Provider>
            </View>
            <View>
              {currentStep !== steps.length && (
                <StepperControl
                  handleClick={handleClick}
                  currentStep={currentStep}
                  steps={steps}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
