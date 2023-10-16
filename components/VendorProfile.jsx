import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import axios from "axios";
import Loader from "./Loader";

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logoutOtherDevices, setLogoutOtherDevices] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();

        const config = {
          method: "get",
          url: "https://dev.cyclekits.ng/api/vendor/profile",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios(config);

        const userData = response.data;

        setName(userData.data.full_name);
        setBusiness(userData.data.business_name);
        setPhone(userData.data.phone);
        setEmail(userData.data.email);

        await AsyncStorage.setItem("vendor_id", `${userData.data.vendor_id}`);

        if (userData.profile_image) {
          setSelectedImage(userData.profile_image);
        }

        setLoading(false);

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Profile data loaded successfully.",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);

        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Oh-Uh",
          button: "Ok",
          textBody: "Failed to fetch profile data. Please try again.",
        });
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");

      if (!oldPassword || !newPassword || !confirmPassword) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Oh-Uh",
          button: "Ok",
          textBody: "All password fields are required, check and try again!",
        });
        setLoading(false);
        return;
      }

      if (confirmPassword !== newPassword) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Oh-Uh",
          button: "Ok",
          textBody: "Confirm your passwords and try again!",
        });
        setLoading(false);
        return;
      }

      const data = {
        old_password: oldPassword,
        new_password: newPassword,
        logout_all_devices: logoutOtherDevices,
      };

      const config = {
        method: "post",
        url: "https://dev.cyclekits.ng/api/vendor/change-password",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);

      if (response.data.status) {
        setOldPassword("");
        setNewPassword("");
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Password updated successfully.",
        });
        await AsyncStorage.removeItem("authToken");
        setLoading(false);
        await router.replace("/vlogin");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
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
        setLoading(false);
        console.log("Error Status:", error.response.status);
        console.log("Error Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request Error:", error.request);
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const role = await AsyncStorage.getItem("role");
      const token = await getToken();

      let data = {
        logout_other_devices: false,
      };

      let config = {
        method: "get",
        url: "https://dev.cyclekits.ng/api/vendor/logout",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(async (response) => {
          const data = response.data;
          console.log(data);
          await AsyncStorage.removeItem("authToken");
          if (role == "vendor") {
            await router.replace("/vlogin");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            console.log(error.response.data);
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
            setLoading(false);
            console.log("Error Status:", error.response.status);
            console.log("Error Headers:", error.response.headers);
          } else if (error.request) {
            console.log("Request Error:", error.request);
            setLoading(false);
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "Oh-Uh",
              button: "Ok",
              textBody: `An unexpected error occurred!`,
            });
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Oh-Uh",
        button: "Ok",
        textBody: `An unexpected error occurred!`,
      });
    }
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      try {
        const token = await getToken();

        let data = new FormData();
        data.append("profile_image", result.assets[0].uri);

        const config = {
          method: "post",
          url: "https://dev.cyclekits.ng/api/vendor/upload-photo",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };

        setLoading(true);
        const response = await axios(config);
        const picture = response.data;

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Profile picture uploaded successfully.",
        });
        setLoading(false);
      } catch (error) {
        console.log("Error uploading profile picture!", error);

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
          setLoading(false);
          console.log("Error Status:", error.response.status);
          console.log("Error Headers:", error.response.headers);
        } else if (error.request) {
          console.log("Request Error:", error.request);
          setLoading(false);
        }

        // Dialog.show({
        //   type: ALERT_TYPE.DANGER,
        //   title: "Oh-Uh",
        //   button: "Ok",
        //   textBody: "Failed to upload profile picture. Please try again.",
        // });
      }
    }
  };

  return (
    <>
      {loading ? (
        <View className="flex flex-1">
          <Loader />
        </View>
      ) : (
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
                minLength={3}
                maxLength={50}
                onChangeText={(text) => setName(text)}
              />
              <Text className="text-sm font-normalFont">Business Name</Text>
              <TextInput
                className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
                value={business}
                editable={isEditing}
                minLength={3}
                maxLength={70}
                onChangeText={(text) => setBusiness(text)}
              />
              <Text className="text-sm font-normalFont">Email</Text>
              <TextInput
                className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
                value={email}
                editable={isEditing}
                minLength={3}
                maxLength={70}
                onChangeText={(text) => setEmail(text)}
              />
              <Text className="text-sm font-normalFont">Phone</Text>
              <TextInput
                className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
                value={phone}
                editable={isEditing}
                minLength={11}
                maxLength={11}
                onChangeText={(text) => setPhone(text)}
              />
              <Text className="text-sm font-normalFont">Address</Text>
              <TextInput
                className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
                value={address}
                editable={isEditing}
                minLength={3}
                maxLength={100}
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
              <TouchableOpacity
                style={styles.editButton}
                onPress={toggleEditing}
              >
                <Text style={styles.editButtonText}>Save Changes</Text>
              </TouchableOpacity>
            ) : null}

            <View className="flex mt-4">
              <Text className="text-[#7b091c] font-boldFont text-sm text-left mb-4">
                Password Update
              </Text>
              <Text className="text-sm font-normalFont">Old Password</Text>
              <TextInput
                className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
                value={oldPassword}
                secureTextEntry={true}
                onChangeText={(text) => setOldPassword(text)}
              />
              <Text className="text-sm font-normalFont">New Password</Text>
              <TextInput
                className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
                value={newPassword}
                minLength={6}
                secureTextEntry={true}
                onChangeText={(text) => setNewPassword(text)}
              />
              <Text className="text-sm font-normalFont">
                Confirm New Password
              </Text>
              <TextInput
                className="rounded-lg border border-gray-300 font-normalFont text-base text-black px-3 mb-4 py-3"
                value={confirmPassword}
                secureTextEntry={true}
                minLength={6}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <View className="flex flex-row items-center justify-start gap-4">
                <Text className="font-mediumFont ">
                  Logout from all devices
                </Text>
                <Switch
                  value={logoutOtherDevices}
                  onValueChange={() =>
                    setLogoutOtherDevices(!logoutOtherDevices)
                  }
                />
              </View>
              <View className="flex items-center justify-center">
                <TouchableOpacity
                  className="rounded-md py-3 px-8 bg-[#7b091c]"
                  onPress={handleSubmit}
                >
                  <Text className="font-mediumFont text-white">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-10">
              <Text className="text-[#7b091c] font-boldFont text-sm text-left mb-4">
                Other Settings
              </Text>
            </View>
            <View className="items-center mt-2">
              <TouchableOpacity
                className="px-8 py-3 bg-[#7b091c] items-center justify-center rounded-lg"
                onPress={handleLogout}
              >
                <Text className="font-mediumFont text-white">Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
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
