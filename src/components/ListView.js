import React from 'react';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ListView';

const ListView = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, primaryImage, name, price, description } = product;
        return (
          <article key={id}>
            <img src={primaryImage} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5 className="price">{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link to={`/products/${id}`} className="btn">
                Details
              </Link>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

export default ListView;
