import React from 'react';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ListView';
import { store_url } from '../utils/constants';
import { useProductsContext } from '../context/product_context';

const ListView = ({ products }) => {
  const { setEditProduct, deleteProduct } = useProductsContext();
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

              <div className="actions">
                <Link
                  to="/add-product"
                  className="btn edit-btn"
                  onClick={() => setEditProduct()}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => deleteProduct()}
                >
                  Delete
                </button>
                <Link to={`${store_url}/products/${id}`} className="btn">
                  Live View
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

export default ListView;
