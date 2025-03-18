import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) {
      return;
    }

    setImageLoading(true);
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        return ImageResponse.data.url;
      })
    );

    setData((prev) => ({
      ...prev,
      image: [...prev.image, ...uploadedImages],
    }));
    setImageLoading(false);
  };

  const handleDeleteImage = (index) => {
    setData((prev) => {
      const newImages = [...prev.image];
      newImages.splice(index, 1);
      return {
        ...prev,
        image: newImages,
      };
    });
  };

  const handleRemoveCategory = (index) => {
    setData((prev) => {
      const newCategories = [...prev.category];
      newCategories.splice(index, 1);
      return {
        ...prev,
        category: newCategories,
      };
    });
  };

  const handleRemoveSubCategory = (index) => {
    setData((prev) => {
      const newSubCategories = [...prev.subCategory];
      newSubCategories.splice(index, 1);
      return {
        ...prev,
        subCategory: newSubCategories,
      };
    });
  };

  const handleAddField = () => {
    setData((prev) => ({
      ...prev,
      more_details: {
        ...prev.more_details,
        [fieldName]: "",
      },
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Upload Product</h2>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="name" className="font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-gray-50 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-gray-50 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
            />
          </div>
          <div>
            <p className="font-medium text-gray-700">Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-gray-50 h-24 border border-gray-300 rounded flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
              >
                <div className="text-center flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} className="text-gray-500" />
                      <p className="text-gray-500">Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleUploadImage}
                />
              </label>
              <div className="flex flex-wrap gap-4 mt-4">
                {data.image.map((img, index) => (
                  <div
                    key={img + index}
                    className="h-20 w-20 min-w-20 bg-gray-50 border border-gray-300 relative group rounded overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={img}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setViewImageURL(img)}
                    />
                    <div
                      onClick={() => handleDeleteImage(index)}
                      className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-700 rounded text-white hidden group-hover:block cursor-pointer"
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="font-medium text-gray-700">Category</label>
            <div>
              <select
                className="bg-gray-50 border border-gray-300 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((prev) => ({
                    ...prev,
                    category: [...prev.category, category],
                  }));
                  setSelectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-3 mt-2">
                {data.category.map((c, index) => (
                  <div
                    key={c._id + index + "productsection"}
                    className="text-sm flex items-center gap-1 bg-gray-50 border border-gray-300 rounded p-2"
                  >
                    <p>{c.name}</p>
                    <div
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => handleRemoveCategory(index)}
                    >
                      <IoClose size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="font-medium text-gray-700">Sub Category</label>
            <div>
              <select
                className="bg-gray-50 border border-gray-300 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value
                  );

                  setData((prev) => ({
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory],
                  }));
                  setSelectSubCategory("");
                }}
              >
                <option value={""}>Select Sub Category</option>
                {allSubCategory.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-3 mt-2">
                {data.subCategory.map((c, index) => (
                  <div
                    key={c._id + index + "productsection"}
                    className="text-sm flex items-center gap-1 bg-gray-50 border border-gray-300 rounded p-2"
                  >
                    <p>{c.name}</p>
                    <div
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => handleRemoveSubCategory(index)}
                    >
                      <IoClose size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="unit" className="font-medium text-gray-700">
              Unit
            </label>
            <input
              id="unit"
              type="text"
              placeholder="Enter product unit"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-gray-50 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="stock" className="font-medium text-gray-700">
              Number of Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter product stock"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-gray-50 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="price" className="font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter product price"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-gray-50 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="discount" className="font-medium text-gray-700">
              Discount
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Enter product discount"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-gray-50 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/** Add more fields **/}
          {Object.keys(data.more_details).map((k) => (
            <div className="grid gap-2" key={k}>
              <label htmlFor={k} className="font-medium text-gray-700">
                {k}
              </label>
              <input
                id={k}
                type="text"
                value={data.more_details[k]}
                onChange={(e) => {
                  const value = e.target.value;
                  setData((prev) => ({
                    ...prev,
                    more_details: {
                      ...prev.more_details,
                      [k]: value,
                    },
                  }));
                }}
                required
                className="bg-gray-50 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>
          ))}

          <button className="bg-primary-100 hover:primary-200 text-black py-2 rounded font-semibold transition">
            Submit
          </button>
        </form>
      </div>

      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;