import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { useUserContext } from '../context/user_context';
import React from 'react';

const StatsContainer = () => {
  const { stats } = useUserContext();

  const defaultStats = [
    {
      title: 'Uncompleted Orders',
      count: stats.uncompleted || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Completed Orders',
      count: stats.completed || 0,
      icon: <FaCalendarCheck />,
      color: 'green',
      bcg: '#d1e7dd',
    },
    {
      title: 'Failed Orders',
      count: stats.failed || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
