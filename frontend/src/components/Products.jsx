import React, { useEffect, useState } from "react";
import "../styles/products.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { toast } from "react-hot-toast";
import { clearErrors } from "../Reducers/product";
import { getProduct } from "../Actions/product";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { current } from "@reduxjs/toolkit";

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error,filteredProductCount, resultPerPage } = useSelector(
    (state) => state.products
  );
  const setCurrentPageNo = (e, value) => {
    setCurrentPage(value);
  };
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productsHeading"> Menu Items </div>
          <div className="products">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {filteredProductCount < resultPerPage ? (
            <div></div>
          ) : (
            <div className="paginationBox">
              <Stack spacing={2}>
                <Pagination
                  defaultPage={1}
                  page={currentPage}
                  onChange={setCurrentPageNo}
                  size="large"
                  color="primary"
                  count={Math.ceil(filteredProductCount / resultPerPage)}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          
          )}
        </>
      )}
    </>
  );
};

export default Products;
