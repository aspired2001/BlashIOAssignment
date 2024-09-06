// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LayoutProvider } from './context/LayoutContext';
import HomePage from './pages/HomePage';
import PublishedPage from './pages/PublishedPage';

const App = () => {
  return (
    <Router>
      <LayoutProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/published/:layoutId" element={<PublishedPage />} />
        </Routes>
      </LayoutProvider>
    </Router>
  );
};

export default App;
