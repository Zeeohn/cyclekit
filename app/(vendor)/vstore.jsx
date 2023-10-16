import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
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
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import SearchBar from "./../../components/SearchBar";
import VendorProducts from "./../../components/VendorProducts";
import withAuthCheck from "./../../components/Auth";

function vstore(props) {
  const [activeButton, setActiveButton] = useState("myStoreItems");
  const [header, setHeader] = useState("My Store Items");
  const [apiData, setApiData] = useState([]);

  const handleButtonPress = (buttonName, headerTitle) => {
    setActiveButton(buttonName);
    setHeader(headerTitle);
  };

  useEffect(() => {
    if (props.authToken) {
      const fetchStoreItems = async () => {
        try {
          let config = {
            method: "get",
            url: `https://dev.cyclekits.ng/api/vendor/item?page=1&max_per_page=20&includes=item_desc,attributes&status=${
              activeButton === "myStoreItems" ? "1" : "0"
            }`,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${props.authToken}`,
            },
          };

          axios(config)
            .then(async (response) => {
              const data = response.data;
              if (data.status) {
                setApiData(data);
              }
            })
            .catch((error) => {
              console.log("Error:", error);
              if (
                error.response &&
                error.response.data &&
                error.response.data.errors
              ) {
                console.log(error.response.data);
                const validationErrors = error.response.data.errors;
                const errorMessages = Object.values(validationErrors)
                  .flat() // Flatten the error messages array
                  .join("\n"); // Join error messages with newlines

                Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: "Oh-Uh",
                  button: "Ok",
                  textBody: errorMessages,
                });
                console.log("Error Status:", error.response.status);
                console.log("Error Headers:", error.response.headers);
              } else if (error.request) {
                console.log("Request Error:", error.request);
              } else {
                Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: "Oh-Uh",
                  button: "Ok",
                  textBody: `An unexpected error occurred!`,
                });
              }
            });
        } catch (error) {
          console.log(error);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Oh-Uh",
            button: "Ok",
            textBody: `An unexpected error occurred!`,
          });
        }
      };

      fetchStoreItems();
    }
  }, [props.authToken, activeButton]);

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
        <View className="flex flex-row justify-between my-4 mx-4">
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
          {apiData.data && (
            <VendorProducts
              products={apiData.data}
              activeButton={activeButton}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withAuthCheck(vstore);
