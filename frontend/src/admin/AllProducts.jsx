import React, { useEffect } from "react";
import TopBar from "./TopBar";
import { deleteProduct, getAllAdminProducts } from "../Actions/product";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearErrors,
  clearremoveError,
  removeReset,
} from "../Reducers/product";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import MetaData from "../MetaData";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, adminProducts } = useSelector((state) => state.products);
  const {
    loading,
    success,
    error: deleteError,
  } = useSelector((state) => state.removeProduct);

  useEffect(() => {
    dispatch(getAllAdminProducts());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearremoveError());
    }
    if (success) {
      dispatch(removeReset());
    }
  }, [dispatch, error, success, deleteError]);
  return (
    <>
      <MetaData title="All Products" />
      <TopBar />
      <div className="overflow-x-scroll">
        <div className="flex justify-between text-sm sm:text-base mx-3 mb-6 text-center bg-teal-50 overflow-x-scroll min-w-[634px]">
          <div className="w-52">ID</div>
          <div className="w-36">NAME</div>
          <div className="w-16">PRICE</div>
          <div>ACTIONS</div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          adminProducts?.map((product) => (
            <div
              key={product._id}
              className="flex justify-between text-xs sm:text-sm  mx-3 mb-2 text-center py-1 bg-blue-50 min-w-[634px]"
            >
              <div className="w-52">{product._id}</div>
              <Link to={`/product/${product._id}`} className="w-36">
                {product.name}
              </Link>
              <div className="w-16">{product.price}</div>
              <div className="flex items-center justify-center">
                <PencilSquareIcon
                  onClick={() => navigate(`/admin/product/${product._id}`)}
                  className="md:h-5 md:w-5 h-4 w-4 text-gray-500 hover:text-gray-800 mr-4"
                />
                <TrashIcon
                  onClick={() => {
                    dispatch(deleteProduct(product._id));
                  }}
                  className="md:h-5 md:w-6 h-4 w-4 text-red-300  hover:text-red-700"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AllProducts;
