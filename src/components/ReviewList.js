import React, { useEffect } from 'react';
import { useUserContext } from '../context/user_context';
import { useOrdersContext } from '../context/order_context';
import Loading from './Loading';
import Review from './Review';
import PageBtnContainer from './PageBtnContainer';

const ReviewList = () => {
  const { isLoading, isError } = useUserContext();
  const {
    getReviews,
    reviews: { reviews, totalReviews, numOfPages },
    page,
    sort,
    product,
    rating,
    customer,
    changePage,
  } = useOrdersContext();

  useEffect(() => {
    getReviews();
  }, [page, sort, customer, product, rating]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h4 style={{ textTransform: 'none' }}>There was an error...</h4>;
  }

  if (reviews.length < 1) {
    return <h4 style={{ textTransform: 'none' }}>No reviews to display...</h4>;
  }
  return (
    <>
      <h5 className="inline">
        {totalReviews} review
        {totalReviews > 1 && 's'} found
      </h5>
      <Review reviews={reviews} />
      {numOfPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfPages}
          page={page}
          changePage={changePage}
        />
      )}
    </>
  );
};

export default ReviewList;
