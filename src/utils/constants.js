import React from 'react';
import { IoBarChartSharp } from 'react-icons/io5';
import { FaProductHunt } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';
import { MdCategory } from 'react-icons/md';
import { MdOutlineHomeWork } from 'react-icons/md';
import { IoCart } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

export const links = [
  { id: 1, text: 'statistics', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'Products', path: 'products', icon: <FaProductHunt /> },
  { id: 2, text: 'Reviews', path: 'reviews', icon: <MdRateReview /> },
  { id: 3, text: 'Categories', path: 'categories', icon: <MdCategory /> },
  { id: 4, text: 'Companies', path: 'companies', icon: <MdOutlineHomeWork /> },
  { id: 5, text: 'Orders', path: 'orders', icon: <IoCart /> },
  { id: 6, text: 'Customers', path: 'customers', icon: <FaUser /> },
  { id: 7, text: 'Settings', path: 'settings', icon: <IoSettings /> },
];

export const colors = [
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
