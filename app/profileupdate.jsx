import React, { useState } from "react";
import { Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "./../hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
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
  const [dob, setDOB] = useState("1990-01-01");
  const [state, setState] = useState("");
  const [cityRegion, setCityRegion] = useState("");
  const [address1, setAddress1] = useState("");
  const [firstDayLastPeriod, setFirstDayLastPeriod] = useState("");
  const [lastDayLastPeriod, setLastDayLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

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
      <ScrollView>
        <View style={styles.container}>
          <Text
            className="font-boldFont text-2xl"
            style={{
              marginBottom: 20,
            }}
          >
            Profile
          </Text>
          <Text
            className="font-boldFont text-lg"
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Basic Information
          </Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
          />
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDOB}
            placeholder="Date of Birth"
          />
          <Button title="Upload Picture" onPress={() => {}} />
          <Text
            className="font-boldFont text-lg"
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Addresses
          </Text>
          <TextInput
            style={styles.input}
            value={state}
            onChangeText={setState}
            placeholder="State"
          />
          <TextInput
            style={styles.input}
            value={cityRegion}
            onChangeText={setCityRegion}
            placeholder="City / Region"
          />
          <TextInput
            style={styles.input}
            value={address1}
            onChangeText={setAddress1}
            placeholder="Address 1"
          />
          <Button title="Add Address" onPress={() => {}} />
          <Text
            className="font-boldFont text-lg"
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Dates
          </Text>
          <TextInput
            style={styles.input}
            value={firstDayLastPeriod}
            onChangeText={setFirstDayLastPeriod}
            placeholder="First day of your last period?"
          />
          <TextInput
            style={styles.input}
            value={lastDayLastPeriod}
            onChangeText={setLastDayLastPeriod}
            placeholder="Last day of your last period?"
          />
          <TextInput
            style={styles.input}
            value={cycleLength}
            onChangeText={setCycleLength}
            placeholder="How long is your cycle?"
          />
          <Button title="Save" onPress={() => {}} />
          <Text
            className="font-boldFont text-lg"
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Selected Items
          </Text>
          {selectedItems.map((item) => (
            <Text>{item}</Text>
          ))}
          <Button title="Add Item" onPress={() => {}} />
        </View>
      </ScrollView>
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
