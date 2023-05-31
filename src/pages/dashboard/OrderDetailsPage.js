import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useOrdersContext } from '../../context/order_context';
import {
  CartColumns,
  CartTotal,
  OrderItem,
  FormRowSelect,
  Loading,
  Alert,
} from '../../components';
import { useUserContext } from '../../context/user_context';
import { ALERT_SUCCESS, processStatusList } from '../../utils/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDetailsPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    getSingleOrder(id);
  }, [id]);
  const { getSingleOrder, order, editOrder } = useOrdersContext();
  const {
    shippingFee,
    subtotal,
    orderItems,
    processStatus,
    paymentStatus,
    addressId: addr,
    paymentMethod,
    createdAt,
  } = order;

  const { alert, isLoading } = useUserContext();

  const [value, setValue] = useState(processStatus);

  useEffect(() => {
    setValue(processStatus);
  }, [processStatus]);

  const handleUpdate = () => {
    editOrder({ processStatus: value });
  };

  useEffect(() => {
    if (alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        navigate(`/orders`);
      }, 2000);
    }
  }, [alert.alertType, navigate]);

  return (
    <Wrapper>
      <p>Order ID: {id}</p>

      <CartColumns />
      {orderItems &&
        orderItems.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      <hr />
      <section className="total">
        <div>
          <h4>Shipping Address</h4>
          {addr && (
            <p>
              Mobile: {addr.mobile} <br />
              Address: {addr.address} - {addr.city} - {addr.state} -{' '}
              {addr.country}
            </p>
          )}
          <h5>
            Order date:{' '}
            <span className="date">{new Date(createdAt).toLocaleString()}</span>
          </h5>

          <hr />
          <div className="info">
            <h5>
              Payment Method: <span className="method">{paymentMethod}</span>
            </h5>
            <h5>
              Payment Status:{' '}
              <span
                className={
                  paymentStatus === 'unpaid' || paymentStatus === 'canceled'
                    ? 'status red'
                    : 'status green'
                }
              >
                {paymentStatus}
              </span>
            </h5>
            <h5>
              processing Status:{' '}
              <span>
                <FormRowSelect
                  name="processStatus"
                  value={value}
                  disabled={isLoading}
                  handleChange={(e) => setValue(e.target.value)}
                  list={processStatusList}
                  className="inline"
                />
              </span>
              <span>
                <button className="btn btn-safe" onClick={handleUpdate}>
                  update
                </button>
              </span>
            </h5>
            {isLoading && <Loading />}
            {alert.showAlert && (
              <Alert alertText={alert.alertText} alertType={alert.alertType} />
            )}
          </div>
        </div>

        <CartTotal total={subtotal} shippingFee={shippingFee} />
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  background-color: white;
  padding: 2rem 2.5rem;

  .total {
    margin-top: 3rem;
    display: grid;
    row-gap: 2rem;
    @media (min-width: 1300px) {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
  }
  .info {
    margin-top: 1.25rem;
  }
  .btn {
    margin-left: 1rem;
  }
  .method {
    text-transform: uppercase;
  }
  .date {
    color: var(--primary-500);
    font-size: 1rem;
  }
`;

export default OrderDetailsPage;
