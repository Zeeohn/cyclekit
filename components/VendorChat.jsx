import React, { useState } from "react";
import { Button, View } from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Time,
} from "react-native-gifted-chat";
// import { DocumentPicker } from "react-native-document-picker";
import { ImagePicker } from "react-native-image-picker";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const VendorChat = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hello User",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Receiver",
      },
    },
    {
      _id: 2,
      text: "Hello Vendor",
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "Sender",
      },
    },
  ]);

  //   const selectOneFile = async () => {
  //     //Opening Document Picker for selection of one file
  //     try {
  //       const result = await Document.pick({
  //         type: [DocumentPicker.types.allFiles],
  //       });

  //       // Setting the state to show single file attributes
  //       setMessages([...messages, { file: result }]);
  //     } catch (err) {
  //       // Handling any exception (if any)
  //       if (DocumentPicker.isCancel(err)) {
  //         // If user canceled the document selection
  //         alert("Canceled from single doc picker");
  //       } else {
  //         // For Unknown Error
  //         alert("Unknown Error: " + JSON.stringify(err));
  //         throw err;
  //       }
  //     }
  //   };

  const selectOneImage = () => {
    // Open Image Picker:
    ImagePicker.showImagePicker((response) => {
      if (response.didCancel) {
        alert("User cancelled image picker");
      } else if (response.error) {
        alert("ImagePicker Error: ", response.error);
      } else {
        // Send the image message
        setMessages([
          ...messages,
          {
            image: response.uri,
            user: { _id: 1 }, // Set the user ID of the sender
          },
        ]);
      }
    });
  };

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#f4f4f4", // White background for receiver's messages
          },
          right: {
            backgroundColor: "gray", // White background for sender's messages
          },
        }}
        textStyle={{
          left: {
            color: "black", // Text color for receiver's messages
          },
          right: {
            color: "white", // Text color for sender's messages
          },
        }}
      />
    );
  }

  function renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white", // Background color of the input bar
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          marginTop: 20,
        }}
        primaryStyle={{ alignItems: "center", flexDirection: "row-reverse" }}
      />
    );
  }

  function renderComposer(props) {
    return (
      <Composer
        {...props}
        placeholder="Type a message..." // Custom placeholder text
        textInputStyle={{
          // Style for the text input
          backgroundColor: "white",
          borderRadius: 20,
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
        multiline={true} // Allow multiline input
      />
    );
  }

  function renderTime(props) {
    return (
      <Time
        {...props}
        textStyle={{
          left: {
            color: "white", // Text color for receiver's message time
          },
          right: {
            color: "white", // Text color for sender's message time
          },
        }}
      />
    );
  }

  function onSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => onSend(newMessage)}
      user={{ _id: 1 }}
      renderActions={() => (
        <View className="flex flex-row gap-3 p-2">
          <MaterialCommunityIcons
            name="image-plus"
            size={24}
            color="black"
            onPress={selectOneImage}
          />
          <FontAwesome
            name="send"
            size={24}
            color="black"
            onPress={() => {
              // Handle sending the message
              const newMessage = [{ text: messages[0].text, user: { _id: 1 } }];
              onSend(newMessage);
            }}
          />
        </View>
      )}
      renderBubble={renderBubble}
      renderTime={renderTime}
      renderAvatar={() => null}
      renderInputToolbar={renderInputToolbar}
      renderComposer={renderComposer}
    />
  );
};

export default VendorChat;
