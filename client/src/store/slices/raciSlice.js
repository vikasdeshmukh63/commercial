import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const raciSlice = createSlice({
  name: 'raci',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { reset } = raciSlice.actions;
export default raciSlice.reducer;