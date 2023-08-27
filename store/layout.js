import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    themeColor: "#7b091c",
    colorScheme: "#121212",
  },
  reducers: {
    handleThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    handleColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    },
    toggleColorScheme: (state) => {
      state.colorScheme =
        state.colorScheme === "#f2f2f2" ? "#121212" : "#f2f2f2";
    },
  },
});

export const { handleThemeColor, handleColorScheme, toggleColorScheme } =
  layoutSlice.actions;

export default layoutSlice.reducer;
