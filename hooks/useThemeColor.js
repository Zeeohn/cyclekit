import {
  handleThemeColor,
  handleColorScheme,
  toggleColorScheme,
} from "../store/layout";
import { useDispatch, useSelector } from "react-redux";

export const useThemeColor = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.layout);

  const setThemeColor = (value) => {
    dispatch(handleThemeColor(value));
  };

  const setColorScheme = (scheme) => {
    dispatch(handleColorScheme(scheme));
  };

  const toggleColorMode = () => {
    dispatch(toggleColorScheme());
  };

  return {
    themeColor: store.themeColor,
    setThemeColor,
    colorScheme: store.colorScheme,
    setColorScheme,
    toggleColorMode,
  };
};
