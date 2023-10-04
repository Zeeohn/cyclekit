import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Svg, { Path, Defs, Pattern, Rect } from "react-native-svg";
import { useThemeColor } from "./../hooks/useThemeColor";
import SearchBar from "./SearchBar";

const ProductItem = ({ product }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  const handleImageClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddToCart = () => {
    // todo: Add to cart functionality
  };

  return (
    // <View className="flex flex-1">
    // <View className="mb-4 w-2/4 shadow-md shadow-[#862d2d] border-0 drop-shadow-2xl rounded-md">
    // <View className="m-2 border-2 border-[#bd6379] rounded-lg items-center justify-center h-full max-w-[240px] p-2 shadow-lg shadow-[2px 2px 2px 4px #bd6379]">
    <View className="flex-1 m-1">
      <View
        style={{
          shadowColor: "2px 2px 2px 4px #BD6379",
          shadowOpacity: 0.6,
          shadowRadius: 10,
          elevation: 3,
          borderRadius: 10,
          padding: 7,
          margin: 8,
          marginBottom: 8,
        }}
      >
        <View
          className="border-2 items-center justify-center border-[#bd6379] rounded-lg p-4 bg-white"
          style={{ marginLeft: -7, marginTop: -7 }}
        >
          <TouchableOpacity onPress={handleImageClick}>
            <Image source={{ uri: product.imageUrl }} className="w-32 h-32" />
          </TouchableOpacity>
          <View className="justify-center items-center mt-2">
            <Text className="font-boldFont text-lg">
              &#8358;{product.price}
            </Text>
            <Text className="font-mediumFont text-sm">{product.name}</Text>
            <View className="mt-2">
              <TouchableOpacity
                className="bg-[#7b091c] px-2 py-2 rounded-lg mb-2"
                onPress={handleAddToCart}
              >
                <Text className="font-normalFont text-[12px] text-white">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Full Page Modal */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View
            className="flex flex-col flex-1 items-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <View
              className="flex flex-1 flex-col rounded-lg border-4"
              style={{ borderColor: "#bd6379", backgroundColor: colorScheme }}
            >
              <View className="items-end left-3 bottom-3 rounded-full p-1">
                <AntDesign
                  name="close"
                  size={22}
                  color="white"
                  onPress={closeModal}
                  style={{
                    backgroundColor: themeColor,
                    borderRadius: 50,
                    padding: 4,
                  }}
                />
              </View>
              <View className="items-center">
                <Image
                  source={{ uri: product.imageUrl }}
                  className="w-72 h-72 rounded-xl"
                />
              </View>
              <View className="p-5">
                <Text
                  className="font-boldFont text-lg"
                  style={{
                    color: `${colorScheme === "#121212" ? "white" : "black"}`,
                  }}
                >
                  {product.name}
                </Text>
                <Text className="font-boldFont text-xl text-[#bd6379]">
                  &#8358;{product.price}
                </Text>
                <Text
                  className="font-normalFont text-xs text-justify pt-2"
                  style={{
                    color: `${colorScheme === "#121212" ? "white" : "black"}`,
                  }}
                >
                  {product.description}
                </Text>
                <View className="flex flex-row justify-between pt-8">
                  <TouchableOpacity
                    onPress={handleAddToCart}
                    className="bg-black px-3 py-2 rounded-md"
                    style={{
                      backgroundColor: themeColor,
                    }}
                  >
                    <Text className="font-normalFont text-xs text-white">
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={closeModal}
                    className="bg-[#bd6379] px-3 py-2 rounded-md"
                  >
                    <Text className="font-normalFont text-xs text-white">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
    // </View>
  );
};

const Products = ({ products }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();
  return (
    <View style={{ flex: 1 }} className="border-4 rounded-2xl border-[#7b091c]">
      <View className="flex flex-row justify-center items-center m-6">
        <Text
          className="font-boldFont text-xs"
          style={{ color: colorScheme === "#121212" ? "white" : "black" }}
        >
          Looking for something?{" "}
        </Text>
        <TouchableOpacity onPress={handleClick}>
          <Text className="font-boldFont text-xs text-[#7b091c]">
            Click to search!
          </Text>
        </TouchableOpacity>
        {isVisible && <SearchBar />}
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      />
    </View>
  );
};

export default Products;
