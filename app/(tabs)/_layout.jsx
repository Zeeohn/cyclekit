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

export default function TabLayout() {
  const navigation = useNavigation();
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();
  // console.log({ themeColor });
  const navigateToHome = () => {
    navigation.navigate("index");
  };

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const getWidth = () => {
    let width = Dimensions.get("window").width;
    // let height = Dimensions.get("window").height;
    width = width - 80;
    // height = height - 80;
    return width / 5;
  };

  let width = Dimensions.get("window").width;

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            backgroundColor: "white",
            position: "absolute",
            height: 70,
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
              <Svg
                height="26"
                preserveAspectRatio="xMinYMin"
                viewBox="-4 -2 24 24"
                width="26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="m3 0h10a3 3 0 0 1 3 3v14a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3-3v-14a3 3 0 0 1 3-3zm8 2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm-8 7a1 1 0 1 0 0 2h10a1 1 0 0 0 0-2zm0 3a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2zm0 3a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2zm8-10a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zm-8-3a1 1 0 0 0 -1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0 -1-1z"
                  fill={focused ? "#7b091c" : "#bd6379"}
                />
              </Svg>
              <Text className="pt-1 text-xs font-normalFont">Updates</Text>
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
              <Svg
                height="26"
                preserveAspectRatio="xMinYMin"
                viewBox="0 0 24 24"
                width="26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="m21.9329 11.6907c-.1023-2.26802-.5111-5.25771-.8178-7.31957-.2044-1.3402-1.3289-2.37113-2.7599-2.37113h-12.67529c-1.43107 0-2.55549 1.03093-2.75993 2.37113-.30666 2.16495-.61332 5.05155-.81776 7.31957-.10222 2.165-.10222 5.1547-.10222 7.3196 0 1.4433 1.12442 2.5773 2.55549 2.6804 2.14662.2062 5.11099.3093 7.35981.3093 2.2489 0 5.2132-.2062 7.3598-.3093 1.4311-.1031 2.5555-1.2371 2.5555-2.6804.2045-2.1649.2045-5.1546.1023-7.3196zm-9.9154.1031c-2.65768 0-4.90651-2.16493-4.90651-4.94844 0-.41237.30666-.82474.81776-.82474s.81776.41237.81776.82474c0 1.85567 1.53329 3.29894 3.27099 3.29894 1.7378 0 3.2711-1.54636 3.2711-3.29894 0-.41237.3066-.82474.8177-.82474s.8178.30928.8178.82474c0 2.68041-2.2488 4.94844-4.9066 4.94844z"
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
        name="index"
        options={{
          title: "",
          href: "/",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={navigateToHome}
              style={{ position: "relative" }}
            >
              <View
                className={`w-14 h-14 rounded-full justify-center items-center`}
                style={{
                  marginBottom: Platform.OS == "android" ? 50 : 40,
                  backgroundColor: `${focused ? "#7b091c" : "#bd6379"}`,
                }}
              >
                <Svg
                  height="26"
                  preserveAspectRatio="xMinYMin"
                  viewBox="0 0 24 24"
                  width="26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="m21.8844 15.2984c-.1566 1.7331-.4084 3.1414-.7147 4.3979-.2042 1.2566-1.4294 2.3037-2.7566 2.3037h-1.6336c-.9189 0-1.6336-.733-1.6336-1.6754v-4.2932c0-1.0471-.8168-1.8848-1.8378-1.8848h-2.3483c-1.02096 0-1.83775.8377-1.83775 1.8848v4.2932c0 .9424-.71469 1.6754-1.63358 1.6754h-1.93988c-1.32729 0-2.45038-.9424-2.75668-2.3037-.30629-1.3612-.57186-2.6636-.71469-4.3979-.18126-2.201 0-4.2932.1021-5.65442 0-.8377.5105-1.67539 1.22519-2.19895l7.14689-4.92147c.4084-.31414.9189-.52356 1.4294-.52356s1.1231.20942 1.5315.52356l7.1469 4.92147c.7147.52356 1.2252 1.36125 1.2252 2.19895.1021 1.36122.1987 3.45532 0 5.65442z"
                    fill="white"
                  />
                </Svg>
              </View>

              <View
                style={{
                  position: "absolute",
                  bottom: 42, // Adjust this value to position the semi-circle vertically
                  left: -6,
                  right: 0,
                  width: 70,
                  height: 40, // Adjust this value to control the size of the semi-circle
                  backgroundColor: colorScheme,
                  borderBottomLeftRadius: 50, // Half of the height to create a semi-circle
                  borderBottomRightRadius: 50, // Half of the height to create a semi-circle
                  zIndex: -2,
                  overflow: "hidden",
                }}
              />
            </TouchableOpacity>
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
