import React from 'react';
import styled from 'styled-components';

const Customer = ({ customers }) => {
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>registration date</th>
            <th>number of orders</th>
            <th>number of reviews</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer) => {
              const {
                id,
                createdAt,
                name,
                email,
                ordersCount,
                reviewsCount,
              } = customer;
              return (
                <tr key={id}>
                  <td className="email">{name}</td>
                  <td className="email">{email}</td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                  <td>{ordersCount}</td>
                  <td>{reviewsCount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .email {
    text-transform: none;
  }
`;

export default Customer;
