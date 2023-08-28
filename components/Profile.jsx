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

const DefaultProfilePhoto = () => (
  <View>
    <Image
      className="w-24 h-24 rounded-full"
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

  const schemes = ["#121212", "#f2f2f2"];

  const renderThemeColors = () => {
    const colorsArr = [
      "#7b091c",
      "#0c61e2",
      "#ffcc00",
      "#f36a34",
      "red",
      "pink",
      "green",
    ];

    return colorsArr.map((color) => (
      <TouchableOpacity
        className="colors h-7 w-7 rounded-full mb-5 mt-4"
        key={color}
        onPress={() => setThemeColor(color)}
        style={{
          backgroundColor: `${color}`,
          borderWidth: themeColor === color ? 3 : 0,
          borderColor:
            themeColor === color && colorScheme === "#121212"
              ? "#ffffff"
              : "#000000",
        }}
      ></TouchableOpacity>
    ));
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
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
          <Image style={styles.profilePhoto} source={{ uri: selectedImage }} />
        ) : (
          <DefaultProfilePhoto />
        )}
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        {editing ? (
          <TextInput
            className="font-normalFont text-xs"
            style={styles.input}
            value={editedProfileData.username}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, username: text })
            }
          />
        ) : (
          <Text
            className="font-boldFont text-xl"
            style={{
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
              marginBottom: 10,
            }}
          >
            {editedProfileData.username}
          </Text>
        )}
        {editing ? (
          <TextInput
            className="font-normalFont text-xs"
            style={styles.input}
            value={editedProfileData.bio}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, bio: text })
            }
            multiline
          />
        ) : (
          <Text
            style={{
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
              fontSize: 16,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {editedProfileData.bio}
          </Text>
        )}
        {editing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5,
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
