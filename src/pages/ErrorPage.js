import React from 'react';
import Wrapper from '../assets/wrappers/ErrorPage';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Wrapper className="full-page">
      <section>
        <h1>404</h1>
        <h3>Sorry, the page cannot be found</h3>
        <Link to="/" className="btn">
          Back home
        </Link>
      </section>
    </Wrapper>
  );
};

export default ErrorPage;
