import React, { useEffect } from "react";
import "../styles/home.css";
import { BiSolidMouse } from "react-icons/bi";
import ProductCard from "../components/ProductCard";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Actions/product";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { clearErrors } from "../Reducers/product";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error,
    //  productCount 
    } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Cuisine Fusion" />
          <div className="banner">
            <div className="overlay"></div>
            <p id="heading">CuisineFusion</p>
            <h2>"Savor Exquisite Meals at Your Fingertips"</h2>
            <a href="#container">
              <button>
                Scroll <BiSolidMouse />
              </button>
            </a>
          </div>
          <h4 className="homeHeading">Top Rated Products</h4>
          <div className="container" id="container">
            {products?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
