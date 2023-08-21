import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import RecentUpdates from "./../../components/RecentUpdates";

export default function updates() {
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
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "ZS09838434",
          text: "Love This!",
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "TJ65098840",
          text: "Will definitely try it",
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
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "ZS09838434",
          text: "Love This!",
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "TJ65098840",
          text: "Will definitely try it",
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
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "ZS09838434",
          text: "Love This!",
        },
        {
          userImage: require("../../assets/images/logo-cyclekits.png"),
          userName: "TJ65098840",
          text: "Will definitely try it",
        },
      ],
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text className="font-boldFont text-xl ml-4">Recent Updates</Text>
          ),
          headerStyle: { backgroundColor: "#ffffff" },
        }}
      />
      <ScrollView>
        {posts.map((post, index) => (
          <RecentUpdates key={index} {...post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
