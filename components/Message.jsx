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
import { useThemeColor } from "./../hooks/useThemeColor";

const DATA_MESSAGES = [
  {
    id: 0,
    frnName: "Cyclekits",
    chats: [
      {
        id: 1,
        text: "Welcome to Cyclekits",
        sender: "Cyclekits",
        initials: "CL",
        img: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg",
      },
      {
        id: 2,
        text: "Hello",
        sender: "Me",
        initials: "DE",
        img: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",
      },
      {
        id: 3,
        text: "Commodo aliquip duis do nulla aliquip est qui elit. Dolore proident enim sit magna consequat cupidatat duis pariatur laborum eu cupidatat voluptate. Enim do in sunt aliqua consectetur velit dolore nostrud. Id voluptate minim reprehenderit sunt. Dolor mollit fugiat pariatur id. Consequat aliquip ullamco ex aute deserunt ut reprehenderit esse enim est pariatur. Amet veniam excepteur enim sunt non anim Lorem consectetur dolore culpa magna irure.",
        sender: "Cyclekits",
        initials: "CL",
        img: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/09/09aa93bad4aef38579ab260817f2a51fa194637c.jpg",
      },
      {
        id: 4,
        text: "Ullamco duis do sit enim nisi consequat cupidatat do enim mollit sunt. Cupidatat amet anim ea aliquip proident eiusmod enim consequat nulla ad. Proident nulla laborum in dolor ullamco. Laborum magna cupidatat exercitation consectetur occaecat cupidatat consectetur duis qui in. Dolore consectetur laboris quis irure proident enim tempor pariatur aliquip aliquip et aliquip mollit reprehenderit.",
        sender: "Me",
        initials: "DE",
        img: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",
      },
    ],
  },
];

const Chats = ({ item }) => {
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  var state = item.sender === "Me";
  let height = Dimensions.get("window").height;
  // let height = Dimensions.get("window").height;
  height = height - 125;
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
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            borderColor: themeColor === "#f2f2f2" ? "black" : "white",
            borderWidth: 2,
            backgroundColor: state ? themeColor : "#7b091c",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }} className="font-boldFont">
            {item.initials}
          </Text>
        </View>
      </View>
      <View>
        <View
          style={[messages.Chat, state ? messages.myChat : messages.frnChat]}
        >
          <Text style={{ lineHeight: 25, color: "black" }}>{item.text}</Text>
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
    <View>
      <FlatList
        data={DATA_MESSAGES[0].chats}
        renderItem={_renderMessages}
        keyExtractor={(item, index) => String(index)}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#D3D3D388",
        }}
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
    </View>
  );
};

const messages = StyleSheet.create({
  Chat: { maxWidth: width / 2, padding: 10 },
  myChat: {
    backgroundColor: "#f4f4f4",
    borderRadius: 14,
  },
  frnChat: {
    backgroundColor: "#e5e5e5",
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
