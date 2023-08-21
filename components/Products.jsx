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
    <>
      <View className="px-1 py-1 mb-4 flex flex-row">
        <TouchableOpacity onPress={handleImageClick}>
          <Image
            source={{ uri: product.imageUrl }}
            className="w-32 h-32 mr-2"
          />
        </TouchableOpacity>
        <View className="flex flex-col">
          <Text className="font-boldFont text-lg">&#8358;{product.price}</Text>
          <Text className="font-mediumFont text-sm flex-1">{product.name}</Text>
          <View className="flex flex-row gap-2">
            <TouchableOpacity
              className="bg-black px-2 py-2 rounded-lg mb-2"
              onPress={handleAddToCart}
            >
              <Text className="font-normalFont text-[12px] text-white">
                Add to Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black px-2 py-2 rounded-lg mb-2"
              onPress={handleImageClick}
            >
              <Text className="font-normalFont text-[12px] text-white">
                View Details
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
      <View className="border-b border-gray-600 mb-4" />
    </>
  );
};

const Products = ({ products }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductItem product={item} />}
      contentContainerStyle={styles.productsContainer}
    />
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    padding: 10,
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  addToCartButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default Products;
