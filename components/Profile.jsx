import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
} from "react-native";
import { SvgUri } from "react-native-svg"; // Import SvgUri from react-native-svg
import * as ImagePicker from "expo-image-picker";
import { useThemeColor } from "../hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

const DefaultProfilePhoto = () => (
  <View>
    <Image
      className="w-48 h-48 rounded-full"
      source={{
        uri: "https://thehuboncanal.org/wp-content/uploads/2016/11/FEMALE-PERSON-PLACEHOLDER.jpg",
      }}
    />
  </View>
);

const Profile = ({ profileData, onUpdateProfile }) => {
  const [editing, setEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState(profileData);
  const [selectedImage, setSelectedImage] = useState(profileData.profilePhoto);
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageUpload}>
        {selectedImage ? (
          <View>
            <Image
              style={styles.profilePhoto}
              source={{ uri: selectedImage }}
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={handleImageUpload}
            >
              <Ionicons name="ios-pencil" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <DefaultProfilePhoto />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={handleImageUpload}
            >
              <Ionicons name="ios-pencil" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
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
