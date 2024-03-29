import React, { useEffect } from 'react';
import { ReviewList, SearchContainerReview } from '../../components';
import { useOrdersContext } from '../../context/order_context';

const ReviewsPage = () => {
  const { clearFilters } = useOrdersContext();
  useEffect(() => {
    setTimeout(() => {
      clearFilters();
    }, 100);
  }, []);
  return (
    <>
      <SearchContainerReview />
      <ReviewList />
    </>
  );
};

export default ReviewsPage;
