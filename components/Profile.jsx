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
  <Image
    className="w-24 h-24"
    source={{
      uri: "https://thehuboncanal.org/wp-content/uploads/2016/11/FEMALE-PERSON-PLACEHOLDER.jpg",
    }}
  />
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

  const schemes = ["#222222", "#f2f2f2"];

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
        className="colors h-7 w-7 rounded-full"
        key={color}
        onPress={() => setThemeColor(color)}
        style={{
          marginBottom: Platform.OS == "android" ? 20 : 30,
          backgroundColor: `${color}`,
          border: "2px solid",
          borderColor: themeColor === color ? "#000000" : "",
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Light</Text>
        <Switch
          value={colorScheme === "#222222"} // Use the colorScheme value to set the initial state
          onValueChange={toggleColorMode}
        />
        <Text>Dark</Text>
      </View>
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
            style={styles.input}
            value={editedProfileData.username}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, username: text })
            }
          />
        ) : (
          <Text style={styles.username}>{editedProfileData.username}</Text>
        )}
        {editing ? (
          <TextInput
            style={styles.input}
            value={editedProfileData.bio}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, bio: text })
            }
            multiline
          />
        ) : (
          <Text style={styles.bio}>{editedProfileData.bio}</Text>
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          marginTop: 10,
        }}
      >
        {renderThemeColors()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
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
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
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
