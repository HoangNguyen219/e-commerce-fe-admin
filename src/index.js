import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/user_context';
import { ProductsProvider } from './context/product_context';
import { OrdersProvider } from './context/order_context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <ProductsProvider>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </ProductsProvider>
  </UserProvider>
);
