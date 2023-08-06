import React, { useEffect } from "react";
import "../styles/products.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { toast } from "react-hot-toast";
import { clearErrors } from "../Reducers/product";
import { getProduct } from "../Actions/product";
import { useParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const params= useParams();
  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword));
  }, [dispatch, error,keyword]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productsHeading"> Menu Items </div>
          <div className="products">
            {products?.map ((product)=>(
                <ProductCard key={product._id} product={product}/>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
