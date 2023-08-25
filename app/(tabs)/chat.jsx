import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
/* import Message from "./../../components/Message";
 */

const DATA_MESSAGES = [
  {
    text: "",
    sender: "",
    img: "",
  },
];

export default function chat() {
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerRight: () => (
            <View style={styles.headerIcon}>
              <Ionicons
                name="ios-notifications-sharp"
                size={24}
                color="black"
              />
            </View>
          ),
          headerTitle: () => <Text style={styles.headerTitle}>Chat</Text>,
        }}
      />
      <View style={styles.chatContainer}>
        <FlatList
          data={DATA_MESSAGES[0].chats}
          renderItem={({ item }) => (
            <ChatMessage text={item.text} sender={item.sender} img={item.img} />
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerIcon: {
    marginRight: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  chatContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  messageList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 4,
  },
  myMessage: {
    justifyContent: "flex-end",
  },
  friendMessage: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageText: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#d4d4d4",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAEAEA",
  },
});
