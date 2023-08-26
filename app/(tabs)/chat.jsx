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
import { Ionicons } from "@expo/vector-icons";
import Message from "./../../components/Message"; // Make sure to import the correct path for your Message component.

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

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = {
        text: messageInput,
        sender: "me",
        img: "my_image_url",
      };
      setChatData([...chatData, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ios-notifications-sharp" size={24} color="black" />
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={{ width: 24 }} />
      </View>
      <KeyboardAvoidingView style={styles.chatContainer} behavior="padding">
        <FlatList
          data={chatData}
          renderItem={({ item }) => (
            <Message text={item.text} sender={item.sender} img={item.img} />
          )}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={messageInput}
            onChangeText={setMessageInput}
            placeholder="Type your message"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
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
