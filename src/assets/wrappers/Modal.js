import styled from 'styled-components';
const Wrapper = styled.div`
  .modal {
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 2px solid var(--primary-500);
    width: fit-content;
    min-width: 40%;
  }

  .btn-modal {
    display: flex;
    justify-content: flex-end;
  }
  .mg {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
