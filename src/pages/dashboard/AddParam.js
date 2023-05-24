import React, { useEffect } from 'react';
import { FormRow, Alert, Loading, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
import { ALERT_DANGER, ALERT_SUCCESS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user_context';
import { dataTypeList, booleanList } from '../../utils/constants';
import { toInt } from '../../utils/helpers';

const AddParam = () => {
  const {
    isLoading,
    alert,
    displayAlert,
    param,
    isEditing,
    editParam,
    createParam,
  } = useUserContext();

  const [values, setValues] = useState({ ...param });
  const [firstRender, setFirstRender] = useState(true);
  // let firstRender = true;

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, value, description, dataType, status } = values;
    if (!name || !description || !value || !dataType || !status) {
      displayAlert({
        alertText: 'Please provide all values',
        alertType: ALERT_DANGER,
      });
      return;
    }

    if (dataType === 'Number' && toInt(value) === 'NaN') {
      displayAlert({
        alertText: 'Please provide a valid number',
        alertType: ALERT_DANGER,
      });
      return;
    }

    if (isEditing) {
      editParam(values);
      return;
    }
    createParam(values);
  };

  useEffect(() => {
    if (!values.dataType) {
      setValues((values) => {
        return { ...values, dataType: 'Number' };
      });
    }
    if (!values.status) {
      setValues((values) => {
        return { ...values, status: 'false' };
      });
    }
  }, []);

  useEffect(() => {
    if (!firstRender) {
      if (values.dataType === 'Boolean') {
        setValues((values) => {
          return { ...values, value: 'false' };
        });
      }
      if (values.dataType !== 'Boolean') {
        setValues((values) => {
          return { ...values, value: '' };
        });
      }
    } else {
      setFirstRender(false);
    }
  }, [values.dataType]);

  useEffect(() => {
    if (alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        navigate(`/settings`);
      }, 2000);
    }
  }, [alert.alertType, navigate]);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit' : 'add'} Parameter</h3>
        <div className="form-center">
          {/* name */}
          <FormRow
            type="text"
            name="name"
            disabled={isLoading}
            labelText="name"
            value={values.name}
            handleChange={handleInput}
          />

          {/* dataType */}
          <FormRowSelect
            labelText="data Type"
            disabled={isLoading}
            name="dataType"
            value={values.dataType}
            handleChange={handleInput}
            list={dataTypeList}
          />

          {/* value */}
          {values.dataType === 'Boolean' ? (
            <FormRowSelect
              labelText="value"
              disabled={isLoading}
              name="value"
              value={values.value}
              handleChange={handleInput}
              list={booleanList}
            />
          ) : (
            <FormRow
              type="text"
              name="value"
              disabled={isLoading}
              labelText="value"
              value={values.value}
              handleChange={handleInput}
            />
          )}

          {/* description */}
          <FormRow
            type="text"
            name="description"
            disabled={isLoading}
            labelText="description"
            value={values.description}
            handleChange={handleInput}
          />

          {/* status */}
          <FormRowSelect
            labelText="Active"
            name="status"
            disabled={isLoading}
            value={values.status}
            handleChange={handleInput}
            list={booleanList}
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

export default AddParam;
