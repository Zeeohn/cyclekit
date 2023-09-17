import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Svg, {
  G,
  Path,
  ClipPath,
  Circle,
  Defs,
  Mask,
  Rect,
} from "react-native-svg";
import SearchBar from "./../../components/SearchBar";
import VendorProducts from "./../../components/VendorProducts";

export default function vstore() {
  const [activeButton, setActiveButton] = useState("myStoreItems");
  const [header, setHeader] = useState("My Store Items");

  const handleButtonPress = (buttonName, headerTitle) => {
    setActiveButton(buttonName);
    setHeader(headerTitle);
  };

  const products = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
      price: "6,000",
      name: "Product 1",
      description:
        "Incididunt duis nulla enim voluptate ad mollit voluptate labore nulla incididunt aute. Consequat Lorem non ipsum sint et est qui cupidatat et do anim cupidatat. Do labore occaecat ipsum aute eiusmod esse anim dolore ipsum. Nulla eiusmod ea incididunt labore ex amet dolore irure. Cupidatat proident nisi sit ut est ut labore duis aliquip. Sint Lorem eiusmod eu sint esse duis.",
      stock: 14,
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      price: "10,000",
      name: "Product 2",
      description:
        "Irure mollit enim eiusmod consectetur et deserunt sunt nostrud. Aliquip minim labore velit aliquip culpa voluptate id non eiusmod. Veniam aliqua aliqua proident exercitation labore nisi laborum esse. Et irure quis id tempor proident ea ad velit. Reprehenderit exercitation qui ad eiusmod labore id nulla laboris ea ad id laboris tempor.",
      stock: 10,
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
      price: "6,000",
      name: "Product 3",
      description:
        "Incididunt duis nulla enim voluptate ad mollit voluptate labore nulla incididunt aute. Consequat Lorem non ipsum sint et est qui cupidatat et do anim cupidatat. Do labore occaecat ipsum aute eiusmod esse anim dolore ipsum. Nulla eiusmod ea incididunt labore ex amet dolore irure. Cupidatat proident nisi sit ut est ut labore duis aliquip. Sint Lorem eiusmod eu sint esse duis.",
      stock: 4,
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      price: "10,000",
      name: "Product 4",
      description:
        "Irure mollit enim eiusmod consectetur et deserunt sunt nostrud. Aliquip minim labore velit aliquip culpa voluptate id non eiusmod. Veniam aliqua aliqua proident exercitation labore nisi laborum esse. Et irure quis id tempor proident ea ad velit. Reprehenderit exercitation qui ad eiusmod labore id nulla laboris ea ad id laboris tempor.",
      stock: 8,
    },
    {
      id: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
      price: "6,000",
      name: "Product 5",
      description:
        "Incididunt duis nulla enim voluptate ad mollit voluptate labore nulla incididunt aute. Consequat Lorem non ipsum sint et est qui cupidatat et do anim cupidatat. Do labore occaecat ipsum aute eiusmod esse anim dolore ipsum. Nulla eiusmod ea incididunt labore ex amet dolore irure. Cupidatat proident nisi sit ut est ut labore duis aliquip. Sint Lorem eiusmod eu sint esse duis.",
      stock: 20,
    },
    {
      id: 6,
      imageUrl:
        "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      price: "10,000",
      name: "Product 6",
      description:
        "Irure mollit enim eiusmod consectetur et deserunt sunt nostrud. Aliquip minim labore velit aliquip culpa voluptate id non eiusmod. Veniam aliqua aliqua proident exercitation labore nisi laborum esse. Et irure quis id tempor proident ea ad velit. Reprehenderit exercitation qui ad eiusmod labore id nulla laboris ea ad id laboris tempor.",
      stock: 14,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
          headerLeft: () => <SearchBar />,
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: "#7b091c",
              }}
            >
              {header}
            </Text>
          ),
          headerTitleAlign: "center",
        }}
      />
      <View className="flex-1 flex">
        <Text className="text-center text-[#7b091c] font-boldFont pt-3">
          Looking for something? (Click on search).
        </Text>
        <View className="flex flex-row justify-between my-8 mx-8">
          <TouchableOpacity
            className="rounded-lg py-2 px-1"
            style={{
              backgroundColor:
                activeButton === "myStoreItems" ? "#7b091c" : "#bd6379",
            }}
            onPress={() => handleButtonPress("myStoreItems", "My Store Items")}
          >
            <Text className="font-mediumFont text-lg text-white">
              My Store Items
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-lg py-2 px-1"
            style={{
              backgroundColor:
                activeButton === "pendingItems" ? "#7b091c" : "#bd6379",
            }}
            onPress={() => handleButtonPress("pendingItems", "Pending Items")}
          >
            <Text className="font-mediumFont text-lg text-white">
              Pending Items
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mx-4 pb-32">
          <VendorProducts products={products} activeButton={activeButton} />
        </View>
      </View>
    </SafeAreaView>
  );
}
