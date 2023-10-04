import React, { useEffect } from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { Stack, Link, router } from "expo-router";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

const withAuthCheck = (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    useEffect(() => {
      checkAuth();
    }, []);

    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const role = await AsyncStorage.getItem("role");

      if (!token && role == "vendor") {
        router.replace("/vlogin");
      } else if (!token && role == "customer") {
        router.replace("/clogin");
      } else {
        router.replace("/index");
      }
    };

    return <WrappedComponent {...props} />;
  };
};

export default withAuthCheck;
