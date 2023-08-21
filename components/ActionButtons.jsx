import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Fontisto, FontAwesome5, Entypo, Foundation } from "@expo/vector-icons";

const ActionButtons = () => {
  return (
    <View className="flex-column p-4 rounded-lg bg-primary mt-2 mx-2 justify-center items-center">
      <View className="flex-row gap-4 justify-between mb-4 ">
        <TouchableOpacity className="w-36 h-24 rounded-md border bg-white justify-center items-center border-white ">
          <Fontisto name="shopping-bag-1" size={24} color="black" />
          <Text className="font-boldFont text-base text-center">Shop Now</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-36 h-24 rounded-md border bg-white justify-center items-center border-white">
          <FontAwesome5 name="gift" size={24} color="black" />
          <Text className="font-boldFont text-base text-center">Subscribe</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full h-[1] bg-gray2 mb-4" />
      <View className="flex-row gap-4 justify-between mb-1">
        <View className="w-36 h-24 rounded-md border bg-white justify-center items-center border-white">
          <Entypo name="cycle" size={24} color="black" />
          <Text className="font-boldFont text-base text-center">
            Available Total Cycle
          </Text>
        </View>
        <View className="w-36 h-24 rounded-md border bg-white justify-center items-center border-white">
          <Foundation name="download" size={24} color="black" />
          <Text className="font-boldFont text-base text-center">
            Total Cycle Received
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActionButtons;
