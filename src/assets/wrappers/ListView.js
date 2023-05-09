import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  img {
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--borderRadius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--primary-400);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }

  .btn {
    margin-right: 0.5rem;
    font-size: 0.7rem;
  }

  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default Wrapper;
