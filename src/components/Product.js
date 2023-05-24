import React from 'react';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Product';
import { store_url } from '../utils/constants';
import { useProductsContext } from '../context/product_context';
import Modal from './Modal';

const Product = ({ products }) => {
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
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Company</th>
            <th>Color</th>
            <th>Featured</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              const {
                id,
                primaryImage,
                name,
                price,
                categoryId,
                companyId,
                colorStocks,
                featured,
                freeShipping,
              } = product;
              return (
                <tr key={id}>
                  <td>
                    <img src={primaryImage} alt={name} />
                  </td>
                  <td>
                    <a
                      href={`${store_url}/products/${id}`}
                      className="btn btn-hipster"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {name}
                    </a>
                  </td>
                  <td>{categoryId.name}</td>
                  <td>{companyId.name}</td>
                  <td>
                    {colorStocks.map((c) => {
                      return (
                        <p>
                          {c.color} : {c.stock}
                        </p>
                      );
                    })}
                  </td>
                  <td>{featured.toString()}</td>
                  <td className="price">{formatPrice(price)}</td>

                  <td>
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

export default Product;
