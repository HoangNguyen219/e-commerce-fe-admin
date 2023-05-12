import React, { useEffect } from 'react';
import { FormRow, Alert, Loading } from '../../components';
import { useProductsContext } from '../../context/product_context';
import { useUserContext } from '../../context/user_context';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
import { ALERT_DANGER, ALERT_SUCCESS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const {
    isEditing,
    category,
    editCategory,
    createCategory,
  } = useProductsContext();

  const { displayAlert, alert, isLoading } = useUserContext();
  const [values, setValues] = useState({ ...category });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name } = values;
    if (!name) {
      displayAlert({
        alertText: 'Please provide all values',
        alertType: ALERT_DANGER,
      });
      return;
    }
    if (isEditing) {
      editCategory(values);
      return;
    }
    createCategory(values);
  };

  useEffect(() => {
    if (alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        navigate('/categories');
      }, 2000);
    }
  }, [alert.alertType, navigate]);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit' : 'add'} category</h3>
        <div className="form-center">
          {/* name */}
          <FormRow
            type="text"
            name="name"
            labelText="name"
            value={values.name}
            handleChange={handleInput}
          />
        </div>
        {alert.showAlert && (
          <Alert alertText={alert.alertText} alertType={alert.alertType} />
        )}

        {isLoading && <Loading />}
        <button
          type="submit"
          className="btn btn-block submit-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default AddCategory;
