import React from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { FontAwesome } from "@expo/vector-icons";

const DATA_MESSAGES = [
  {
    id: 0,
    frnName: "Daniel Emmanuel",
    chats: [
      {
        id: 1,
        text: "Hi",
        sender: "Daniel Emmanuel",
        img: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg",
      },
      {
        id: 2,
        text: "Hello",
        sender: "Me",
        img: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",
      },
      {
        id: 3,
        text: "To style the header in React Navigation use a header object inside the navigationOptions object",
        sender: "Daniel Emmanuel",
        img: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg",
      },
    ],
  },
];

const Chats = ({ item }) => {
  var state = item.sender === "Me";
  return (
    <View
      style={[
        styles.pdlt10,
        styles.mdtp10,
        styles.mdbt10,
        styles.pdtp10,
        item.sender === "Me" ? styles.frowrev : styles.frow,
        styles.jStart,
      ]}
    >
      <View style={state ? styles.pdlt10 : styles.pdrt10}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50 }}
          source={{ uri: item.img }}
        />
      </View>
      <View>
        <View
          style={[messages.Chat, state ? messages.myChat : messages.frnChat]}
        >
          <Text style={{ lineHeight: 25 }}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

const Message = (props) => {
  const _renderMessages = ({ item }) => {
    return <Chats item={item} />;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={150}
      style={{ flex: 1 }}
    >
      <>
        <FlatList
          data={DATA_MESSAGES[0].chats}
          renderItem={_renderMessages}
          keyExtractor={(item, index) => String(index)}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "#D3D3D388" }}
        />
        <View
          style={{
            width: width,
            backgroundColor: "#FFF",
            borderTopColor: "#d4d4d4",
            borderTopWidth: 1,
            paddingTop: 15,
            paddingBottom: 5,
          }}
        >
          <View
            style={[styles.frow, styles.jspaceBw, styles.pdrt10, styles.pdlt10]}
          >
            <TextInput
              multiline={true}
              placeholder="type your message"
              style={{
                height: 45,
                width: width / 1.3,
              }}
            />
            <TouchableOpacity>
              <FontAwesome name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    </KeyboardAvoidingView>
  );
};

const messages = StyleSheet.create({
  Chat: { maxWidth: width / 2, padding: 10 },
  myChat: {
    backgroundColor: "#aaeedd",
    borderRadius: 14,
  },
  frnChat: {
    backgroundColor: "#aaeeaa",
    borderRadius: 14,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: width,
    height: 30,
    backgroundColor: "#d2d2d2",
  },
  flhalf: { flex: 0.5 },
  fl1: { flex: 1 },
  frow: { flexDirection: "row" },
  frowrev: { flexDirection: "row-reverse" },
  jStart: { justifyContent: "flex-start" },
  jspaceBw: { justifyContent: "space-between" },
  jevenSpace: { justifyContent: "space-evenly" },
  username22: {
    fontSize: 20,
  },
  mdtp10: { marginTop: 10 },
  mdtp20: { marginTop: 20 },
  mdbt10: { marginBottom: 10 },
  pdtp10: {
    paddingTop: 10,
  },
  pdbt5: {
    paddingBottom: 10,
  },
  pdlt5: {
    paddingLeft: 5,
  },
  pdrt10: { paddingRight: 10 },
  pdlt10: {
    paddingLeft: 10,
  },
  f18: { fontSize: 16 },
  f20: { fontSize: 20 },
  fb: { fontWeight: "bold" },
  clBl: { color: "cornflowerblue" },
  bdbtm4: {
    borderBottomWidth: 1.5,
  },
  bdGrey: {
    borderColor: "#d4d4d4",
  },
});

export default Message;
