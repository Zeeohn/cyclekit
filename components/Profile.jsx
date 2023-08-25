import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ username, profilePhoto, onUpdateProfile }) => {
  const [selectedImage, setSelectedImage] = useState(profilePhoto);

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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageUpload}>
        <Image
          style={styles.profilePhoto}
          source={{ uri: selectedImage }}
        />
      </TouchableOpacity>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => onUpdateProfile(username, selectedImage)}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
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
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Profile;
