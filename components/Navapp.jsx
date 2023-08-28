import React, { useState } from "react";
import {
  View,

  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import "react-native-gesture-handler";
import Profile from "./Profile";
import ProfileMenu from "./Profiletab";
import SettingsScreen from "./SettingsMenu";
import TransactionHistoryScreen from "./TransactionsHistory";
import ChangePasswordScreen from "./Changepass";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Stack } from "expo-router";
import SearchBar from "./SearchBar";
import { useThemeColor } from "../hooks/useThemeColor";

const MyAppStack = createNativeStackNavigator();

function MyApp() {
  return (
    <MyAppStack.Navigator>
      <MyAppStack.Screen name="Profiletab" component={ProfileMenu} />
      <MyAppStack.Screen name="SettingsMenu" component={SettingsScreen} />
      <MyAppStack.Screen
        name="TransactionsHistory"
        component={TransactionHistoryScreen}
      />
      <MyAppStack.Screen name="ChangePass" component={ChangePasswordScreen} />
    </MyAppStack.Navigator>
  );
}

export default MyApp;
