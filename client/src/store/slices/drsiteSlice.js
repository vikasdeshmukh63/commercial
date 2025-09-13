import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState = {
  items: [],
  totals: { totalMRC: 0, totalOTC: 0 },
  isLoading: false,
  error: null,
};

// Get DR Site items by oppId
export const getDRSiteItems = createAsyncThunk(
  'drsite/getDRSiteItems',
  async (oppId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/drsite/${oppId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Create DR Site item
export const createDRSiteItem = createAsyncThunk(
  'drsite/createDRSiteItem',
  async ({ oppId, itemData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/drsite/${oppId}`, itemData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Update DR Site item
export const updateDRSiteItem = createAsyncThunk(
  'drsite/updateDRSiteItem',
  async ({ oppId, id, itemData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/drsite/${oppId}/${id}`, itemData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Delete DR Site item
export const deleteDRSiteItem = createAsyncThunk(
  'drsite/deleteDRSiteItem',
  async ({ oppId, id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/drsite/${oppId}/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const drsiteSlice = createSlice({
  name: 'drsite',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get DR Site items
      .addCase(getDRSiteItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDRSiteItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        // Calculate totals
        const totalMRC = action.payload.data.reduce((sum, item) => sum + (item.mrc * item.quantity), 0);
        const totalOTC = action.payload.data.reduce((sum, item) => sum + (item.otc * item.quantity), 0);
        state.totals = { totalMRC, totalOTC };
      })
      .addCase(getDRSiteItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create DR Site item
      .addCase(createDRSiteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDRSiteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload.data);
      })
      .addCase(createDRSiteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update DR Site item
      .addCase(updateDRSiteItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.data._id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      // Delete DR Site item
      .addCase(deleteDRSiteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export const { reset } = drsiteSlice.actions;
export default drsiteSlice.reducer;