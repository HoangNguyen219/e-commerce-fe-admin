import React from 'react';

const FileInput = ({ handleFileSelected, multiple, id }) => {
  return (
    <div>
      <input
        {...(multiple ? { multiple: true } : {})}
        type="file"
        accept="image/*"
        id={id}
        style={{ display: 'none' }}
        onChange={handleFileSelected}
      />
      <input
        className="btn btn-safe"
        type="button"
        value="Browse..."
        onClick={() => document.getElementById(id).click()}
      />
    </div>
  );
};

export default FileInput;
