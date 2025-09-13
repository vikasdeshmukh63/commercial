import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { reset } = discountSlice.actions;
export default discountSlice.reducer;