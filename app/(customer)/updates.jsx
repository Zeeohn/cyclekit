import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import RecentUpdates from "./../../components/RecentUpdates";
import SearchBar from "./../../components/SearchBar";
import { useThemeColor } from "./../../hooks/useThemeColor";

let height = Dimensions.get("window").height;
// let height = Dimensions.get("window").height;
height = height - 125;

export default function Updates() {
  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  const posts = [
    {
      imageUrl: require("../../assets/images/image-1.png"),
      userImageUrl: require("../../assets/images/logo-cyclekits.png"),
      header: "Heading 1",
      caption:
        "Voluptate et officia deserunt laborum incididunt non aute irure sunt est enim dolor elit. Nisi eiusmod deserunt aliqua ad consectetur commodo labore. Ea laborum nulla irure exercitation cupidatat excepteur occaecat non exercitation excepteur dolore. Et aute cillum minim nulla consequat pariatur.",
      date: "Wed 25th August, 2023",
      comments: [
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "GB2343419",
          text: "Nice Idea",
          replies: [
            {
              userImage: require("../../assets/images/logo-cyclekits.png"),
              userName: "TR893343",
              text: "this is a reply",
            },
            {
              userImage: require("../../assets/images/logo-cyclekits.png"),
              userName: "TR893343",
              text: "this is a reply",
            },
          ],
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "ZS09838434",
          text: "Love This!",
          replies: [
            {
              userImage: require("../../assets/images/logo-cyclekits.png"),
              userName: "BZ67232",
              text: "this is another reply",
            },
            {
              userImage: require("../../assets/images/logo-cyclekits.png"),
              userName: "BZ67232",
              text: "this is another reply",
            },
          ],
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "TJ65098840",
          text: "Will definitely try it",
          replies: [
            {
              userImage: require("../../assets/images/logo-cyclekits.png"),
              userName: "YK34545",
              text: "this is a third reply",
            },
            {
              userImage: require("../../assets/images/logo-cyclekits.png"),
              userName: "YK34545",
              text: "this is a third reply",
            },
          ],
        },
      ],
    },
    {
      imageUrl: require("../../assets/images/image-1.png"),
      userImageUrl: require("../../assets/images/logo-cyclekits.png"),
      header: "Heading 2",
      caption:
        "Officia velit cillum mollit veniam occaecat duis irure. Incididunt deserunt ut sit ex ut ipsum dolor. Quis aliquip ea incididunt do nisi laborum nostrud do enim voluptate irure deserunt.",
      date: "Wed 25th August, 2023",
      comments: [
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "GB2343419",
          text: "Nice Idea",
          replies: [],
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "ZS09838434",
          text: "Love This!",
          replies: [],
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "TJ65098840",
          text: "Will definitely try it",
          replies: [],
        },
      ],
    },
    {
      imageUrl: require("../../assets/images/image-1.png"),
      userImageUrl: require("../../assets/images/logo-cyclekits.png"),
      header: "Heading 3",
      caption:
        "Eu cillum aliqua non nostrud nulla cillum cupidatat dolor irure nulla. Mollit minim adipisicing et non duis ea adipisicing aliquip incididunt mollit eiusmod reprehenderit cupidatat. Consectetur fugiat veniam adipisicing officia est laborum enim eiusmod id proident commodo. Consequat consectetur proident ut amet ut cupidatat. Exercitation laborum ipsum anim incididunt ullamco do aliquip anim pariatur culpa elit aute.",
      date: "Wed 25th August, 2023",
      comments: [
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "GB2343419",
          text: "Nice Idea",
          replies: [],
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "ZS09838434",
          text: "Love This!",
          replies: [],
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "TJ65098840",
          text: "Will definitely try it",
          replies: [],
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={{ backgroundColor: colorScheme }}>
      <KeyboardAvoidingView>
        <Stack.Screen
          options={{
            headerLeft: () => <SearchBar />,
            headerStyle: { backgroundColor: colorScheme },
            headerTitle: () => (
              <Text
                className="font-boldFont text-xl ml-4"
                style={{
                  color: `${colorScheme === "#121212" ? "white" : "#7b091c"}`,
                }}
              >
                Recent Updates
              </Text>
            ),
            headerTitleAlign: "center",
          }}
        />
        <View
          style={{ backgroundColor: colorScheme }}
          className="pl-2 pr-2 pt-2 pb-20 border-4 rounded-2xl border-[#7b091c]"
        >
          <ScrollView>
            {posts.map((post, index) => (
              <RecentUpdates key={index} {...post} />
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
