import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "./../hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

export default function Transactions() {
  const transactions = [
    { id: "1", date: "2023-08-01", subscription: "Subscription 1" },
    { id: "2", date: "2023-08-15", subscription: "Subscription 2" },
    // Add more transactions here
  ];

  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.subscription}>{item.subscription}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: colorScheme, flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colorScheme },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} style={{ marginRight: 15 }}>
              <Ionicons
                name="ios-chevron-back"
                size={28}
                color={colorScheme === "#121212" ? "white" : "black"}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              className="font-boldFont text-xl"
              style={{
                color: `${colorScheme === "#121212" ? "white" : "black"}`,
              }}
            >
              Transactions
            </Text>
          ),
        }}
      />
      <View style={styles.container}>
        <Text
          className="font-boldFont text-xl"
          style={{
            marginBottom: 20,
          }}
        >
          Transaction History
        </Text>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {},
  transactionItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  date: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  subscription: {},
});
