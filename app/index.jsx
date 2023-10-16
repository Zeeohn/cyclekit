import { Redirect, Stack, router } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import React, { useState, useEffect, useRef } from "react";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const vendorRoute = () => {
    router.push("/vlogin");
  };
  const userRoute = () => {
    router.push("/(customer)");
  };
  const shopRoute = () => {
    router.push("/(customer)/store");
  };

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const role = await AsyncStorage.getItem("role");

        if (token && role) {
          setUserRole(role);

          if (role === "vendor") {
            router.push("/(vendor)/");
          } else if (role === "customer") {
            router.push("/(customer)/");
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Oh-Uh",
          textBody: `An unexpected error occurred! Please reopen the application.`,
        });
        setLoading(false);
        console.log(error);
      }
    };

    checkStorage();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#7b091c" }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View className="flex flex-1 justify-center items-center">
          <Image
            className="w-36 h-36"
            source={require("../assets/images/logo.png")}
            style={{ tintColor: "white" }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: "#7b091c" },
            headerBackVisible: false,
            title: "",
            headerShadowVisible: false,
          }}
        />
        <View className="bg-[#7b091c] flex flex-1 items-center">
          <Text className="font-boldFont text-5xl text-white">Cyclekits</Text>
          <Text className="font-normalFont text-lg text-white mb-8">
            For Women and Children
          </Text>
          <Image
            className="w-24 h-24"
            source={require("../assets/images/logo.png")}
            style={{ tintColor: "white" }}
          />
          <View className="items-center">
            <Text className="text-white my-8 font-mediumFont text-3xl">
              Welcome
            </Text>
            <View className="mt-4 mb-5">
              <TouchableOpacity className="rounded-2xl px-4 py-2 bg-white flex flex-row items-center">
                <Text className="text-[#7b091c] font-mediumFont text-lg">
                  Continue as a Customer
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={34}
                  color="#7b091c"
                />
              </TouchableOpacity>
            </View>
            <View className="mb-10">
              <TouchableOpacity
                onPress={vendorRoute}
                className="rounded-2xl px-7 py-2 bg-black flex flex-row items-center "
              >
                <Text className="text-white font-mediumFont text-lg">
                  Continue as a Vendor
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={34}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text className="font-boldFont text-base text-white text-center mb-10">
                or
              </Text>
              <TouchableOpacity className="rounded-2xl px-7 py-2 bg-transparent flex flex-row items-center border-2 border-white">
                <Text className="text-white font-mediumFont text-lg">
                  Shop as guest
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
    // const type = "vendor";
    // if (type == "vendor") {
    //   return router.push("/(vendor)");
    //   // return <Redirect href={"/(vendor)"} />;
    // }
    // //   return <Redirect href={"/(customer)"} />;
    // return router.push("/(customer)");
  }
}
