import React from 'react';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ListView';
import { store_url } from '../utils/constants';
import { useProductsContext } from '../context/product_context';
import Modal from './Modal';

const ListView = ({ products }) => {
  const {
    setEditProduct,
    deleteProduct,
    showModal,
    handleCloseModal,
    deleteFn,
    handleShowModal,
  } = useProductsContext();

  return (
    <Wrapper>
      {showModal && (
        <Modal
          handleCloseModal={handleCloseModal}
          handleDeleteItem={() => {
            deleteFn.callback(deleteFn.index);
          }}
        />
      )}
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
                  className="btn btn-safe"
                  onClick={() => setEditProduct(id)}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleShowModal(deleteProduct, id)}
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
