import React from 'react';
import Wrapper from '../assets/wrappers/Modal';

const Modal = ({ handleCloseModal, handleDeleteItem, message }) => {
  return (
    <Wrapper>
      <div className="modal" onClick={handleCloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p>{message || 'Delete this item?'}</p>

          <div className="btn-modal">
            <button className="btn btn-safe mg" onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeleteItem();
                handleCloseModal();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Modal;
