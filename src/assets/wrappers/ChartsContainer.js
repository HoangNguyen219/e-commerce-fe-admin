import styled from 'styled-components';

const Wrapper = styled.section`
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    margin-top: 4rem;
    text-align: center;
  }
  /* .recharts-wrapper {
    z-index: -99;
  } */
`;

export default Wrapper;
