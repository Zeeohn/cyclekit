import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";

const RecentUpdates = ({
  imageUrl,
  caption,
  header,
  date,
  comments,
  userImage,
  userImageUrl,
  userName,
  text,
}) => {
  const [commentInput, setCommentInput] = useState("");
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const { themeColor, setThemeColor } = useThemeColor();

  const handleImageClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleCommentInput = (text) => {
    setCommentInput(text);
  };

  const handleAddComment = () => {
    // This is for Adding the comments to the database
  };

  return (
    <View className="flex-1 bg-white">
      <View
        className="m-2 p-2 bg-white border-[#bd6379] border"
        style={{
          shadowColor: "#bd6379",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.53,
          shadowRadius: 14.0,
          borderRadius: 15,
          elevation: 14,
        }}
      >
        <Image source={imageUrl} className="h-72 w-full rounded-lg" />
        <Text className="mt-2 font-boldFont text-xl text-center text-[#7b091c]">
          {header}
        </Text>
        <Text className="pt-4 font-mediumFont text-sm">
          {showFullCaption ? caption : `${caption.slice(0, 70)}...`}
        </Text>
        {caption.length > 70 && (
          <TouchableOpacity onPress={handleImageClick}>
            <Text
              className="font-normalFont text-xs"
              style={{ color: `${themeColor}` }}
            >
              {showFullCaption ? "See less" : "See more"}
            </Text>
          </TouchableOpacity>
        )}

        <View className="mt-4">
          {showAllComments
            ? comments.map((comment, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-start items-center mb-2"
                >
                  <Image
                    source={comment.userImage}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  <View className="mt-1">
                    <Text className="font-boldFont text-xs">
                      {comment.userName}
                    </Text>
                    <Text className="font-normalFont text-xs">
                      {comment.text}
                    </Text>
                  </View>
                </View>
              ))
            : comments.slice(0, 2).map((comment, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-start items-center mb-2"
                >
                  <Image
                    source={comment.userImage}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  <View className="mt-1">
                    <Text className="font-boldFont text-xs">
                      {comment.userName}
                    </Text>
                    <Text className="font-normalFont text-xs">
                      {comment.text}
                    </Text>
                  </View>
                </View>
              ))}

          {comments.length > 2 && (
            <Text
              onPress={() => setShowAllComments(!showAllComments)}
              className="font-normalFont text-xs mt-2"
              style={{ color: `${themeColor}` }}
            >
              {showAllComments
                ? "Hide Comments"
                : `View ${comments.length - 2} more comments`}
            </Text>
          )}
        </View>
        <View className="mt-4 flex flex-row justify-center items-center">
          <Image source={userImageUrl} className="h-8 w-8 rounded-full mr-2" />
          <TextInput
            placeholder="Add a comment..."
            value={commentInput}
            onChangeText={handleCommentInput}
            className="flex-grow border rounded-md py-1.5 px-4 font-normalFont text-xs"
          />
          <TouchableOpacity onPress={handleAddComment} className="ml-2 pr-2">
            <FontAwesome
              name="send"
              size={24}
              color={themeColor}
              className="h-6 w-6"
            />
          </TouchableOpacity>
        </View>
        <Text className="font-normalFont text-xs text-gray-400 pt-4 italic">
          {date}
        </Text>

        <Modal visible={isModalVisible} transparent animationType="slide">
          <View
            className="flex flex-col flex-1 items-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <View
              className="flex flex-1 flex-col bg-white w-full border-8 "
              style={{ borderColor: `${themeColor}` }}
            >
              <View className="items-end right-1 top-1">
                <AntDesign
                  name="close"
                  size={22}
                  color="white"
                  onPress={closeModal}
                  style={{
                    backgroundColor: `${themeColor}`,
                    borderRadius: 50,
                    padding: 4,
                  }}
                />
              </View>
              <ScrollView>
                <View className="items-center pt-2">
                  <Image source={imageUrl} className="w-64 h-64" />
                </View>
                <View className="p-5">
                  <Text className="font-boldFont text-2xl text-[#7b091c]">
                    Heading
                  </Text>
                  <Text className="font-normalFont text-xs text-justify py-2">
                    Wed, 24th July 2023
                  </Text>
                  <Text className="font-mediumFont text-md">
                    sjkdbfadkjlbsbsjklddddddddddddsnkcbvaklsdbfajskdbabdshj
                    Aliquip ea irure qui id et commodo. Commodo nulla sit esse
                    anim quis est nulla Lorem tempor enim eu nulla amet nostrud.
                    Nostrud reprehenderit dolore incididunt pariatur anim et
                    consequat ad do ipsum ut. Ullamco exercitation sint anim
                    occaecat. Deserunt deserunt occaecat in quis officia duis do
                    anim dolor sunt sit deserunt eu dolore. Lorem labore in sit
                    in irure officia nostrud eiusmod amet eu incididunt
                    cupidatat. Ad enim reprehenderit esse tempor sint est.
                    Excepteur nisi ea nostrud tempor labore cillum in ex ea.
                    Dolore ex duis proident est sint laborum est incididunt
                    pariatur voluptate labore. Reprehenderit Lorem ad dolore
                    laboris nostrud officia ut fugiat.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default RecentUpdates;
