import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const sizingSlice = createSlice({
  name: 'sizing',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { reset } = sizingSlice.actions;
export default sizingSlice.reducer;