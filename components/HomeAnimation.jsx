import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";

const HomeAnimation = () => {
  const radii = [130, 110];
  const dotCount = 30;

  const renderDots = (dotColor, radius, xOffset = 0, yOffset = 0) => {
    const dots = [];

    for (let i = 0; i < dotCount; i++) {
      const angle = (i * 360) / dotCount;
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);

      dots.push(
        <Circle
          key={i}
          cx={x + radius + xOffset}
          cy={y + radius + yOffset}
          r={3} // Adjust the radius of the dots as needed
          fill={dotColor}
        />
      );
    }

    return dots;
  };

  const svgWidth = radii[0] * 2 + 20;
  //   const svgHeight = radii[0] * 2 + 20;

  return (
    <View className="flex justify-center items-center m-8 px-4">
      <Svg
        width={svgWidth}
        height={svgWidth}
        viewBox={`-10 -10 ${svgWidth} ${svgWidth}`}
      >
        {renderDots("blue", radii[0])}
        {renderDots("red", radii[1], radii[0] - radii[1], radii[0] - radii[1])}
      </Svg>
      <View style={styles.centerContent}>
        <Text className="font-boldFont text-base pb-2">August 5</Text>
        <Text className="font-normalFont text-xs">Period in</Text>
        <Text className="font-boldFont text-2xl">10 days</Text>
        <TouchableOpacity className="bg-black mt-3 px-4 py-1 rounded-xl">
          <Text className="font-normalFont text-xs text-white">
            + Log it in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    padding: 4,
  },
  centerContent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeAnimation;
