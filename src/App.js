import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { ErrorPage } from './pages';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
