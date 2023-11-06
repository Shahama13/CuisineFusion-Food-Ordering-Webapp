import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Actions/product";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { clearErrors } from "../Reducers/product";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    //  productCount
  } = useSelector((state) => state.products);

  const [isBlack, setIsBlack] = useState(true);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());

    const intervalId = setInterval(() => {
      setIsBlack((prevIsBlack) => !prevIsBlack);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Fabizo" />
          <div className="relative">
            <img src={require("../Assets/newarrival.png")} alt="" />
            <button
              onClick={() => navigate("/products")}
              className="absolute top-[50%] left-[30%] font-serif text-xl px-6 py-1"
              style={{
                backgroundColor: isBlack ? "black" : "white",
                color: isBlack ? "white" : "black",
              }}
            >
              CLICK HERE
            </button>
          </div>

          <h4 className="tracking-widest  bg-rose-50 m-5 font-serif md:text-2xl text-lg text-gray-800 p-2 text-center">
            THE LATEST
          </h4>
          <div className="flex flex-row items-center justify-center px-0 md:px-5 flex-wrap">
            {products &&
              [...products]
                .reverse()
                .slice(0, 4)
                .map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
          </div>

          <img src={require("../Assets/Best.png")} alt="" />

          <h4 className="tracking-widest  bg-slate-600 mx-5 mt-2 font-serif md:text-2xl text-lg text-white p-2 text-center">
            FEATURED
          </h4>

          <div className="mt-4 flex flex-row items-center justify-center px-0 md:px-5 flex-wrap">
            {products &&
              [...products]
                .reverse()
                .slice(4, 8)
                .map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
          </div>

          <h4
            onClick={() => navigate("/products")}
            className=" cursor-pointer tracking-widest overflow-hidden bg-slate-200 text-sm sm:text-lg hover:border-y-1 hover:border-slate-700 m-5  font-serif md:text-2xl text-slate-900 p-2 text-center "
          >
            BROWSE MORE CATEGORIES
          </h4>

          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
