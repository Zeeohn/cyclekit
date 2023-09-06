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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
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
  replies,
}) => {
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);

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

  const handleCommentModal = () => {
    setCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
  };

  const handleCommentInput = (text) => {
    setCommentInput(text);
  };

  const handleReplyInput = (text) => {
    setReplyInput(text);
  };

  const handleAddComment = ({ text, postId }) => {
    // This is for Adding the comments to the database
  };

  const handleAddReplies = ({ text, commentId }) => {
    // This is for Adding the replies to the database
  };

  return (
    <KeyboardAvoidingView>
      <View
        className="flex-1"
        style={{
          backgroundColor: colorScheme,
        }}
      >
        <View
          className="m-2 p-2 border-[#bd6379] border-4"
          style={{
            shadowColor: "#bd6379",
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.73,
            shadowRadius: 5,
            borderRadius: 15,
            elevation: 14,
            backgroundColor: colorScheme,
          }}
        >
          <TouchableOpacity onPress={handleImageClick}>
            <Image source={imageUrl} className="h-72 w-full rounded-lg" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageClick}>
            <Text className="mt-2 font-boldFont text-xl text-center text-[#bd6379]">
              {header}
            </Text>
          </TouchableOpacity>
          <Text
            className="pt-4 font-mediumFont text-sm"
            style={{
              color: `${colorScheme === "#121212" ? "white" : "black"}`,
            }}
          >
            {showFullCaption ? caption : `${caption.slice(0, 70)}...`}
          </Text>
          {caption.length > 70 && (
            <TouchableOpacity onPress={handleImageClick}>
              <Text
                className="font-normalFont text-xs"
                style={{
                  color: `${colorScheme === "#121212" ? "#bd6379" : "#7b091c"}`,
                }}
              >
                {showFullCaption ? "See less" : "See more"}
              </Text>
            </TouchableOpacity>
          )}
          <View className="mt-2 border border-b border-gray-300 rounded-lg"></View>
          <View className="mt-4">
            {showAllComments
              ? comments.map((comment, index) => (
                  <View
                    key={index}
                    className="flex flex-col justify-start mb-2"
                  >
                    <View className="flex flex-row">
                      <Image
                        source={comment.userImage}
                        className="h-6 w-6 rounded-full mr-2 mt-1"
                      />
                      <View className="">
                        <Text
                          className="font-boldFont text-xs"
                          style={{
                            color: `${
                              colorScheme === "#121212" ? "white" : "black"
                            }`,
                          }}
                        >
                          {comment.userName}
                        </Text>
                        <Text
                          className="font-normalFont text-xs"
                          style={{
                            color: `${
                              colorScheme === "#121212" ? "white" : "black"
                            }`,
                          }}
                        >
                          {comment.text}
                        </Text>
                      </View>
                    </View>
                    <View className="flex flex-col items-start">
                      {comment.replies.map((reply, replyIndex) => (
                        <View
                          key={replyIndex}
                          className="flex flex-row justify-start items-center ml-6 mb-2"
                        >
                          <Image
                            source={reply.userImage}
                            className="h-6 w-6 rounded-full mr-2"
                          />
                          <View className="mt-1">
                            <Text
                              className="font-boldFont text-xs"
                              style={{
                                color: `${
                                  colorScheme === "#121212" ? "white" : "black"
                                }`,
                              }}
                            >
                              {reply.userName}
                            </Text>
                            <Text
                              className="font-normalFont text-xs"
                              style={{
                                color: `${
                                  colorScheme === "#121212" ? "white" : "black"
                                }`,
                              }}
                            >
                              {reply.text}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ))
              : comments.slice(0, 1).map((comment, index) => (
                  <View
                    key={index}
                    className="flex flex-row justify-start mb-2 mt-1"
                  >
                    <Image
                      source={comment.userImage}
                      className="h-6 w-6 rounded-full mr-2"
                    />
                    <View className="">
                      <Text
                        className="font-boldFont text-xs"
                        style={{
                          color: `${
                            colorScheme === "#121212" ? "white" : "black"
                          }`,
                        }}
                      >
                        {comment.userName}
                      </Text>
                      <Text
                        className="font-normalFont text-xs"
                        style={{
                          color: `${
                            colorScheme === "#121212" ? "white" : "black"
                          }`,
                        }}
                      >
                        {comment.text}
                      </Text>
                      <View className="relative">
                        <TouchableOpacity onPress={handleCommentModal}>
                          <Text
                            style={{
                              color: `${
                                colorScheme === "#121212"
                                  ? "#bd6379"
                                  : "#7b091c"
                              }`,
                            }}
                          >
                            Reply
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}

            {comments.length > 2 && (
              <Text
                onPress={handleCommentModal}
                className="font-normalFont text-xs mt-2"
                style={{
                  color: `${colorScheme === "#121212" ? "#bd6379" : "#7b091c"}`,
                }}
              >
                {showAllComments
                  ? "Hide Comments"
                  : `View all ${comments.length} comment(s)`}
              </Text>
            )}
          </View>
          <View className="mt-4 flex flex-row justify-center items-center">
            <Image
              source={userImageUrl}
              className="h-8 w-8 rounded-full mr-2"
            />
            <TextInput
              placeholder="Add a comment..."
              placeholderTextColor={`${
                colorScheme === "#121212" ? "white" : "black"
              }`}
              value={commentInput}
              onChangeText={handleCommentInput}
              className="flex-grow border rounded-md py-1.5 px-4 font-normalFont text-xs"
              style={{
                borderColor: `${colorScheme === "#121212" ? "white" : "black"}`,
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            />
            <TouchableOpacity onPress={handleAddComment} className="ml-2 pr-2">
              <FontAwesome
                name="send"
                size={24}
                color={`${colorScheme === "#121212" ? "#bd6379" : "#7b091c"}`}
                className="h-6 w-6"
              />
            </TouchableOpacity>
          </View>
          <Text className="font-normalFont text-xs text-gray-400 pt-4">
            {date}
          </Text>

          <Modal
            visible={isCommentModalVisible}
            transparent
            animationType="slide"
            onRequestClose={closeCommentModal}
          >
            <View
              className="flex flex-1 justify-end"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            >
              <View
                className="bg-white rounded-t-3xl h-[90%] px-3 py-2"
                style={{
                  backgroundColor: `${
                    colorScheme === "#121212" ? "#212121" : "#f2f2f2"
                  }`,
                }}
              >
                <View className="items-end">
                  <AntDesign
                    name="close"
                    size={18}
                    color="white"
                    onPress={closeCommentModal}
                    style={{
                      backgroundColor: "#7b091c",
                      borderRadius: 50,
                      padding: 4,
                    }}
                  />
                </View>
                <Text
                  className="font-boldFont text-center text-lg pb-2 -mt-4 border-b border-b-[#7b091c]"
                  style={{
                    color: `${colorScheme === "#121212" ? "white" : "black"}`,
                  }}
                >
                  Comments
                </Text>
                <ScrollView>
                  {comments.map((comment, index) => (
                    <View
                      key={index}
                      className="flex flex-col justify-start mb-2 mt-2"
                    >
                      <View className="flex flex-row">
                        <Image
                          source={comment.userImage}
                          className="h-6 w-6 rounded-full mr-2 mt-1"
                        />
                        <View className="">
                          <Text
                            className="font-boldFont text-xs"
                            style={{
                              color: `${
                                colorScheme === "#121212" ? "white" : "black"
                              }`,
                            }}
                          >
                            {comment.userName}
                          </Text>
                          <Text
                            className="font-normalFont text-xs"
                            style={{
                              color: `${
                                colorScheme === "#121212" ? "white" : "black"
                              }`,
                            }}
                          >
                            {comment.text}
                          </Text>
                        </View>
                      </View>
                      <View className="relative left-8">
                        <TouchableOpacity>
                          <Text
                            style={{
                              color: `${
                                colorScheme === "#121212"
                                  ? "#bd6379"
                                  : "#7b091c"
                              }`,
                            }}
                          >
                            Reply
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex flex-col items-start">
                        {comment.replies.map((reply, replyIndex) => (
                          <View
                            key={replyIndex}
                            className="flex flex-row justify-start items-center ml-8 mb-2"
                          >
                            <Image
                              source={reply.userImage}
                              className="h-6 w-6 rounded-full mr-2"
                            />
                            <View className="mt-1">
                              <Text
                                className="font-boldFont text-xs"
                                style={{
                                  color: `${
                                    colorScheme === "#121212"
                                      ? "white"
                                      : "black"
                                  }`,
                                }}
                              >
                                {reply.userName}
                              </Text>
                              <Text
                                className="font-normalFont text-xs"
                                style={{
                                  color: `${
                                    colorScheme === "#121212"
                                      ? "white"
                                      : "black"
                                  }`,
                                }}
                              >
                                {reply.text}
                              </Text>
                            </View>
                          </View>
                        ))}
                        <View className="mt-2 flex flex-1 w-full border border-b border-gray-300 rounded-lg"></View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                <View className="mt-4 flex flex-row justify-center items-center">
                  <Image
                    source={userImageUrl}
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <TextInput
                    placeholder="Type your reply..."
                    placeholderTextColor={`${
                      colorScheme === "#121212" ? "white" : "black"
                    }`}
                    value={replyInput}
                    onChangeText={handleReplyInput}
                    className="flex-grow border rounded-md py-1.5 px-4 font-normalFont text-xs"
                    style={{
                      borderColor: `${
                        colorScheme === "#121212" ? "white" : "black"
                      }`,
                      color: `${colorScheme === "#121212" ? "white" : "black"}`,
                    }}
                  />
                  <TouchableOpacity
                    onPress={handleAddReplies}
                    className="ml-2 pr-2"
                  >
                    <FontAwesome
                      name="send"
                      size={24}
                      color={`${
                        colorScheme === "#121212" ? "#bd6379" : "#7b091c"
                      }`}
                      className="h-6 w-6"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            visible={isModalVisible}
            transparent
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View
              className="flex flex-col flex-1 items-center p-4"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            >
              <View
                className="flex flex-1 flex-col w-full border-8 "
                style={{
                  borderColor: `${themeColor}`,
                  backgroundColor: colorScheme,
                }}
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
                    <Text
                      className="font-normalFont text-xs text-justify py-2"
                      style={{
                        color: `${
                          colorScheme === "#121212" ? "white" : "black"
                        }`,
                      }}
                    >
                      Wed, 24th July 2023
                    </Text>
                    <Text
                      className="font-mediumFont text-md"
                      style={{
                        color: `${
                          colorScheme === "#121212" ? "white" : "black"
                        }`,
                      }}
                    >
                      sjkdbfadkjlbsbsjklddddddddddddsnkcbvaklsdbfajskdbabdshj
                      Aliquip ea irure qui id et commodo. Commodo nulla sit esse
                      anim quis est nulla Lorem tempor enim eu nulla amet
                      nostrud. Nostrud reprehenderit dolore incididunt pariatur
                      anim et consequat ad do ipsum ut. Ullamco exercitation
                      sint anim occaecat. Deserunt deserunt occaecat in quis
                      officia duis do anim dolor sunt sit deserunt eu dolore.
                      Lorem labore in sit in irure officia nostrud eiusmod amet
                      eu incididunt cupidatat. Ad enim reprehenderit esse tempor
                      sint est. Excepteur nisi ea nostrud tempor labore cillum
                      in ex ea. Dolore ex duis proident est sint laborum est
                      incididunt pariatur voluptate labore. Reprehenderit Lorem
                      ad dolore laboris nostrud officia ut fugiat.
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RecentUpdates;
