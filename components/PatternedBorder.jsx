import React from "react";
import { View } from "react-native";
import Svg, { Pattern, Rect } from "react-native-svg";

const PatternedBorder = () => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100">
      <Pattern
        id="pattern"
        patternUnits="userSpaceOnUse"
        width="10"
        height="10"
      >
        {/* Adjust the pattern */}
        <Rect width="10" height="10" fill="pink" />
      </Pattern>
      <Rect width="100%" height="100%" fill="url(#pattern)" />
    </Svg>
  );
};

export default PatternedBorder;
