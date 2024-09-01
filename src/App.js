// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Coding from './Coding';
import Mock from './Mock';
import Navbar from './Navbar';
import Login from './Login';
import { Bot } from './Bot';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Mock />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/login" element={<Login />} />
          {/* Add routes for other components as needed */}
        </Routes>
      </div>
      {/* Render the Bot component outside of the Routes */}
      <Bot />
    </Router>
  );
}

export default App;
