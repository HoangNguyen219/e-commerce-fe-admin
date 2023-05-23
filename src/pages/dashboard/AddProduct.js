import React, { useEffect } from 'react';
import {
  FormRow,
  FormRowSelect,
  Alert,
  Modal,
  FileInput,
  Loading,
} from '../../components';
import { useProductsContext } from '../../context/product_context';
import { useUserContext } from '../../context/user_context';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
import {
  ALERT_DANGER,
  ALERT_SUCCESS,
  booleanList,
  colorsObj,
} from '../../utils/constants';
import { FaTimes } from 'react-icons/fa';
import { toInt } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const {
    isEditing,
    createProduct,
    editProduct,
    product,
    categories,
    companies,
    uploadImage,
    handleShowModal,
    handleCloseModal,
    showModal,
    deleteFn,
  } = useProductsContext();

  const { displayAlert, alert, isLoading } = useUserContext();
  const [values, setValues] = useState({ ...product });
  const [primaryImageFile, setPrimaryImageFile] = useState(null);
  const [secondaryImagesFile, setSecondaryImagesFile] = useState([]);
  const [isReadySubmit, setIsReadySubmit] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let {
      name,
      price,
      categoryId,
      companyId,
      description,
      colorStocks,
    } = values;
    if (
      !name ||
      !price ||
      !description ||
      !colorStocks ||
      colorStocks.length === 0
    ) {
      displayAlert({
        alertText: 'Please provide all values',
        alertType: ALERT_DANGER,
      });
      return;
    }
    if (toInt(price) === 'NaN') {
      displayAlert({
        alertText: 'Please provide a valid number',
        alertType: ALERT_DANGER,
      });
      return;
    }
    colorStocks.forEach((cs) => {
      if (toInt(cs.stock) === 'NaN') {
        displayAlert({
          alertText: 'Please provide a valid number',
          alertType: ALERT_DANGER,
        });
        return;
      }
    });

    const color = colorStocks.map((cs) => cs.color);
    const set = new Set(color);
    if (color.length !== set.size) {
      displayAlert({
        alertText: 'Duplicate color in Color Stock',
        alertType: ALERT_DANGER,
      });
      return;
    }

    if (!isEditing) {
      setValues({
        ...values,
        categoryId: categoryId || categories[0].id,
        companyId: companyId || companies[0].id,
      });
      if (!primaryImageFile) {
        displayAlert({
          alertText: 'Please provide all values',
          alertType: ALERT_DANGER,
        });
      }
    }

    if (primaryImageFile) {
      await uploadImage({ file: primaryImageFile, isPrimary: true });
    }

    if (secondaryImagesFile.length > 0) {
      await Promise.all(
        secondaryImagesFile.map(async (file) => {
          await uploadImage({ file });
        })
      );
    }
    setIsReadySubmit(true);
  };

  useEffect(() => {
    if (isReadySubmit) {
      if (isEditing) {
        editProduct(values);
      } else {
        createProduct(values);
      }
    }
  }, [isReadySubmit]);

  useEffect(() => {
    if (alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    }
  }, [alert.alertType, navigate]);

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
      values.secondaryImages = values.secondaryImages || [];
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
        colorStocks: [...values.colorStocks, { color: 'black', stock: 0 }],
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
            <img src={values.primaryImage} alt="Primary" />
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
                    alt={`Secondary ${index}`}
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

export default AddProduct;
