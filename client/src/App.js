import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Summary from './pages/Summary';
import Commercial from './pages/Commercial';
import DC from './pages/DC';
import DRSite from './pages/DRSite';
import Sizing from './pages/Sizing';
import Queries from './pages/Queries';
import RACI from './pages/RACI';
import Discount from './pages/Discount';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function AppContent() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="summary" element={<Summary />} />
          <Route path="commercial/:oppId" element={<Commercial />} />
          <Route path="dc/:oppId" element={<DC />} />
          <Route path="drsite/:oppId" element={<DRSite />} />
          <Route path="sizing/:oppId" element={<Sizing />} />
          <Route path="queries/:oppId" element={<Queries />} />
          <Route path="raci/:oppId" element={<RACI />} />
          <Route path="discount/:oppId" element={<Discount />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;