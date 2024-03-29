import React from 'react';
const FormRowSelect = ({
  className,
  labelText,
  name,
  value,
  handleChange,
  list,
  disabled,
}) => {
  return (
    <div className={`${className} form-row `}>
      {labelText && (
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        {...(disabled ? { disabled: true } : {})}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
