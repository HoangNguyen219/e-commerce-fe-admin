import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';
import styled from 'styled-components';

const Order = ({ orders }) => {
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Processing Status</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Order date</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              const {
                id,
                processStatus,
                total,
                paymentMethod,
                paymentStatus,
                createdAt,
                userId,
              } = order;
              return (
                <tr key={id}>
                  <td className="email">{userId && userId.email}</td>
                  <td>
                    <span
                      className={
                        processStatus === 'pending' ||
                        processStatus === 'canceled' ||
                        processStatus === 'returned'
                          ? 'status red'
                          : 'status green'
                      }
                    >
                      {processStatus}{' '}
                    </span>
                  </td>

                  <td className="method">{paymentMethod}</td>
                  <td>
                    <span
                      className={
                        paymentStatus === 'unpaid' ||
                        paymentStatus === 'canceled'
                          ? 'status red'
                          : 'status green'
                      }
                    >
                      {paymentStatus}{' '}
                    </span>
                  </td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                  <td>{formatPrice(total)}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/orders/${id}`} className="btn btn-safe">
                        View details
                      </Link>
                    </div>
                  </td>
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
  .method {
    text-transform: uppercase;
  }
`;

export default Order;
