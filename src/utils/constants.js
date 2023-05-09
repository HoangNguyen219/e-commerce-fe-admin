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
  { id: 3, text: 'Reviews', path: 'reviews', icon: <MdRateReview /> },
  { id: 4, text: 'Categories', path: 'categories', icon: <MdCategory /> },
  { id: 5, text: 'Companies', path: 'companies', icon: <MdOutlineHomeWork /> },
  { id: 6, text: 'Orders', path: 'orders', icon: <IoCart /> },
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
  { id: 'price-lowest', name: 'Price (Lowest)' },
  { id: 'price-highest', name: 'Price (Highest)' },
  { id: 'a-z', name: 'Name (A-Z)' },
  { id: 'z-a', name: 'Name (Z-A)' },
  { id: 'latest', name: 'Lastest' },
  { id: 'oldest', name: 'Oldest' },
  { id: 'rating-lowest', name: 'Rating (Lowest)' },
  { id: 'rating-highest', name: 'Rating (Highest)' },
];

export const booleanList = [
  { id: 'false', name: 'False' },
  { id: 'true', name: 'True' },
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

export const products_url = '/api/v1/products';
export const categories_url = '/api/v1/categories';
export const companies_url = '/api/v1/companies';
export const auth_url = '/api/v1/auth';

export const store_url = 'http://localhost:8000';
