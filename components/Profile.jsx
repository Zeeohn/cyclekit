import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { SvgUri } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import Slider from "@react-native-community/slider";
import { useThemeColor } from "../hooks/useThemeColor";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ColorPicker } from "react-native-color-picker";

const DefaultProfilePhoto = ({ profilePhoto }) => (
  <View>
    <Image
      className="w-48 h-48 rounded-full"
      source={{
        uri: "https://thehuboncanal.org/wp-content/uploads/2016/11/FEMALE-PERSON-PLACEHOLDER.jpg",
      }}
    />
  </View>
);

const avatars = [
  require("../assets/images/avatar-1.png"),
  require("../assets/images/avatar-2.png"),
  require("../assets/images/avatar-3.png"),
  require("../assets/images/avatar-4.png"),
  require("../assets/images/avatar-5.png"),
  require("../assets/images/avatar-6.png"),
  require("../assets/images/avatar-7.png"),
  require("../assets/images/avatar-8.png"),
  require("../assets/images/avatar-9.png"),
  require("../assets/images/avatar-10.png"),
  require("../assets/images/avatar-11.png"),
  require("../assets/images/avatar-12.png"),
  require("../assets/images/avatar-13.png"),
  require("../assets/images/avatar-14.png"),
];

const colors = [
  "#FF5733",
  "#FFC300",
  "#33FF57",
  "#33C6FF",
  "#9A33FF",
  "#FF33E9",
  "#33FFC6",
  "#3340FF",
  "#33FF9A",
];

const Profile = ({ profileData, onUpdateProfile }) => {
  const [editing, setEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState(profileData);
  const [selectedImage, setSelectedImage] = useState(profileData.profilePhoto);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState("avatar");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");

  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  const handleImageUpload = async () => {
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

  const handleSave = () => {
    onUpdateProfile(editedProfileData, selectedImage);
    setEditing(false);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setAvatarModalVisible(false);
    setColorModalVisible(true);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setColorModalVisible(false);
    setSelectedImage(null);
    onUpdateProfile(
      { ...profileData, profilePhoto: selectedAvatar },
      selectedColor
    );
    setEditing(false);
  };

  const handleAvatarColorSelect = (avatar, color) => {
    setSelectedAvatar(avatar);
    setSelectedColor(color);
    setAvatarColorModalVisible(false);
    onUpdateProfile({ ...profileData, profilePhoto: avatar }, color);
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <View>
        {selectedImage ? (
          <View>
            <Image
              style={styles.profilePhoto}
              source={{ uri: selectedImage }}
            />
          </View>
        ) : selectedAvatar ? (
          <View
            className="rounded-full"
            style={{ backgroundColor: selectedColor }}
          >
            <Image
              source={selectedAvatar}
              className="w-48 h-48 rounded-full"
              resizeMode="contain"
            />
          </View>
        ) : (
          <View>
            <DefaultProfilePhoto profilePhoto={profileData.profilePhoto} />
          </View>
        )}
      </View>
      <View className="flex flex-row gap-4 justify-between mt-4 p-2">
        <TouchableOpacity
          className="bg-[#7b091c] px-4 py-4 rounded-lg"
          onPress={() => setAvatarModalVisible(true)}
        >
          <Text className="font-mediumFont text-xs text-white">
            Choose Avatar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#7b091c] px-4 py-4 rounded-lg"
          onPress={handleImageUpload}
        >
          <Text className="font-mediumFont text-xs text-white">
            Upload Picture
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={avatarModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View
          className="flex flex-col flex-1 items-center p-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <View className="flex flex-1 flex-col items-center justify-center w-full border-2 rounded-xl p-2 h-[80%] bg-white">
            <View className="items-end left-36 mb-4">
              <AntDesign
                name="close"
                size={22}
                color="white"
                onPress={() => setAvatarModalVisible(false)}
                style={{
                  backgroundColor: `${themeColor}`,
                  borderRadius: 50,
                  padding: 4,
                }}
              />
            </View>
            <Text className="font-boldFont text-lg text-center -mt-8">
              Choose Avatar
            </Text>
            <FlatList
              data={avatars}
              keyExtractor={(item) => item.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="items-center m-2"
                  onPress={() => handleAvatarSelect(item)}
                >
                  <Image className="w-24 h-24 rounded-full" source={item} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      <Modal
        visible={colorModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View
          className="flex flex-col flex-1 items-center p-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <View className="flex flex-1 flex-col items-center justify-center w-full border-2 rounded-xl p-2 h-[80%] bg-white">
            <View className="items-end left-36 mb-4">
              <AntDesign
                name="close"
                size={22}
                color="white"
                onPress={() => setColorModalVisible(false)}
                style={{
                  backgroundColor: `${themeColor}`,
                  borderRadius: 50,
                  padding: 4,
                }}
              />
            </View>
            <Text className="font-boldFont text-lg text-center -mt-4">
              Choose Background Color
            </Text>
            <FlatList
              data={colors}
              keyExtractor={(item) => item}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="w-24 h-24 rounded-lg m-4 items-center justify-center"
                  style={[styles.colorOption, { backgroundColor: item }]}
                  onPress={() => handleColorSelect(item)}
                />
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.detailsContainer}>
        <Text
          className="font-boldFont text-xl"
          style={{
            color: `${colorScheme === "#121212" ? "white" : "black"}`,
            marginBottom: 10,
          }}
        >
          {editedProfileData.username}
        </Text>
        <Text
          className="font-boldFont text-xl"
          style={{
            color: `${colorScheme === "#121212" ? "white" : "black"}`,
            marginBottom: 20,
          }}
        >
          {editedProfileData.bio}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 4,
    borderRadius: 12,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingTop: 1,
  },
  username: {
    fontSize: 20,
    marginBottom: 10,
  },
  bio: {
    textAlign: "center",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#27ae60",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Profile;
