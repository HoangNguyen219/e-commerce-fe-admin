import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import { WHITE, WHITE_DISPLAY, store_url } from '../utils/constants';
import { Link } from 'react-router-dom';

const OrderItem = ({ item }) => {
  const { color, price, amount, itemTotal, name, image, productId } = item;
  const displayColor = color === WHITE ? WHITE_DISPLAY : color;

  return (
    <Wrapper>
      <div className="title">
        <img src={image} alt={name} />
        <div>
          <Link to={`${store_url}/products/${productId}`}>
            <h5 className="name">{name}</h5>
          </Link>
          <p className="color">
            color: <span style={{ background: displayColor }}></span>
          </p>
          <h5 className="price-small">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(price)}</h5>
      <h5>{amount}</h5>
      <h5 className="subtotal">{formatPrice(itemTotal)}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }
  .color {
    color: var(--grey-500);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--primary-500);
  }
  .name {
    color: var(--primary-500);
  }

  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(---grey-500);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--primary-500);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
  }
`;

export default OrderItem;
