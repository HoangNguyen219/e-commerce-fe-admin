import React from 'react';
const FormRow = ({
  className,
  type,
  name,
  value,
  handleChange,
  labelText,
  disabled,
}) => {
  return (
    <div className={`${className} form-row`}>
      {labelText && (
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
      )}
      <input
        id={name}
        {...(disabled ? { disabled: true } : {})}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
