import { Redirect, Stack, router } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function Index() {
  const vendorRoute = () => {
    router.push("/(vendor)");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#7b091c" },
          headerBackVisible: false,
          title: "",
          headerShadowVisible: false,
        }}
      />
      <View className="bg-[#7b091c] flex flex-1 items-center">
        <Image
          className="w-16 h-16"
          source={require("../assets/images/logo.png")}
          style={{ tintColor: "white" }}
        />
        <View className="items-center">
          <Text className="text-white my-8 font-mediumFont text-3xl">
            Welcome
          </Text>
          <Text className="text-white mb-16 font-mediumFont text-xl">
            Click here to sign in as a vendor:
          </Text>
          <TouchableOpacity
            onPress={vendorRoute}
            className="rounded-md px-4 py-2 bg-white"
          >
            <Text className="text-[#7b091c] font-mediumFont text-lg">
              Vendor
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  // const type = "vendor";
  // if (type == "vendor") {
  //   return router.push("/(vendor)");
  //   // return <Redirect href={"/(vendor)"} />;
  // }
  // //   return <Redirect href={"/(customer)"} />;
  // return router.push("/(customer)");
}
