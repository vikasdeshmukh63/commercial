import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState = {
  items: [],
  totals: { totalMRC: 0, totalOTC: 0 },
  isLoading: false,
  error: null,
};

// Get commercial items by oppId
export const getCommercialItems = createAsyncThunk(
  'commercial/getCommercialItems',
  async (oppId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/commercial/${oppId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Create commercial item
export const createCommercialItem = createAsyncThunk(
  'commercial/createCommercialItem',
  async ({ oppId, itemData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/commercial/${oppId}`, itemData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Update commercial item
export const updateCommercialItem = createAsyncThunk(
  'commercial/updateCommercialItem',
  async ({ oppId, id, itemData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/commercial/${oppId}/${id}`, itemData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Delete commercial item
export const deleteCommercialItem = createAsyncThunk(
  'commercial/deleteCommercialItem',
  async ({ oppId, id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/commercial/${oppId}/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const commercialSlice = createSlice({
  name: 'commercial',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommercialItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCommercialItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.totals = action.payload.totals;
      })
      .addCase(getCommercialItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCommercialItem.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(updateCommercialItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(deleteCommercialItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export const { reset } = commercialSlice.actions;
export default commercialSlice.reducer;