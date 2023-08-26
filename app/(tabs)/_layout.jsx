import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Link, Tabs } from "expo-router";
import React, { useRef } from "react";

export default function TabLayout() {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate("index");
  };

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  function getWidth() {
    let width = Dimensions.get("window").width;
    width = width - 80;
    return width / 5;
  }

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        tabBarStyle: [
          {
            backgroundColor: "white",
            position: "absolute",
            height: 70,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.09,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 30,
          },
        ],
      }}
    >
      <Tabs.Screen
        name="updates"
        options={{
          title: "",
          href: { pathname: "/updates" },
          tabBarIcon: ({ focused }) => (
            <View className="flex-col items-center mt-5">
              <Ionicons
                name="newspaper"
                size={26}
                color={focused ? "#7b091c" : "black"}
              />
              <Text className="text-xs font-normalFont">Updates</Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "",
          href: { pathname: "/store" },
          tabBarIcon: ({ focused }) => (
            <View className="flex-col items-center mt-5">
              <FontAwesome5
                name="store"
                size={26}
                color={focused ? "#7b091c" : "black"}
              />
              <Text className="text-xs font-normalFont">Store</Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          href: "/",
          tabBarIcon: ({ focused }) => (
            <View className="">
              <TouchableOpacity onPress={navigateToHome}>
                <View
                  className=" w-14 h-14 bg-[#7b091c] rounded-full justify-center items-center"
                  style={{ marginBottom: Platform.OS == "android" ? 50 : 30 }}
                >
                  <FontAwesome5 name="home" size={30} color={"white"} />
                </View>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "",
          href: { pathname: "/chat" },
          tabBarIcon: ({ focused }) => (
            <View className="flex-col items-center mt-4">
              <Ionicons
                name="chatbubbles"
                size={26}
                color={focused ? "#7b091c" : "black"}
              />
              <Text className="text-xs font-normalFont">Chat</Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          href: { pathname: "/profile" },
          tabBarIcon: ({ focused }) => (
            <View className="flex-col items-center mt-5">
              <FontAwesome
                name="user-circle"
                size={26}
                color={focused ? "#7b091c" : "black"}
              />
              <Text className="text-xs font-normalFont ">Account</Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 4,
              useNativeDriver: true,
            }).start();
          },
        })}
      />

      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: "red",
          position: "absolute",
          bottom: 98,
          left: 50,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </Tabs>
  );
}
