import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CategoriesProvider } from './context/CategoriesContext';
import { UserTopicsProvider } from './context/UserTopicsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoriesProvider>
      <UserTopicsProvider>
      <App />
      </UserTopicsProvider>
    </CategoriesProvider>
  </React.StrictMode>
);