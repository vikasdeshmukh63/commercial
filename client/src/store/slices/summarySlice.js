import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState = {
  summaries: [],
  currentSummary: null,
  dashboardStats: null,
  isLoading: false,
  error: null,
};

// Get all summaries
export const getSummaries = createAsyncThunk(
  'summary/getSummaries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/summary`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Get summary by ID
export const getSummaryById = createAsyncThunk(
  'summary/getSummaryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/summary/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Get summary by oppId
export const getSummaryByOppId = createAsyncThunk(
  'summary/getSummaryByOppId',
  async (oppId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/summary/opp/${oppId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Create summary
export const createSummary = createAsyncThunk(
  'summary/createSummary',
  async (summaryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/summary`, summaryData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Update summary
export const updateSummary = createAsyncThunk(
  'summary/updateSummary',
  async ({ id, summaryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/summary/${id}`, summaryData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Delete summary
export const deleteSummary = createAsyncThunk(
  'summary/deleteSummary',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/summary/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
  'summary/getDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/summary/stats/dashboard`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    clearCurrentSummary: (state) => {
      state.currentSummary = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get summaries
      .addCase(getSummaries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSummaries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summaries = action.payload.data;
      })
      .addCase(getSummaries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get summary by ID
      .addCase(getSummaryById.fulfilled, (state, action) => {
        state.currentSummary = action.payload.data;
      })
      // Get summary by oppId
      .addCase(getSummaryByOppId.fulfilled, (state, action) => {
        state.currentSummary = action.payload.data;
      })
      // Create summary
      .addCase(createSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summaries.unshift(action.payload.data);
        state.currentSummary = action.payload.data;
      })
      .addCase(createSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update summary
      .addCase(updateSummary.fulfilled, (state, action) => {
        const index = state.summaries.findIndex(s => s._id === action.payload.data._id);
        if (index !== -1) {
          state.summaries[index] = action.payload.data;
        }
        state.currentSummary = action.payload.data;
      })
      // Delete summary
      .addCase(deleteSummary.fulfilled, (state, action) => {
        state.summaries = state.summaries.filter(s => s._id !== action.payload);
        if (state.currentSummary?._id === action.payload) {
          state.currentSummary = null;
        }
      })
      // Dashboard stats
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload.data;
      });
  },
});

export const { reset, clearCurrentSummary } = summarySlice.actions;
export default summarySlice.reducer;