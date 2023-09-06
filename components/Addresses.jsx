import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "./../hooks/useThemeColor";

const AddressForm = () => {
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      state: "State 1",
      cityRegion: "City 1",
      address1: "Address 1",
      isMain: true,
      isEditing: false,
    },
    {
      id: 2,
      state: "State 2",
      cityRegion: "City 2",
      address1: "Address 2",
      isMain: false,
      isEditing: false,
    },
    {
      id: 3,
      state: "State 3",
      cityRegion: "City 3",
      address1: "Address 3",
      isMain: false,
      isEditing: false,
    },
  ]);

  const addAddress = () => {
    if (addresses.length < 3) {
      const newAddress = {
        id: addresses.length + 1,
        state: "",
        cityRegion: "",
        address1: "",
        isMain: false,
        isEditing: true,
      };
      setAddresses([...addresses, newAddress]);
    }
  };

  const handleAddressChange = (id, field, value) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id ? { ...address, [field]: value } : address
      )
    );
  };

  const toggleEditAddress = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id
          ? { ...address, isEditing: !address.isEditing }
          : address
      )
    );
  };

  const toggleMainAddress = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id
          ? { ...address, isMain: !address.isMain }
          : { ...address, isMain: false }
      )
    );
  };

  return (
    <View className="flex-1">
      {addresses.map((address) => (
        <View key={address.id}>
          <Text
            className="font-mediumFont text-base pb-2"
            style={{
              marginTop: 20,
              color: colorScheme === "#121212" ? "white" : "black",
            }}
          >
            Address {address.id}
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
            value={address.state}
            onChangeText={(text) =>
              handleAddressChange(address.id, "state", text)
            }
            className="font-normalFont text-xs"
            placeholderTextColor={colorScheme === "#121212" ? "white" : "black"}
            placeholder="State"
            editable={address.isEditing}
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
            value={address.cityRegion}
            onChangeText={(text) =>
              handleAddressChange(address.id, "cityRegion", text)
            }
            className="font-normalFont text-xs"
            placeholderTextColor={colorScheme === "#121212" ? "white" : "black"}
            placeholder="City / Region"
            editable={address.isEditing}
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
            value={address.address1}
            onChangeText={(text) =>
              handleAddressChange(address.id, "address1", text)
            }
            className="font-normalFont text-xs"
            placeholderTextColor={colorScheme === "#121212" ? "white" : "black"}
            placeholder="Address "
            editable={address.isEditing}
          />
          <View className="flex flex-row justify-between">
            {address.isEditing ? (
              <TouchableOpacity
                className="bg-[#7b091c] rounded-lg px-10 py-4"
                onPress={() => toggleEditAddress(address.id)}
              >
                <Text className="font-mediumFont text-xs text-white">Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-[#bd6379] rounded-lg px-10 py-4"
                onPress={() => toggleEditAddress(address.id)}
              >
                <Text className="font-mediumFont text-xs text-white">Edit</Text>
              </TouchableOpacity>
            )}
            {address.isMain ? (
              <TouchableOpacity
                className="bg-[#7b091c] rounded-lg px-12 py-4"
                onPress={() => toggleMainAddress(address.id)}
              >
                <Text className="font-mediumFont text-xs text-white">
                  Main Address
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-blue-600 rounded-lg px-8 py-4"
                onPress={() => toggleMainAddress(address.id)}
              >
                <Text className="font-mediumFont text-xs text-white">
                  Set as Main Address
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
      {addresses.length < 3 && (
        <Button title="Add Address" onPress={addAddress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {},
  input: {},
});

export default AddressForm;
