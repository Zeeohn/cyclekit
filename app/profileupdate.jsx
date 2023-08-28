import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ProfileMenu() {
  const [fullName, setFullName] = useState("John Doe");
  const [dob, setDOB] = useState("1990-01-01");
  const [state, setState] = useState("");
  const [cityRegion, setCityRegion] = useState("");
  const [address1, setAddress1] = useState("");
  const [firstDayLastPeriod, setFirstDayLastPeriod] = useState("");
  const [lastDayLastPeriod, setLastDayLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSave = () => {
    // Logic to save changes to the user's profile
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Basic Information</Text>
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
        <Text style={styles.subtitle}>Addresses</Text>
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
        <Text style={styles.subtitle}>Dates</Text>
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
        <Text style={styles.subtitle}>Selected Items</Text>
        {selectedItems.map((item) => (
          <Text>{item}</Text>
        ))}
        <Button title="Add Item" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
