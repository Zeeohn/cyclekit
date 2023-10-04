import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
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
// import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

export default function Vendor() {
  const richText = useRef();

  const [itemInput, handleItemInput] = useState("");
  const [sizeInput, handleSizeInput] = useState("");
  const [stockInput, handleStockInput] = useState("");
  const [priceInput, handlePriceInput] = useState("");
  const [categoryInput, handleCategoryInput] = useState("");
  const [targetInput, handleTargetInput] = useState("");
  const [descriptionInput, handleDescriptionInput] = useState("");
  const [showDescError, setShowDescError] = useState(false);

  const [selectedValue, setSelectedValue] = useState("Select");

  const getDropdownOptions = () => {
    if (priceInput <= 3000) {
      return [
        { label: "City", value: "City" },
        { label: "National", value: "National" },
      ];
    } else if (priceInput > 3000 && priceInput <= 15000) {
      return [
        { label: "State", value: "State" },
        { label: "National", value: "National" },
      ];
    } else {
      return [{ label: "National", value: "National" }];
    }
  };

  const dropdownOptions = getDropdownOptions();

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      // send data to the backend!
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: "#7b091c",
              }}
            >
              Post Items
            </Text>
          ),
          headerTitleAlign: "center",
        }}
      />
      <ScrollView>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View className="flex flex-1 items-center mx-4 pb-20">
            <View className="rounded border border-gray-300 w-[90vw] mb-3">
              <Text className="text-lg font-boldFont border-b border-b-gray-300 py-1 bg-gray-100 text-center">
                Upload picture of item
              </Text>
              <View className="px-2">
                <Text className="italic text-xs pt-2">
                  You can upload up to 5 pictures per item
                </Text>
                <TouchableOpacity className="flex flex-row justify-center rounded-md border-2 border-black mx-4 mt-1 mb-5 px-3 py-5">
                  <Svg
                    width="25"
                    height="20"
                    viewBox="0 0 25 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M25 5.45538V17.509C25 18.6181 23.9502 19.5179 22.6562 19.5179H2.34375C1.0498 19.5179 0 18.6181 0 17.509V5.45538C0 4.34629 1.0498 3.44645 2.34375 3.44645H6.64062L7.24121 2.0695C7.58301 1.28686 8.45703 0.767883 9.43359 0.767883H15.5615C16.5381 0.767883 17.4121 1.28686 17.7539 2.0695L18.3594 3.44645H22.6562C23.9502 3.44645 25 4.34629 25 5.45538ZM18.3594 11.4822C18.3594 8.71152 15.7324 6.45985 12.5 6.45985C9.26758 6.45985 6.64062 8.71152 6.64062 11.4822C6.64062 14.2528 9.26758 16.5045 12.5 16.5045C15.7324 16.5045 18.3594 14.2528 18.3594 11.4822ZM16.7969 11.4822C16.7969 13.512 14.8682 15.1652 12.5 15.1652C10.1318 15.1652 8.20312 13.512 8.20312 11.4822C8.20312 9.45231 10.1318 7.79913 12.5 7.79913C14.8682 7.79913 16.7969 9.45231 16.7969 11.4822Z"
                      fill="black"
                    />
                  </Svg>
                  <Text className="text-xs font-boldFont pl-4">
                    Click here to upload pictures
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Pressable onPress={() => richText.current?.dismissKeyboard()}>
              <View className="rounded border border-gray-300 w-[90vw] mx-8 mb-2">
                <Text className="text-lg font-boldFont border-b border-b-gray-300 py-1 bg-gray-100 text-center">
                  Item Name and Description
                </Text>
                <View className="px-4">
                  <View className="py-4">
                    <Text className="font-normalFont text-sm pb-0.5">
                      Item name
                    </Text>
                    <TextInput
                      value={itemInput}
                      onChangeText={handleItemInput}
                      className="flex-grow border rounded-md py-1.5 px-4 font-normalFont text-sm"
                      style={{
                        borderColor: "black",
                        color: "black",
                      }}
                    />
                  </View>
                  <View className="mb-4">
                    <Text className="font-normalFont text-sm pb-0.5">
                      Item description
                    </Text>
                    {/* <TextInput
                    value={descriptionInput}
                    onChangeText={handleDescriptionInput}
                    className="flex-grow border rounded-md py-1.5 px-4 font-normalFont text-sm"
                    style={{
                      borderColor: "black",
                      color: "black",
                    }}
                  /> */}
                    <View>
                      <RichEditor
                        ref={richText}
                        onChange={richTextHandle}
                        placeholder="Enter Item Description Here"
                        androidHardwareAccelerationDisabled={true}
                        style={{
                          borderWidth: 1,
                          padding: 1,
                          borderColor: "black",
                          borderRadius: 10,
                        }}
                        initialHeight={250}
                      />
                      <RichToolbar
                        editor={richText}
                        getEditor={() => richText.current}
                        selectedIconTint="#7b091c"
                        iconTint="white"
                        actions={[
                          actions.insertImage,
                          actions.setBold,
                          actions.setItalic,
                          actions.insertBulletsList,
                          actions.insertOrderedList,
                          actions.insertLink,
                          actions.setStrikethrough,
                          actions.setUnderline,
                        ]}
                        style={{
                          backgroundColor: "black",
                          borderColor: "black",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          borderWidth: 1,
                          bottom: 10,
                        }}
                      />
                    </View>
                    {showDescError && (
                      <Text
                        style={{
                          color: "#FF0000",
                          marginBottom: 10,
                          textAlign: "center",
                        }}
                      >
                        Your content shouldn't be empty 🤔
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </Pressable>
            <View className="w-full">
              <View className="pb-4 pt-2">
                <Text className="font-normalFont text-sm pb-0.5">Price</Text>
                <TextInput
                  value={priceInput}
                  onChangeText={handlePriceInput}
                  keyboardType="number-pad"
                  className="w-[50%] border rounded-md py-1 px-4 font-normalFont text-sm"
                  style={{
                    borderColor: "black",
                    color: "black",
                  }}
                />
              </View>
              <View className="pb-4">
                <Text className="font-normalFont text-sm pb-0.5">
                  Size (Optional)
                </Text>
                <TextInput
                  value={sizeInput}
                  onChangeText={handleSizeInput}
                  className="w-[50%] border rounded-md py-1 px-4 font-normalFont text-sm"
                  style={{
                    borderColor: "black",
                    color: "black",
                  }}
                />
              </View>
              <View className="pb-4">
                <Text className="font-normalFont text-sm pb-0.5">
                  Total Stock
                </Text>
                <TextInput
                  value={stockInput}
                  keyboardType="numeric"
                  onChangeText={handleStockInput}
                  className="w-[50%] border rounded-md py-1 px-4 font-normalFont text-sm"
                  style={{
                    borderColor: "black",
                    color: "black",
                  }}
                />
              </View>
              <View className="pb-4">
                <Text className="font-normalFont text-sm pb-0.5">Category</Text>
                <TextInput
                  value={categoryInput}
                  onChangeText={handleCategoryInput}
                  className="w-[50%] border rounded-md py-1 px-4 font-normalFont text-sm"
                  style={{
                    borderColor: "black",
                    color: "black",
                  }}
                />
              </View>
              <View className="pb-4">
                <Text className="font-normalFont text-sm pb-0.5">
                  Market Target
                </Text>
                <View className="w-[50%] border rounded-md border-gray-300">
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                  >
                    {dropdownOptions.map((option) => (
                      <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
            <TouchableOpacity className="rounded-md px-6 py-3 my-5 bg-[#7b091c]">
              <Text className="text-white font-mediumFont text-sm">Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
