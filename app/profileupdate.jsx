import React, { useState } from "react";
import { Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "./../hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomCalendar from "./../components/Calender";
import AddressForm from "./../components/Addresses";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function ProfileMenu() {
  const [fullName, setFullName] = useState("Marie Curie");
  const [dob, setDOB] = useState(new Date("1990-01-01"));
  const [state, setState] = useState("");
  const [cityRegion, setCityRegion] = useState("");
  const [address1, setAddress1] = useState("");
  const [firstDayLastPeriod, setFirstDayLastPeriod] = useState("");
  const [lastDayLastPeriod, setLastDayLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Function to enable editing
  const startEditing = () => {
    setIsEditing(true);
  };

  // Function to save changes and disable editing
  const saveChanges = () => {
    setIsEditing(false);
    // You can perform any additional logic to save the changes here
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setDOB(date);
    hideDatePicker();
  };

  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Logic to save changes to the user's profile
  };

  return (
    <SafeAreaView style={{ backgroundColor: colorScheme, flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colorScheme },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} style={{ marginRight: 15 }}>
              <Ionicons
                name="ios-chevron-back"
                size={28}
                color={colorScheme === "#121212" ? "white" : "black"}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Profile Update
            </Text>
          ),
        }}
      />
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text
            className="font-boldFont text-2xl"
            style={{
              marginBottom: 20,
              color: colorScheme === "#121212" ? "white" : "black",
            }}
          >
            Profile
          </Text>
          <Text
            className="font-boldFont text-lg"
            style={{
              marginTop: 20,
              marginBottom: 10,
              color: colorScheme === "#121212" ? "white" : "black",
            }}
          >
            Basic Information
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              color: colorScheme === "#121212" ? "white" : "black",
            }}
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor={`${
              colorScheme === "#121212" ? "white" : "black"
            }`}
            placeholder="Full Name"
            editable={isEditing}
            className="font-normalFont text-xs"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              color: colorScheme === "#121212" ? "white" : "black",
            }}
            value={dob.toDateString()}
            placeholderTextColor={`${
              colorScheme === "#121212" ? "white" : "black"
            }`}
            placeholder="Date of Birth"
            editable={false}
            className="font-normalFont text-xs"
          />
          <View className="flex justify-center items-center">
            {isEditing ? (
              <View className="flex flex-row justify-between gap-8">
                <TouchableOpacity
                  className="bg-blue-600 rounded-lg px-10 py-4"
                  onPress={showDatePicker}
                >
                  <Text className="font-mediumFont text-xs text-white">
                    Pick date
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-[#7b091c] rounded-lg px-10 py-4"
                  onPress={saveChanges}
                >
                  <Text className="font-mediumFont text-xs text-white">
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="bg-[#bd6379] rounded-lg px-10 py-4"
                onPress={startEditing}
              >
                <Text className="font-mediumFont text-xs text-white">Edit</Text>
              </TouchableOpacity>
            )}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <Text
            className="font-boldFont text-lg"
            style={{
              marginTop: 20,
              marginBottom: 10,
              color: colorScheme === "#121212" ? "white" : "black",
            }}
          >
            Addresses
          </Text>
          <AddressForm />
          <Text
            className="font-boldFont text-lg"
            style={{
              marginTop: 20,
              marginBottom: 10,
              color: colorScheme === "#121212" ? "white" : "black",
            }}
          >
            Dates
          </Text>
          <CustomCalendar />
          <Text
            className="font-boldFont text-lg"
            style={{
              marginTop: 20,
              marginBottom: 10,
              color: colorScheme === "#121212" ? "white" : "black",
            }}
          >
            Selected Items
          </Text>
          {selectedItems.map((item) => (
            <Text>{item}</Text>
          ))}
          <Button title="Add Item" onPress={() => {}} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {},
  subtitle: {},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
