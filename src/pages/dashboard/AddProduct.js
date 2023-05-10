import React from 'react';
import {
  FormRow,
  FormRowSelect,
  Alert,
  Modal,
  FileInput,
} from '../../components';
import { useProductsContext } from '../../context/product_context';
import { useUserContext } from '../../context/user_context';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
import { booleanList, colorsObj } from '../../utils/constants';
import { FaTimes } from 'react-icons/fa';
import { toInt } from '../../utils/helpers';

const AddProduct = () => {
  const {
    loading,
    isEditing,
    createJob,
    editJob,
    product,
    categories,
    companies,
    uploadImage,
  } = useProductsContext();

  const [showModal, setShowModal] = useState(false);
  const [deleteFn, setdeleteFn] = useState(null);

  const handleShowModal = (callback, index) => {
    setShowModal(true);
    setdeleteFn({ callback, index });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { showAlert, displayAlert, alertText, alertType } = useUserContext();

  const [values, setValues] = useState(product);
  const [primaryImageFile, setPrimaryImageFile] = useState(null);
  const [secondaryImagesFile, setSecondaryImagesFile] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let {
      name,
      price,
      categoryId,
      companyId,
      featured,
      freeShipping,
      description,
      colorStocks,
      primaryImage,
      secondaryImages,
    } = values;
    if (
      !name ||
      !price ||
      !description ||
      !colorStocks ||
      colorStocks.length === 0
    ) {
      displayAlert('Please provide all values');
      return;
    }
    if (toInt(price) === -1) {
      displayAlert('Please provide a valid number');
      return;
    }
    colorStocks.forEach((cs) => {
      if (toInt(cs.stock) === -1) {
        displayAlert('Please provide a valid number');
        return;
      }
    });

    if (primaryImageFile) {
      uploadImage({ file: primaryImageFile, isPrimary: true });
    }

    // createJob();
  };

  const handlePrimaryImageChange = (event) => {
    const file = event.target.files[0];
    setPrimaryImageFile(file);
    setValues((values) => {
      return { ...values, primaryImage: URL.createObjectURL(file) };
    });
  };

  const handleSecondaryImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSecondaryImagesFile([...secondaryImagesFile, ...files]);
    const secondaryImagesAdded = files.map((file) => URL.createObjectURL(file));
    setValues((values) => {
      values.secondaryImages = values.secondaryImages
        ? values.secondaryImages
        : [];
      return {
        ...values,
        secondaryImages: [...values.secondaryImages, ...secondaryImagesAdded],
      };
    });
  };

  const handleSecondaryImageDelete = (index) => {
    const newSecondaryImagesFile = [...secondaryImagesFile];
    newSecondaryImagesFile.splice(index, 1);
    setSecondaryImagesFile(newSecondaryImagesFile);
    setValues((values) => {
      values.secondaryImages.splice(index, 1);
      return {
        ...values,
        secondaryImages: values.secondaryImages,
      };
    });
  };

  const handleColorStockChange = (event, index) => {
    const { name, value } = event.target;

    setValues((values) => {
      const colorStocks = values.colorStocks.map((colorStock, i) => {
        if (i === parseInt(index)) {
          return {
            ...colorStock,
            [name]: value,
          };
        } else {
          return colorStock;
        }
      });
      return { ...values, colorStocks };
    });
  };
  const handleAddColorStock = () => {
    setValues((values) => {
      values.colorStocks = values.colorStocks || [];
      return {
        ...values,
        colorStocks: [...values.colorStocks, { color: '', stock: 0 }],
      };
    });
  };

  const handleDeleteColorStock = (index) => {
    setValues((values) => {
      return {
        ...values,
        colorStocks: values.colorStocks.filter((_, i) => i !== index),
      };
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((values) => {
      return { ...values, [name]: value };
    });
  };

  return (
    <Wrapper>
      {showModal && (
        <Modal
          handleCloseModal={handleCloseModal}
          handleDeleteItem={() => {
            deleteFn.callback(deleteFn.index);
          }}
        />
      )}
      <form className="form">
        <h3>{isEditing ? 'edit product' : 'add product'}</h3>
        <div className="form-center">
          {/* name */}
          <FormRow
            type="text"
            name="name"
            labelText="name"
            value={values.name}
            handleChange={handleInput}
          />
          {/* price */}
          <FormRow
            labelText="Price (cent)"
            type="text"
            name="price"
            value={values.price}
            handleChange={handleInput}
          />
          {/* category */}
          <FormRowSelect
            labelText="category"
            name="categoryId"
            value={values.categoryId && values.categoryId.id}
            handleChange={handleInput}
            list={categories}
          />
          {/* company */}
          <FormRowSelect
            labelText="company"
            name="companyId"
            value={values.companyId && values.companyId.id}
            handleChange={handleInput}
            list={companies}
          />
          {/* feature */}
          <FormRowSelect
            labelText="Featured"
            name="featured"
            value={values.featured}
            handleChange={handleInput}
            list={booleanList}
          />
          {/* free shiping */}
          <FormRowSelect
            labelText="free shiping"
            name="freeShipping"
            value={values.freeShipping}
            handleChange={handleInput}
            list={booleanList}
          />
        </div>
        {/* description */}
        <div className="form-row">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <textarea
            className="form-textarea"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInput}
          />
        </div>
        {/* colorStock */}
        <div className="form-row">
          <label className="form-label">Color Stock</label>
          {values.colorStocks &&
            values.colorStocks.map((colorStock, index) => (
              <div key={index} className="color-stock">
                <FormRowSelect
                  className="inline"
                  name="color"
                  value={colorStock.color}
                  handleChange={(e) => handleColorStockChange(e, index)}
                  list={colorsObj}
                />
                <FormRow
                  className="inline"
                  type="text"
                  name="stock"
                  value={colorStock.stock}
                  handleChange={(e) => handleColorStockChange(e, index)}
                />
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleShowModal(handleDeleteColorStock, index)}
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            type="button"
            className="btn btn-safe"
            onClick={handleAddColorStock}
          >
            Add Color Stock
          </button>
        </div>

        {/* primaryImage */}
        <div className="form-row">
          <label htmlFor="primaryImage" className="form-label">
            Primary image
          </label>
          {values.primaryImage && (
            <img src={values.primaryImage} alt="Primary image" />
          )}
          <FileInput
            handleFileSelected={handlePrimaryImageChange}
            id="primaryImage"
          />
        </div>
        {/* secondaryImages */}

        <div className="form-row">
          <label className="form-label">Secondary images</label>
          <div className="img-group">
            {values.secondaryImages &&
              values.secondaryImages.map((url, index) => (
                <div key={index} className="img-item">
                  <img
                    src={url}
                    alt={`Secondary image ${index}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                  <button
                    className="btn-delete"
                    type="button"
                    onClick={() =>
                      handleShowModal(handleSecondaryImageDelete, index)
                    }
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
          </div>
          <FileInput
            handleFileSelected={handleSecondaryImageChange}
            id="secondaryImages"
            multiple={true}
          />
        </div>
        {showAlert && <Alert alertText={alertText} alertType={alertType} />}

        <button
          type="submit"
          className="btn btn-block submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default AddProduct;
