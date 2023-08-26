import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    themeColor: "#7b091c",
  },
  reducers: {
    handleThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
  },
});

export const { handleThemeColor } = layoutSlice.actions;

export default layoutSlice.reducer;
