import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import "../global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { Text, View } from "react-native";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    DMSans: require("../assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Bold": require("../assets/fonts/DMSans-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {/* <Stack /> */}
        <Stack>
          <Stack.Screen name="(customer)" options={{ headerShown: false }} />
          <Stack.Screen name="(vendor)" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );

  // return <RootLayoutNav />;
}

// function RootLayoutNav() {
//   // const colorScheme = useColorScheme();
//   return (
//     <Provider store={store}>
//       <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
//         <Stack />
//         {/* <Stack>
//           <Stack.Screen name="notifications" options={{ headerShown: false }} />
//         </Stack> */}
//       </PersistGate>
//     </Provider>
//   );
// }
