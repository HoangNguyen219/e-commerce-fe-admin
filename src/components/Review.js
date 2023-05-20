import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Stars from './Stars';

const Review = ({ reviews }) => {
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Review date</th>
          </tr>
        </thead>
        <tbody>
          {reviews &&
            reviews.map((review) => {
              const {
                id,
                createdAt,
                productId,
                rating,
                comment,
                userId,
              } = review;
              return (
                <tr key={id}>
                  <td className="email">{userId && userId.email}</td>
                  <td>{productId && productId.name}</td>
                  <td>
                    <Stars stars={rating} />
                  </td>
                  <td>{comment.substring(0, 100)}</td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .btn {
    font-size: 0.7rem;
  }
  .email {
    text-transform: none;
  }
`;

export default Review;
