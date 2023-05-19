import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import styled from 'styled-components';

const Order = ({ orders }) => {
  const {} = useUserContext();

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
  .status {
    font-size: 0.8rem;
    padding: 2px;
  }
  .green {
    border: solid 1px green;
    color: green;
  }
  .red {
    border: solid 1px red;
    color: red;
  }
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
