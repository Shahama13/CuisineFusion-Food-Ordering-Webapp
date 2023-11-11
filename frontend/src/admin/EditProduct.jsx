import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import {
  CurrencyRupeeIcon,
  DocumentIcon,
  RectangleGroupIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearproductError, productReset } from "../Reducers/product";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails, updateProduct } from "../Actions/product";
import MetaData from "../MetaData";

const categories = [
  "Footwear",
  "Attire",
  "Children",
  "Perfumes",
  "Accessories",
  "Gadgets",
  "Home Decor",
];

const EditProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [category, setCategory] = useState(product?.category);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState(product?.images);
  const [imagePreview, setImagePreview] = useState([]);

  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  );

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      dispatch(updateProduct(name, price, description, category, params.id));
    } else {
      dispatch(
        updateProduct(name, price, description, category, params.id, images)
      );
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearproductError());
    }
    if (success) {
      toast.success("Product updated");
      dispatch(productReset());
      navigate("/admin/products");
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, error, success, navigate, params]);

  return (
    <>
      <MetaData title="Edit Product" />
      <TopBar />
      <div className="w-full items-center justify-center flex flex-col px-4 pt-2 md:p-0">
        <form
          encType="multipart/form-data"
          className="flex flex-col w-full mt-0 sm:mt-2 md:w-1/2  max-w-lg p-4 pt-1 sm:pt-4 pb-8 rounded-md bg-white shadow-lg "
          onSubmit={handlesubmit}
        >
          <div className="relative mb-3">
            <TagIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
            <input
              className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
              required
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative mb-3">
            <CurrencyRupeeIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
            <input
              className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="relative mb-3">
            <RectangleGroupIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
            <select
              value={category}
              className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories?.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="relative mb-3">
            <DocumentIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
            <textarea
              className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
              required
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center mb-3">
            <input
              className="text-sm text-gray-400"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={imageChange}
              multiple
            />
          </div>

          <div className="flex overflow-x-scroll">
            {oldImages?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                className="w-20 h-20"
                alt="Preview"
              />
            ))}
          </div>

          <div className="flex overflow-x-scroll">
            {imagePreview?.map((image, index) => (
              <img
                key={index}
                src={image}
                className="w-20 h-20"
                alt="Preview"
              />
            ))}
          </div>

          <button
            className="bg-black hover:bg-gray-600 w-full text-white font-serif py-2 mt-2"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? "Wait..." : "Update Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
