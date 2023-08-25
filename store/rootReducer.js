import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import layout from "./layout";

const persistConfig = {
  key: "layout",
  storage: AsyncStorage,
};

const rootReducer = {
  layout: persistReducer(persistConfig, layout),
};

export default rootReducer;
