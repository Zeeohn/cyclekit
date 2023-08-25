import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { SvgUri } from "react-native-svg"; // Import SvgUri from react-native-svg
import * as ImagePicker from "expo-image-picker";

const DefaultProfilePhoto = () => (
  <SvgUri
    width="100"
    height="100"
    uri="https://example.com/default-profile-icon.svg" // Replace with your SVG icon URL
  />
);

const Profile = ({ profileData, onUpdateProfile }) => {
  const [editing, setEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState(profileData);
  const [selectedImage, setSelectedImage] = useState(profileData.profilePhoto);

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
