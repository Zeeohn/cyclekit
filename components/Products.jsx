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
import PatternedBorder from "./PatternedBorder";

const ProductItem = ({ product }) => {
  const [isModalVisible, setModalVisible] = useState(false);

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
    <View
      className="flex-1 m-2"
      style={{
        shadowColor: "#bd6379",
        shadowOffset: { width: 100, height: 150 },
        shadowOpacity: 1,
        shadowRadius: 20,
      }}
    >
      <View
        className="border items-center justify-center border-[#bd6379] rounded-lg p-4"
        style={{
          shadowColor: "#bd6379",
          shadowOffset: { width: 50, height: 50 },
          shadowOpacity: 1,
          shadowRadius: 4,
          elevation: 5,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={handleImageClick}>
          <Image source={{ uri: product.imageUrl }} className="w-32 h-32" />
        </TouchableOpacity>
        <View className="justify-center items-center mt-2">
          <Text className="font-boldFont text-lg">&#8358;{product.price}</Text>
          <Text className="font-mediumFont text-sm">{product.name}</Text>
          <View className="mt-2">
            <TouchableOpacity
              className="bg-black px-2 py-2 rounded-lg mb-2"
              onPress={handleAddToCart}
            >
              <Text className="font-normalFont text-[12px] text-white">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Full Page Modal */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View
            className="flex flex-col flex-1 items-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <View className="flex flex-1 flex-col bg-white rounded-lg">
              <View className="items-end left-3 bottom-3 rounded-full p-1">
                <AntDesign
                  name="close"
                  size={22}
                  color="white"
                  onPress={closeModal}
                  style={{
                    backgroundColor: "#7b091c",
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
                <Text className="font-boldFont text-lg">{product.name}</Text>
                <Text className="font-boldFont text-xl text-[#7b091c]">
                  &#8358;{product.price}
                </Text>
                <Text className="font-normalFont text-xs text-justify pt-2">
                  {product.description}
                </Text>
                <View className="flex flex-row justify-between pt-8">
                  <TouchableOpacity
                    onPress={handleAddToCart}
                    className="bg-black px-3 py-2 rounded-md"
                  >
                    <Text className="font-normalFont text-xs text-white">
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={closeModal}
                    className="bg-[#7b091c] px-3 py-2 rounded-md"
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
  return (
    <View
      style={{
        borderWidth: 10,
        borderImage: `url(https://www.thespruce.com/thmb/c3znkzZgMeuvzBy4wH13jVllfUo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/plants-with-big-flowers-4138211-hero-b10becb169064cc4b3c7967adc1b22e1.jpg) 30 repeat`,
      }}
    >
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 2,
        }}
      />
    </View>
  );
};

export default Products;
