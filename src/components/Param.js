import React from 'react';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/product_context';
import { useUserContext } from '../context/user_context';
import Modal from './Modal';

const Param = ({ params }) => {
  const {
    showModal,
    deleteFn,
    handleCloseModal,
    handleShowModal,
  } = useProductsContext();

  const { deleteParam, setEditParam } = useUserContext();
  return (
    <>
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
            <th>Name</th>
            <th>value</th>
            <th>description</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => {
            const { id, name, value, description, status } = param;
            return (
              <tr key={id}>
                <td className="noneTransform">{name}</td>
                <td className="noneTransform">{value}</td>
                <td className="noneTransform">{description}</td>
                <td>
                  <span className={status ? 'status green' : 'status red'}>
                    {status ? 'Active' : 'Inactive'}
                  </span>
                </td>

                <td>
                  <div className="actions">
                    <Link
                      to="/add-param"
                      className="btn btn-safe"
                      onClick={() => setEditParam(id)}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleShowModal(deleteParam, id)}
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

export default Param;
