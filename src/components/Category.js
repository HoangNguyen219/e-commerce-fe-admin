import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ListView';
import { useProductsContext } from '../context/product_context';
import Modal from './Modal';

const Category = ({ categories }) => {
  const {
    setEditCategory,
    deleteCategory,
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
          message="Deleting this item will also delete all products that belong to it. Are you sure you want to proceed with the deletion?"
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const { id, name, productCount } = category;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{productCount}</td>
                <td>
                  <div className="actions">
                    <Link
                      to="/add-category"
                      className="btn btn-safe"
                      onClick={() => setEditCategory(id)}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleShowModal(deleteCategory, id)}
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

export default Category;
