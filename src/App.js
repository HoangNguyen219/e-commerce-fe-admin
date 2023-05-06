import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { ErrorPage, LoginPage } from './pages';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
