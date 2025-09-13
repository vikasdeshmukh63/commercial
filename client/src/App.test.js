import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

test('renders login page when not authenticated', () => {
  localStorageMock.getItem.mockReturnValue(null);
  
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  // Should redirect to login page
  expect(window.location.pathname).toBe('/');
});