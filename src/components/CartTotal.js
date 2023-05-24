import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';

const CartTotal = ({ total, shippingFee }) => {
  return (
    <Wrapper>
      <article>
        <h5>
          subtotal: <span>{formatPrice(total)}</span>
        </h5>
        <p>
          shipping fee: <span>{formatPrice(shippingFee)}</span>
        </p>
        <hr />
        <h4>
          order total: <span>{formatPrice(total + shippingFee)}</span>
        </h4>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  article {
    border: 1px solid var(--grey-300);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
    min-width: fit-content;
    max-width: 400px;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
`;

export default CartTotal;
