import React from 'react';
import { IoBarChartSharp } from 'react-icons/io5';
import { FaProductHunt } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';
import { MdCategory } from 'react-icons/md';
import { MdOutlineHomeWork } from 'react-icons/md';
import { IoCart } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { capitalize } from './helpers';

export const links = [
  { id: 1, text: 'statistics', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'Products', path: 'products', icon: <FaProductHunt /> },
  { id: 4, text: 'Categories', path: 'categories', icon: <MdCategory /> },
  { id: 5, text: 'Companies', path: 'companies', icon: <MdOutlineHomeWork /> },
  { id: 6, text: 'Orders', path: 'orders', icon: <IoCart /> },
  { id: 3, text: 'Reviews', path: 'reviews', icon: <MdRateReview /> },
  { id: 7, text: 'Customers', path: 'customers', icon: <FaUser /> },
  { id: 8, text: 'Settings', path: 'settings', icon: <IoSettings /> },
];

const colors = [
  'black',
  'white',
  'gray',
  'brown',
  'red',
  'purple',
  'green',
  'olive',
  'yellow',
  'navy',
  'blue',
];

export const sorts = [
  { id: 'latest', name: 'Latest' },
  { id: 'oldest', name: 'Oldest' },
  { id: 'price-lowest', name: 'Price (Lowest)' },
  { id: 'price-highest', name: 'Price (Highest)' },
  { id: 'a-z', name: 'Name (A-Z)' },
  { id: 'z-a', name: 'Name (Z-A)' },
  { id: 'rating-lowest', name: 'Rating (Lowest)' },
  { id: 'rating-highest', name: 'Rating (Highest)' },
];

export const orderSorts = [
  { id: 'latest', name: 'Latest' },
  { id: 'oldest', name: 'Oldest' },
  { id: 'total-lowest', name: 'Total (Lowest)' },
  { id: 'total-highest', name: 'Total (Highest)' },
];

export const reviewSorts = [
  { id: 'latest', name: 'Latest' },
  { id: 'oldest', name: 'Oldest' },
  { id: 'rating-lowest', name: 'Rating (Lowest)' },
  { id: 'rating-highest', name: 'Rating (Highest)' },
];

export const customerSorts = [
  { id: 'latest', name: 'Latest' },
  { id: 'oldest', name: 'Oldest' },
  { id: 'a-z', name: 'Name (A-Z)' },
  { id: 'z-a', name: 'Name (Z-A)' },
  { id: 'order-lowest', name: 'Order (Lowest)' },
  { id: 'order-highest', name: 'Order (Highest)' },
  { id: 'review-lowest', name: 'Review (Lowest)' },
  { id: 'review-highest', name: 'Review (Highest)' },
];

export const categorySorts = [
  { id: 'latest', name: 'Latest' },
  { id: 'oldest', name: 'Oldest' },
  { id: 'a-z', name: 'Name (A-Z)' },
  { id: 'z-a', name: 'Name (Z-A)' },
  { id: 'product-lowest', name: 'Product (Lowest)' },
  { id: 'product-highest', name: 'Product (Highest)' },
];

export const booleanList = [
  { id: 'false', name: 'False' },
  { id: 'true', name: 'True' },
];

export const ratingList = [
  { id: '1', name: '1 star' },
  { id: '2', name: '2 stars' },
  { id: '3', name: '3 stars' },
  { id: '4', name: '4 stars' },
  { id: '5', name: '5 stars' },
];

export const processStatusList = [
  { id: 'pending', name: 'Pending' },
  { id: 'processing', name: 'Processing' },
  { id: 'shipped', name: 'Shipped' },
  { id: 'delivered', name: 'Delivered' },
  { id: 'completed', name: 'Completed' },
  { id: 'canceled', name: 'Canceled' },
  { id: 'returned', name: 'Returned' },
];

export const paymentStatusList = [
  { id: 'paid', name: 'Paid' },
  { id: 'unpaid', name: 'Unpaid' },
  { id: 'refunded', name: 'Refunded' },
];

export const paymentMethodList = [
  { id: 'cod', name: 'COD' },
  { id: 'paypal', name: 'PAYPAL' },
];

export const colorsObj = colors.map((color) => {
  return { id: color, name: capitalize(color) };
});

export const WHITE_DISPLAY = '#eeedec';
export const WHITE = 'white';

export const INCREASE = 'increase';
export const DECREASE = 'decrease';

export const ALERT_DANGER = 'danger';
export const ALERT_SUCCESS = 'success';

export const CATEGORIES = 'categories';
export const COMPANY = 'companies';

export const products_url = 'products';
export const categories_url = 'categories';
export const companies_url = 'companies';
export const auth_url = 'auth';
export const reviews_url = 'reviews';
export const address_url = 'addresses';
export const orders_url = 'orders';
export const users_url = 'users';

export const baseUrl = '/api/v1';

export const store_url = 'http://localhost:8000';
