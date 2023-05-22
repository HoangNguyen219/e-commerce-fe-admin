import React, { useEffect } from 'react';
import {
  StatsContainer,
  Loading,
  ChartsContainer,
  SearchContainerStats,
} from '../../components';
import { useUserContext } from '../../context/user_context';
const StatisticsPage = () => {
  const { showStats, isLoading, startDateStr, endDateStr } = useUserContext();

  useEffect(() => {
    showStats();
  }, [startDateStr, endDateStr]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SearchContainerStats />
      <StatsContainer />
      <ChartsContainer />
    </>
  );
};

export default StatisticsPage;
