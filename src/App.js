import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import {
  ErrorPage,
  LoginPage,
  ProtectedRoute,
  SharedLayout,
  ProductsPage,
  AddProduct,
  CategoriesPage,
  AddCategory,
  OrderPage,
  OrdersPage,
} from './pages';
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
          <Route path="orders" element={<OrdersPage />} />

          <Route
            path="categories"
            element={<CategoriesPage typePath="categories" />}
          />
          <Route
            path="add-category"
            element={<AddCategory typePath="categories" />}
          />
          <Route
            path="companies"
            element={<CategoriesPage typePath="companies" />}
          />
          <Route
            path="add-company"
            element={<AddCategory typePath="companies" />}
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
