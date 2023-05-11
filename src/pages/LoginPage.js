import React from 'react';
import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert, Loading } from '../components';
import Wrapper from '../assets/wrappers/LoginPage';
import { useUserContext } from '../context/user_context';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { loginUser, user, displayAlert, isLoading, alert } = useUserContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      displayAlert('Please provide all values');
      return;
    }
    const currentUser = { email, password };
    loginUser(currentUser);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {alert.showAlert && (
          <Alert alertText={alert.alertText} alertType={alert.alertType} />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {isLoading && <Loading />}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Login
        </button>
      </form>
    </Wrapper>
  );
};
export default LoginPage;
