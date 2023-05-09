import React from 'react';
import { FormRow, FormRowSelect, Alert } from '../../components';
import { useProductsContext } from '../../context/product_context';
import { useUserContext } from '../../context/user_context';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
import { booleanList, colorsObj } from '../../utils/constants';
import { FaTimes } from 'react-icons/fa';

const AddProduct = () => {
  const {
    loading,
    isEditing,
    createJob,
    editJob,
    product,
    categories,
    companies,
  } = useProductsContext();

  // primaryImage: string;
  // secondaryImages: string[];
  // colorStocks: [IColorStock];

  const { showAlert, displayAlert } = useUserContext();
  const initialState = product;

  const [values, setValues] = useState(initialState);
  const [primaryImageFile, setPrimaryImageFile] = useState(null);
  const [secondaryImagesFile, setSecondaryImagesFile] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!position || !company || !productLocation) {
    //   displayAlert();
    //   return;
    // }
    // if (isEditing) {
    //   editJob();
    //   return;
    // }
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
    console.log(index);
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
            [name]: name === 'stock' ? parseInt(value) : value,
          };
        } else {
          return colorStock;
        }
      });
      console.log(colorStocks);
      return { ...values, colorStocks };
    });
  };
  const handleAddColorStock = () => {
    // setProduct(prevProduct => ({
    //   ...prevProduct,
    //   colorStocks: [...prevProduct.colorStocks, { color: '', stock: 0 }]
    // }));
  };

  const handleDeleteColorStock = (index) => {
    // setProduct(prevProduct => ({
    //   ...prevProduct,
    //   colorStocks: prevProduct.colorStocks.filter((colorStock, i) => i !== index)
    // }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((values) => {
      return { ...values, [name]: name === 'price' ? parseInt(value) : value };
    });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit product' : 'add product'}</h3>
        {showAlert && <Alert />}
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
          {product.colorStocks &&
            values.colorStocks.map((colorStock, index) => (
              <div key={index}>
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
                  onClick={() => handleDeleteColorStock(index)}
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
          <input
            id="primaryImage"
            type="file"
            accept="image/*"
            onChange={handlePrimaryImageChange}
          />
        </div>
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
                    onClick={() => handleSecondaryImageDelete(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleSecondaryImageChange}
            multiple
          />
        </div>
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
