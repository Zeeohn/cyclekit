import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Habeeb SFT");
  const [business, setBusiness] = useState("Skyfig Technologies");
  const [phone, setPhone] = useState("08123456789");
  const [address, setAddress] = useState("123 Main St, Lagos State");
  const [bank, setBank] = useState("Access Bank 01128383846 Habeeb SFT");

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleImageUpload = () => {};

  return (
    <ScrollView>
      <View className="flex flex-1 mx-6 mb-24">
        <View className="items-center">
          <View className="flex">
            <View className="rounded-full border-4 p-3 border-black">
              <View className="rounded-full w-36 h-36 justify-center items-center overflow-hidden">
                <Image
                  source={require("../assets/images/profile.png")}
                  className="w-36 h-36"
                />
              </View>
            </View>
            <View className="left-36 -top-5">
              <TouchableOpacity onPress={handleImageUpload}>
                <FontAwesome name="edit" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="font-normalFont">Profile Picture</Text>
        </View>
        <View className="flex flex-row justify-between mt-4">
          <Text className="text-[#7b091c] font-boldFont text-sm text-left">
            Vendor Info
          </Text>
          <TouchableOpacity onPress={toggleEditing}>
            <FontAwesome name="edit" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View className="mt-4 mb-2">
          <Text className="text-sm font-normalFont">Full Name</Text>
          <TextInput
            className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
            value={name}
            editable={isEditing}
            onChangeText={(text) => setName(text)}
          />
          <Text className="text-sm font-normalFont">Business Name</Text>
          <TextInput
            className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
            value={business}
            editable={isEditing}
            onChangeText={(text) => setBusiness(text)}
          />
          <Text className="text-sm font-normalFont">Phone</Text>
          <TextInput
            className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
            value={phone}
            editable={isEditing}
            onChangeText={(text) => setPhone(text)}
          />
          <Text className="text-sm font-normalFont">Address</Text>
          <TextInput
            className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
            value={address}
            editable={isEditing}
            onChangeText={(text) => setAddress(text)}
          />
          <Text className="text-sm font-normalFont">Bank Details</Text>
          <TextInput
            className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
            value={bank}
            editable={isEditing}
            onChangeText={(text) => setBank(text)}
          />
        </View>

        {isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={toggleEditing}>
            <Text style={styles.editButtonText}>Save Changes</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#7b091c", // Edit button background color
    borderRadius: 20,
    padding: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "#7b091c", // Edit button background color
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VendorProfile;
