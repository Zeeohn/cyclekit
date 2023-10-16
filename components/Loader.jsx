import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Image,
  SafeAreaView,
} from "react-native";
import { Stack } from "expo-router";

const Loader = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = () => {
    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  useEffect(() => {
    spin();
  }, []);

  const spinAngle = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <Animated.Image
          style={{
            width: 200,
            height: 200,
            transform: [{ rotate: spinAngle }],
          }}
          source={require("../assets/images/logo.png")}
        />
      </View>
    </>
  );
};

export default Loader;
