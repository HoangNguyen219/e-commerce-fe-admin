import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { ErrorPage, LoginPage, ProtectedRoute } from './pages';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute>{/* <SharedLayout /> */}</ProtectedRoute>}
        >
          {/* <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
