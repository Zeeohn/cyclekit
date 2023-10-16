import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      return true;
    },
    stopLoading: (state) => {
      return false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
