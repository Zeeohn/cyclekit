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
  Dimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Message from "./../../components/Message";
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
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  let height = Dimensions.get("window").height;
  // let height = Dimensions.get("window").height;
  height = height - 125;

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = {
        text: messageInput,
        sender: "Me",
        img: "",
      };
      setChatData([...chatData, newMessage]);
      setMessageInput(messageInput);
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colorScheme },
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
            <Text
              className="font-boldFont text-xl"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Chat
            </Text>
          ),
          headerTitleAlign: "center",
        }}
      />
      <View style={{ height: height }}>
        <FlatList
          data={chatData}
          renderItem={({ item }) => (
            <Message text={item.text} sender={item.sender} img={item.img} />
          )}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={{ backgroundColor: colorScheme }}
        />
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   // ... Your existing styles
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderColor: "#d4d4d4",
//     backgroundColor: "#ffffff",
//   },
//   // ... Other styles
// });
