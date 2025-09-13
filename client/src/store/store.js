import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import summaryReducer from './slices/summarySlice';
import commercialReducer from './slices/commercialSlice';
import dcReducer from './slices/dcSlice';
import drsiteReducer from './slices/drsiteSlice';
import sizingReducer from './slices/sizingSlice';
import queryReducer from './slices/querySlice';
import raciReducer from './slices/raciSlice';
import discountReducer from './slices/discountSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    summary: summaryReducer,
    commercial: commercialReducer,
    dc: dcReducer,
    drsite: drsiteReducer,
    sizing: sizingReducer,
    query: queryReducer,
    raci: raciReducer,
    discount: discountReducer,
  },
});