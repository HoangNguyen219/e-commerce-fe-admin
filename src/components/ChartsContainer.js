import React from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useUserContext } from '../context/user_context';

const ChartsContainer = () => {
  const { popularProducts, revenue } = useUserContext();
  const popularProductsData = popularProducts.map((popularProduct) => {
    let { sold, product, revenue } = popularProduct;
    const name = product[0].name;
    revenue = revenue / 100;
    return { sold, name, revenue };
  });

  const revenueData = revenue.map((r) => {
    return { ...r, totalRevenue: r.totalRevenue / 100 };
  });

  return (
    <Wrapper>
      <h4>Popular products</h4>
      <BarChart data={popularProductsData} />
      <h4>Total Completed Orders</h4>
      <AreaChart data={revenueData} />
    </Wrapper>
  );
};

export default ChartsContainer;
