import React from 'react';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/product_context';
import Modal from './Modal';
import { CATEGORIES } from '../utils/constants';

const Category = ({ categories }) => {
  const {
    setEditCategory,
    deleteCategory,
    showModal,
    handleCloseModal,
    deleteFn,
    handleShowModal,
    typePath,
  } = useProductsContext();

  return (
    <>
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
                      to={
                        typePath === CATEGORIES
                          ? '/add-category'
                          : '/add-company'
                      }
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
    </>
  );
};

export default Category;
