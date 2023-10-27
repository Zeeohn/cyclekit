import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

export default function Items() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dev.cyclekits.ng/api/data/items"
      );
      if (response.data && response.data.status && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (item) => {
    if (item.preselected === "0") {
      // Allow users to select/unselect only if the item is not preselected
      const updatedData = data.map((dataItem) =>
        dataItem.item_id === item.item_id
          ? { ...dataItem, selected: !dataItem.selected }
          : dataItem
      );
      setData(updatedData);
    }
  };

  return (
    <View className="flex-1">
      <Text className="font-boldFont mb-2 text-2xl text-center">
        Select Items
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(items) => items.item_id.toString()}
          renderItem={({ item }) => (
            <View className="flex-1">
              <TouchableOpacity onPress={() => toggleSelection(item)}>
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
                    className={`border-2 items-center justify-center  rounded-lg p-2 bg-white ${
                      item.preselected === "1"
                        ? "border-green-600"
                        : "border-[#bd6379]" && item.selected
                        ? "border-green-600"
                        : "border-[#bd6379]"
                    }`}
                    style={{ marginLeft: -10, marginTop: -10 }}
                  >
                    {item.preselected === "1" ||
                      (item.selected && (
                        <Feather
                          name="check-circle"
                          size={24}
                          color="black"
                          style={{
                            zIndex: 99,
                            position: "absolute",
                            top: 8,
                            right: 8,
                          }}
                        />
                      ))}
                    <Image
                      source={{ uri: item.image }}
                      className="w-32 h-32 rounded-md"
                    />
                    <Text className="font-mediumFont text-xl text-center">
                      {item.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
        />
      )}
    </View>
  );
}
