import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route index path="/dashboard" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
