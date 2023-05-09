import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import {
  ErrorPage,
  LoginPage,
  ProtectedRoute,
  SharedLayout,
  ProductsPage,
} from './pages';
import { AddProduct } from './pages/dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Stats />} /> */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
