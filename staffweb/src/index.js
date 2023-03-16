import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"

import './index.css';
import App from './App';
import BillContextProvider from './contexts/BillContext';
import AuthContextProvider from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <AuthContextProvider>
      <BillContextProvider>
        <App />
      </BillContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

