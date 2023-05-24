import styled from 'styled-components';

const Wrapper = styled.section`
  img {
    display: block;
    width: 150px;
    height: 100px;
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

  .btn-hipster {
    font-size: 0.8rem;
  }
`;

export default Wrapper;
