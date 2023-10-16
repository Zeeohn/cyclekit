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
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Svg, { Path, Defs, Pattern, Rect } from "react-native-svg";
import { Link } from "expo-router";
import { WebView } from "react-native-webview";

const ProductItem = ({ products, activeButton }) => {
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

  console.log(products);
  // console.log(products.length);

  return (
    <View className="flex-1 mt-2 relative">
      <View className="flex z-50">
        {activeButton === "pendingItems" && (
          <TouchableOpacity className="absolute rounded-md p-0.5 bg-gray-500  justify-center top-0 right-0 ">
            <MaterialIcons name="mode-edit" size={20} color="white" />
          </TouchableOpacity>
        )}
        {activeButton === "myStoreItems" && (
          <TouchableOpacity className="rounded-md p-0.5 bg-gray-500 top-60 right-0 justify-center absolute">
            <MaterialIcons name="mode-edit" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          shadowColor: "#7b091c",
          shadowOpacity: 0.6,
          shadowRadius: 8,
          elevation: 3,
          borderRadius: 10,
          padding: 7,
          margin: 8,
          marginBottom: 8,
        }}
      >
        <View
          className="border-2 items-center justify-center border-[#bd6379] rounded-lg p-2 bg-white"
          style={{ marginLeft: -7, marginTop: -7 }}
        >
          <TouchableOpacity onPress={handleImageClick}>
            <Image
              source={{ uri: products?.images[0] }}
              className="w-32 h-32"
            />
          </TouchableOpacity>
          <View className="justify-center items-center mt-2">
            <Text className="font-boldFont text-lg text-[#7b091c]">
              &#8358;{products.categories[0].price}
            </Text>
            <Text className="font-mediumFont text-sm text-[#7b091c] pt-2">
              {products.title}
            </Text>
            <Text className="font-mediumFont text-sm text-[#7b091c] pt-2">
              ({products.categories[0].stock}) stock
            </Text>
            {/* <View className="mt-2">
            <TouchableOpacity
              className="bg-[#7b091c] px-2 py-2 rounded-lg mb-2"
              onPress={handleAddToCart}
            >
              <Text className="font-normalFont text-[12px] text-white">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View> */}
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
              style={{ borderColor: "#bd6379", backgroundColor: "white" }}
            >
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
                  source={{ uri: products.images[0] }}
                  className="w-72 h-72 rounded-xl"
                />
              </View>
              <View className="p-5">
                <Text
                  className="font-boldFont text-lg"
                  style={{
                    color: "black",
                  }}
                >
                  {products.title}
                </Text>
                <Text className="font-boldFont text-xl text-[#bd6379]">
                  &#8358;{products.categories[0].price}
                </Text>
                <View className="flex-1 h-1/2">
                  <WebView
                    originWhitelist={["*"]}
                    source={{ html: products.item_desc }}
                    style={{ flex: 0, height: 20 }}
                  />
                </View>
                {/* <Text
                    className="font-normalFont text-xs text-justify pt-2"
                    style={{
                      color: "black",
                    }}
                  >
                    {products.item_desc}
                  </Text> */}
                <View className="flex flex-row justify-between pt-8">
                  <TouchableOpacity
                    onPress={handleAddToCart(products.item_id)}
                    className="bg-black px-3 py-2 rounded-md"
                    style={{
                      backgroundColor: "#7b091c",
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

const VendorProducts = ({ products, activeButton }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  console.log(products);
  console.log(products.length);

  return (
    <>
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductItem products={item} activeButton={activeButton} />
          )}
          keyExtractor={(item) => item.item_id.toString()}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        />
      ) : (
        <View className="flex flex-1 justify-center items-center mt-16">
          <Text className="font-normalFont text-[#7b091c] text-lg">
            There are no store items right now,{" "}
            <Link href="/index">create a product</Link> or check your pending
            items.
          </Text>
        </View>
      )}
    </>
  );
};

export default VendorProducts;
