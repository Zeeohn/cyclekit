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
import * as ImagePicker from "expo-image-picker";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { axios } from "axios";

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Habeeb SFT");
  const [business, setBusiness] = useState("Skyfig Technologies");
  const [phone, setPhone] = useState("08123456789");
  const [address, setAddress] = useState("123 Main St, Lagos State");
  const [bank, setBank] = useState("Access Bank 01128383846 Habeeb SFT");
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const getToken = async () => {
    let token = await AsyncStorage.getItem("authToken");
    if (!token) {
      await router.replace("/vlogin");
    }
    return token;
  };

  let config = {
    method: "get",
    url: "https://dev.cyclekits.ng/api/vendor/logout?logout_other_devices=true",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };

  const handleLogout = async () => {
    try {
      const role = await AsyncStorage.getItem("role");
      axios(config)
        .then(async (response) => {
          const data = response.data;
          console.log(data);
          await AsyncStorage.removeItem("authToken");
          if (role == "vendor") {
            await router.replace("/vlogin");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const validationErrors = error.response.data.errors;
            const errorMessages = Object.values(validationErrors)
              .flat() // Flatten the error messages array
              .join("\n"); // Join error messages with newlines

            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "Oh-Uh",
              button: "Ok",
              textBody: errorMessages,
            });
            console.log("Error Status:", error.response.status);
            console.log("Error Headers:", error.response.headers);
          } else if (error.request) {
            console.log("Request Error:", error.request);
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "Oh-Uh",
              button: "Ok",
              textBody: `An unexpected error occurred!`,
            });
          }
        });
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Oh-Uh",
        button: "Ok",
        textBody: `An unexpected error occurred!`,
      });
    }
  };

  const handleImageUpload = async () => {
    setIsEditing(!isEditing);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View className="flex flex-1 mx-6 mb-24">
        <View className="items-center">
          <View className="flex">
            <View className="rounded-full border-4 p-3 border-black">
              <View className="rounded-full w-36 h-36 justify-center items-center overflow-hidden">
                {selectedImage ? (
                  <Image
                    className="w-36 h-36"
                    source={{ uri: selectedImage }}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/profile.png")}
                    className="w-36 h-36"
                  />
                )}
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

        <View className="items-center mt-7">
          <TouchableOpacity
            className="px-4 py-3 bg-[#7b091c] items-center justify-center rounded-lg"
            onPress={handleLogout}
          >
            <Text className="font-mediumFont text-white text-base">
              Log out
            </Text>
          </TouchableOpacity>
        </View>
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
