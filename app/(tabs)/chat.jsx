import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Message from "./../../components/Message"; // Make sure to import the correct path for your Message component.
import { useThemeColor } from "./../../hooks/useThemeColor";
import SearchBar from "./../../components/SearchBar";

const DATA_MESSAGES = [
  {
    text: "Hello!",
    sender: "friend",
    img: "image_url",
  },
  // More chat data...
];

export default function Chat() {
  const [messageInput, setMessageInput] = useState("");
  const [chatData, setChatData] = useState(DATA_MESSAGES);
  const { themeColor, setThemeColor } = useThemeColor();

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = {
        text: messageInput,
        sender: "me",
        img: "my_image_url",
      };
      setChatData([...chatData, newMessage]);
      setMessageInput(messageInput);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerLeft: () => <SearchBar />,
          headerRight: () => (
            <View className="mr-6">
              <Ionicons
                name="ios-notifications-sharp"
                size={26}
                color={themeColor}
              />
            </View>
          ),
          headerTitle: () => (
            <Text className="font-boldFont text-xl">Chat</Text>
          ),
          headerTitleAlign: "center",
        }}
      />
      <KeyboardAvoidingView style={styles.chatContainer} behavior="padding">
        <FlatList
          data={chatData}
          renderItem={({ item }) => (
            <Message text={item.text} sender={item.sender} img={item.img} />
          )}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.messageList}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... Your existing styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#d4d4d4",
    backgroundColor: "#ffffff",
  },
  // ... Other styles
});
