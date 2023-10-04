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
  Keyboard,
} from "react-native";
import "react-native-gesture-handler";
import { useLayoutEffect, useState } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { Link, Tabs } from "expo-router";
import React, { useRef } from "react";
import { useThemeColor } from "../../hooks/useThemeColor";
import Svg, {
  G,
  Path,
  ClipPath,
  Circle,
  Defs,
  Mask,
  Rect,
} from "react-native-svg";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function AppLayout() {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const navigation = useNavigation();
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  const navigateToHome = () => {
    navigation.navigate("index");
  };

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const getWidth = () => {
    let width = Dimensions.get("window").width;
    // let height = Dimensions.get("window").height;
    width = width - 80;
    // height = height - 80;
    return width / 4;
  };

  let width = Dimensions.get("window").width;

  useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardStatus(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardStatus(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        keyboardHidesTabBar: true,
        tabBarStyle: [
          {
            backgroundColor: "white",
            position: "absolute",
            height: 60,
            bottom: 20,
            marginHorizontal: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.85,
            shadowOffset: {
              width: 15,
              height: 15,
            },
            paddingHorizontal: 30,
            display: keyboardStatus ? "none" : "flex",
          },
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          href: "/",
          tabBarIcon: ({ focused }) => (
            <View className="flex-col items-center mt-5">
              <Svg
                width="26"
                height="26"
                viewBox="0 0 34 30"
                preserveAspectRatio="xMinYMin"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M32.9492 3.58209L22.2407 28.3582C21.7465 29.403 20.758 30 19.6049 30C18.4515 30 17.4631 29.403 16.9688 28.3582L12.5207 18.806C12.5207 18.6567 12.356 18.6567 12.356 18.6567L1.81222 14.6268C0.658991 14.179 0 13.2835 0 12.2388C0 11.194 0.658991 10.2985 1.81222 9.85074L29.16 0.14925C29.4895 -8.9407e-08 29.8191 0 30.1485 0C30.9722 0 31.6313 0.2985 32.1256 0.746265C33.114 1.49253 33.2787 2.53731 32.9492 3.58209Z"
                  fill={focused ? "#7b091c" : "#bd6379"}
                  fill-opacity="0.49"
                />
              </Svg>

              <Text className="pt-1 text-xs font-normalFont">Post</Text>
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
        name="vstore"
        options={{
          title: "",
          href: { pathname: "/vstore" },
          tabBarIcon: ({ focused }) => (
            <View className="flex-col items-center mt-5">
              <Svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M8.84611 0.512812C7.94868 0.256412 6.53843 0 5.51279 0C4.48716 0 3.07691 0.256412 2.17948 0.512812C1.28205 0.641025 0.641025 1.28205 0.512812 2.17948C0.256412 3.07691 0 4.48716 0 5.51279C0 6.53843 0.256412 7.94868 0.384612 8.84611C0.512812 9.74354 1.28205 10.3845 2.05128 10.5128C2.9487 10.641 4.35895 10.8974 5.38459 10.8974C6.41023 10.8974 7.82048 10.641 8.7179 10.5128C9.61534 10.3845 10.2564 9.61534 10.3846 8.84611C10.5128 7.94868 10.7691 6.53843 10.7691 5.51279C10.7691 4.48716 10.5128 3.07691 10.3846 2.17948C10.3846 1.28205 9.74354 0.641025 8.84611 0.512812Z"
                  fill={focused ? "#7b091c" : "#bd6379"}
                />
                <Path
                  d="M8.84605 14.6154C7.94861 14.4871 6.53836 14.2307 5.51272 14.2307C4.4871 14.2307 3.07685 14.4871 2.17941 14.6154C1.28199 14.7436 0.640961 15.5128 0.512748 16.282C0.384548 17.1795 0.128136 18.5898 0.128136 19.6154C0.128136 20.641 0.384548 22.0512 0.512748 22.9486C0.640961 23.8461 1.41019 24.4871 2.17941 24.6154C3.07685 24.7435 4.4871 25 5.51272 25C6.53836 25 7.94861 24.7435 8.84605 24.6154C9.74347 24.4871 10.3845 23.7179 10.5127 22.9486C10.6409 22.0512 10.8974 20.641 10.8974 19.6154C10.8974 18.5898 10.6409 17.1795 10.5127 16.282C10.3845 15.3846 9.74347 14.7436 8.84605 14.6154Z"
                  fill={focused ? "#7b091c" : "#bd6379"}
                />
                <Path
                  d="M16.2819 10.513C17.1794 10.6413 18.5896 10.8976 19.6153 10.8976C20.6409 10.8976 22.0511 10.6413 22.9485 10.513C23.846 10.3848 24.487 9.61557 24.6151 8.84635C24.7434 7.94892 24.9998 6.53867 24.9998 5.51304C24.9998 4.4874 24.7434 3.07715 24.6151 2.17971C24.487 1.28229 23.7178 0.641263 22.9485 0.513063C22.0511 0.38485 20.6409 0.12845 19.6153 0.12845C18.5896 0.12845 17.1794 0.38485 16.2819 0.513063C15.3845 0.641263 14.7434 1.41049 14.6153 2.17971C14.487 3.07715 14.2306 4.4874 14.2306 5.51304C14.2306 6.53867 14.487 7.94892 14.6153 8.84635C14.7434 9.74379 15.3845 10.3848 16.2819 10.513Z"
                  fill={focused ? "#7b091c" : "#bd6379"}
                />
                <Path
                  d="M22.9485 14.6154C22.0511 14.4871 20.6409 14.2307 19.6153 14.2307C18.5896 14.2307 17.1794 14.4871 16.2819 14.6154C15.3845 14.7436 14.7434 15.5128 14.6153 16.282C14.487 17.1795 14.2306 18.5898 14.2306 19.6154C14.2306 20.641 14.487 22.0512 14.6153 22.9486C14.7434 23.8461 15.5126 24.4871 16.2819 24.6154C17.1794 24.7435 18.5896 25 19.6153 25C20.6409 25 22.0511 24.7435 22.9485 24.6154C23.846 24.4871 24.487 23.7179 24.6151 22.9486C24.7434 22.0512 24.9998 20.641 24.9998 19.6154C24.9998 18.5898 24.7434 17.1795 24.6151 16.282C24.487 15.3846 23.846 14.7436 22.9485 14.6154Z"
                  fill={focused ? "#7b091c" : "#bd6379"}
                />
              </Svg>

              <Text className="pt-1 text-xs font-normalFont">Store</Text>
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
        name="vchat"
        options={{
          title: "",
          href: { pathname: "/vchat" },
          tabBarIcon: ({ focused }) => (
            <View className="flex-col items-center mt-4">
              <Svg
                height="30"
                preserveAspectRatio="xMinYMin"
                viewBox="0 0 48 48"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G fill="#333">
                  <Path
                    d="m24 12.0417c0-3.33675-2.7049-6.0417-6.0417-6.0417h-5.9166c-3.33675 0-6.0417 2.70495-6.0417 6.0417 0 3.3367 2.70495 6.0416 6.0417 6.0416h1.1583v2.9167s10.8-1.4583 10.8-8.9583z"
                    fill={focused ? "#7b091c" : "#bd6379"}
                  />
                  <Path
                    d="m18.5 28c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"
                    fill={focused ? "#7b091c" : "#bd6379"}
                  />
                  <Path
                    d="m14.5 34c-2.8369 0-8.5 1.4293-8.5 4.2667v3.7333h17v-3.7333c0-2.8374-5.6631-4.2667-8.5-4.2667z"
                    fill={focused ? "#7b091c" : "#bd6379"}
                  />
                  <Path
                    d="m33.5 32c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                    fill={focused ? "#7b091c" : "#bd6379"}
                  />
                  <Path
                    d="m33.5 34c-2.8369 0-8.5 1.4293-8.5 4.2667v3.7333h17v-3.7333c0-2.8374-5.6631-4.2667-8.5-4.2667z"
                    fill={focused ? "#7b091c" : "#bd6379"}
                  />
                  <Path
                    d="m32.0417 7c-3.3368 0-6.0417 2.70495-6.0417 6.0417 0 7.5 9.6 8.9583 9.6 8.9583v-2.9167h.3583c3.3368 0 6.0417-2.7049 6.0417-6.0416 0-3.33675-2.7049-6.0417-6.0417-6.0417z"
                    fill={focused ? "#7b091c" : "#bd6379"}
                  />
                </G>
              </Svg>
              <Text className="pt-1 text-xs font-normalFont">Chat</Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tabs.Screen
        name="vprofile"
        options={{
          title: "",
          href: { pathname: "/vprofile" },
          tabBarIcon: ({ focused }) => (
            <View className="flex-col items-center mt-5">
              <Svg
                height="26"
                preserveAspectRatio="xMinYMin"
                viewBox="0 0 24 24"
                width="26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="m0 0h24v24h-24z" fill="none" />
                <Path
                  d="m14.256 21.744-2.256 2.256-2.256-2.256c-4.434-1.024-7.744-5-7.744-9.744 0-5.52 4.48-10 10-10s10 4.48 10 10c0 4.744-3.31 8.72-7.744 9.744zm-8.233-6.328c1.468 2.19 3.672 3.584 6.137 3.584 2.464 0 4.669-1.393 6.136-3.584a8.968 8.968 0 0 0 -6.136-2.416 8.968 8.968 0 0 0 -6.137 2.416zm5.977-4.416a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  fill={focused ? "#7b091c" : "#bd6379"}
                />
              </Svg>
              <Text className="pt-1 text-xs font-normalFont ">Account</Text>
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
