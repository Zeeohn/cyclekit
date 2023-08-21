import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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

  const handleCommentInput = (text) => {
    setCommentInput(text);
  };

  const handleAddComment = () => {
    // This is for Adding the comments to the database
  };

  return (
    <View className="m-2 p-2 border rounded-lg border-gray-300">
      <Image source={imageUrl} className="h-72 w-full rounded-lg" />
      <View className="border-b-2 border-gray-300 mt-4" />
      <Text className="mt-1 font-boldFont text-lg">{header}</Text>
      <Text className="mt-0.5 font-mediumFont text-sm">
        {showFullCaption ? caption : `${caption.slice(0, 70)}...`}
      </Text>
      {caption.length > 70 && (
        <Text
          onPress={() => setShowFullCaption(!showFullCaption)}
          className="text-blue-600 font-normalFont text-xs"
        >
          {showFullCaption ? "See less" : "See more"}
        </Text>
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
            className="text-blue-600 font-normalFont text-xs mt-2"
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
            color="black"
            className="h-6 w-6"
          />
        </TouchableOpacity>
      </View>
      <Text className="font-normalFont text-xs text-gray-400 pt-4 italic">
        {date}
      </Text>
    </View>
  );
};

export default RecentUpdates;
