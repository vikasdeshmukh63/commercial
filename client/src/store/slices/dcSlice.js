import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState = {
  items: [],
  totals: { totalMRC: 0, totalOTC: 0 },
  isLoading: false,
  error: null,
};

// Get DC items by oppId
export const getDCItems = createAsyncThunk(
  'dc/getDCItems',
  async (oppId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/dc/${oppId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Create DC item
export const createDCItem = createAsyncThunk(
  'dc/createDCItem',
  async ({ oppId, itemData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/dc/${oppId}`, itemData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Update DC item
export const updateDCItem = createAsyncThunk(
  'dc/updateDCItem',
  async ({ oppId, id, itemData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/dc/${oppId}/${id}`, itemData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Delete DC item
export const deleteDCItem = createAsyncThunk(
  'dc/deleteDCItem',
  async ({ oppId, id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/dc/${oppId}/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const dcSlice = createSlice({
  name: 'dc',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get DC items
      .addCase(getDCItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDCItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        // Calculate totals
        const totalMRC = action.payload.data.reduce((sum, item) => sum + (item.mrc * item.quantity), 0);
        const totalOTC = action.payload.data.reduce((sum, item) => sum + (item.otc * item.quantity), 0);
        state.totals = { totalMRC, totalOTC };
      })
      .addCase(getDCItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create DC item
      .addCase(createDCItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDCItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload.data);
      })
      .addCase(createDCItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update DC item
      .addCase(updateDCItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      // Delete DC item
      .addCase(deleteDCItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export const { reset } = dcSlice.actions;
export default dcSlice.reducer;