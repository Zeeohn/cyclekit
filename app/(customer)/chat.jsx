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
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

  const navigation = useNavigation();

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

  const navigateToNotification = () => {
    navigation.navigate("notifications");
  };

  const notifications = "2";

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: themeColor }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colorScheme },
          headerLeft: () => <SearchBar />,
          headerRight: () => (
            <View className="right-4">
              <TouchableOpacity onPress={navigateToNotification}>
                <View className="relative">
                  <Ionicons
                    name="ios-notifications-sharp"
                    size={26}
                    color="#7b091c"
                  />
                  {notifications > 0 && (
                    <View className="absolute top-0 left-3 rounded-full h-5 w-5 items-center justify-center bg-red-900 border-2 border-white">
                      <Text className="font-normalFont text-white text-xs -mt-0.5 ">
                        {notifications}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "#7b091c"}`,
              }}
            >
              Chat
            </Text>
          ),
          headerTitleAlign: "center",
        }}
      />
      <View
        style={{
          borderColor: "#7b091c",
          borderWidth: 4,
          borderRadius: 10,
          padding: 2,
          backgroundColor: themeColor,
        }}
      >
        <FlatList
          data={chatData}
          renderItem={({ item }) => (
            <Message text={item.text} sender={item.sender} />
          )}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={{
            backgroundColor: themeColor,
            paddingBottom: 80,
          }}
        />
      </View>
    </KeyboardAwareScrollView>
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
