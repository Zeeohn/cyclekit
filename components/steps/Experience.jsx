import { View, Text, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { StepperContext } from "./../../contexts/StepperContext";

export default function Experience() {
  const { userData, setUserData } = useContext(StepperContext);

  const [periodCycle, setPeriodCycle] = useState(12);
  const [selectedFlow, setSelectedFlow] = useState("Normal");
  const [selectedSize, setSelectedSize] = useState("Small");
  const [isFirstDatePickerVisible, setFirstDatePickerVisibility] =
    useState(false);
  const [isLastDatePickerVisible, setLastDatePickerVisibility] =
    useState(false);

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const numbers = [];
  for (let i = 12; i <= 50; i++) {
    numbers.push(i);
  }

  const showFirstDatePicker = () => {
    setFirstDatePickerVisibility(true);
  };

  const showLastDatePicker = () => {
    setLastDatePickerVisibility(true);
  };

  const hideFirstDatePicker = () => {
    setFirstDatePickerVisibility(false);
  };

  const hideLastDatePicker = () => {
    setLastDatePickerVisibility(false);
  };

  const handleFirstDateConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setUserData({ ...userData, period_first_date: formattedDate });
    hideFirstDatePicker();
  };

  const handleLastDateConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setUserData({ ...userData, period_last_date: formattedDate });
    hideLastDatePicker();
  };

  return (
    <View className="p-4 rounded-xl border border-gray-300 flex flex-col">
      <View className="mt-4">
        <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
          Period Cycle
        </Text>
        <View className="border flex-1 rounded-md font-normalFont border-black text-sm">
          <Picker
            selectedValue={periodCycle}
            onValueChange={(itemValue) => setPeriodCycle(itemValue)}
          >
            {numbers.map((number) => (
              <Picker.Item
                label={number.toString()}
                value={number}
                key={number}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View className="mt-4">
        <Text className="font-mediumFont text-base pb-1 text-[#7b091c]">
          First day of last period
        </Text>
        <TextInput
          value={userData.period_first_date}
          className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
          onFocus={showFirstDatePicker}
          style={{
            borderColor: "black",
            color: "black",
          }}
        />
        <DateTimePickerModal
          isVisible={isFirstDatePickerVisible}
          mode="date"
          onConfirm={handleFirstDateConfirm}
          onCancel={hideFirstDatePicker}
        />
      </View>
      <View className="mt-4">
        <Text className="font-mediumFont text-base pb-1 text-[#7b091c]">
          Last day of last period
        </Text>
        <TextInput
          value={userData.period_last_date}
          className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
          onFocus={showLastDatePicker}
          style={{
            borderColor: "black",
            color: "black",
          }}
        />
        <DateTimePickerModal
          isVisible={isLastDatePickerVisible}
          mode="date"
          onConfirm={handleLastDateConfirm}
          onCancel={hideLastDatePicker}
        />
      </View>
      <View className="mt-4">
        <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
          Experience
        </Text>
        <View className="border flex-1 rounded-md font-normalFont border-black text-sm">
          <Picker
            selectedValue={selectedFlow}
            onValueChange={(itemValue) => setSelectedFlow(itemValue)}
          >
            <Picker.Item label="Normal Flow" value="Normal" />
            <Picker.Item label="Heavy Flow" value="Heavy" />
          </Picker>
        </View>
      </View>
      <View className="mt-4">
        <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
          Panty Size
        </Text>
        <View className="border flex-1 rounded-md font-normalFont border-black text-sm">
          <Picker
            selectedValue={selectedSize}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
          >
            <Picker.Item label="Small" value="Small" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Large" value="Large" />
            <Picker.Item label="X Large" value="X Large" />
            <Picker.Item label="XX Large" value="XX Large" />
          </Picker>
        </View>
      </View>
    </View>
  );
}
