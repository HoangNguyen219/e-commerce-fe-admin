import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  img {
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--borderRadius);
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 1rem;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  .img-group {
    display: flex;
    flex-wrap: wrap;
    border: 2px dashed gray;
    padding: 16px;
    margin-bottom: 1rem;
  }
  .img-item {
    position: relative;
    margin-right: 1rem;
    img {
      margin-bottom: 0;
    }
  }

  .btn-delete {
    position: absolute;
    top: -0.8rem;
    right: -0.8rem;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    color: var(--red-dark);
    cursor: pointer;
  }

  .color-stock {
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 1fr 1fr auto;
    button {
      height: fit-content;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
