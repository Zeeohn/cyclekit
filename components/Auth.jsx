import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, Link, router, Redirect } from "expo-router";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

const withAuthCheck = (WrappedComponent) => {
  return (props) => {
    const [authToken, setAuthToken] = useState("");
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
      checkAuth();
    }, []);

    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const role = await AsyncStorage.getItem("role");

      if (!token && role == "vendor") {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Oh-Uh",
          button: "Ok",
          textBody: "Vendor session has expired! Login again!",
        });
        return router.replace("/vlogin");
      } else if (!token && role == "customer") {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Oh-Uh",
          button: "Ok",
          textBody: "Customer session has expired! Login again!",
        });
        return router.replace("/clogin");
      } else if (!role && !token) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Oh-Uh",
          button: "Ok",
          textBody: "Your session has expired! Login again!",
        });
        return router.replace("/app/");
      }

      setAuthToken(token);
      setUserRole(role);
    };

    return (
      <WrappedComponent {...props} authToken={authToken} userRole={userRole} />
    );
  };
};

export default withAuthCheck;
