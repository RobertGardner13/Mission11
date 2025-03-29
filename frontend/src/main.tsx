import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'; // Only import BrowserRouter once

// Render the entire app with BrowserRouter
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 
      <App /> {/* App gets wrapped in BrowserRouter here */}
    </BrowserRouter>
  </StrictMode>,
);
