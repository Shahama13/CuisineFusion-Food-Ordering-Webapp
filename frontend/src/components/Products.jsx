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
import { Slider, Typography } from "@mui/material";
import MetaData from "../MetaData";

const categories = ["Indian", "Chinese", "Italian", "Burgers", "Pizza"];

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [price, setPrice] = useState([0, 5000]);
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");

  const priceHandler = (event, value) => {
    setPrice(value);
    setCurrentPage(1);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error, filteredProductCount, resultPerPage } =
    useSelector((state) => state.products);
  const setCurrentPageNo = (e, value) => {
    setCurrentPage(value);
  };
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Browse Menu" />
          <div className="productsHeading"> Menu Items </div>
          <div className="midContent">
            <div className="filterBox">
              <Typography
                sx={{
                  marginBottom: " 4vmax",
                  marginLeft: " -2vmax",
                }}
              >
                Price
              </Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                aria-label="Price"
                valueLabelDisplay="on"
                sx={{
                  "& .css-nnid7-MuiSlider-valueLabel": {
                    color: "black",
                    backgroundColor: "#ebe5d5",
                  },
                }}
                step={1000}
                marks
                min={0}
                max={5000}
              />

              <Typography
                sx={{ cursor: "pointer", marginLeft: " -2vmax" }}
                onClick={() => setCategory("")}
              >
                Categories
              </Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => {
                      setCategory(category);
                      setCurrentPage(1);
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <Typography
                sx={{ marginLeft: " -2vmax" }}
                onClick={() => setRatings(0)}
              >
                {" "}
                Ratings above
              </Typography>
              <Slider
                value={ratings}
                onChange={(e, value) => {
                  setRatings(value);
                  setCurrentPage(1);
                }}
                sx={{
                  "& .css-nnid7-MuiSlider-valueLabel": {
                    color: "black",
                    backgroundColor: "#ebe5d5",
                  },
                }}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={5}
              />
            </div>

           
            {products && products.length >= 1 ? (
              <div className="products">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="foundNothing">No Items Found</div>
            )}
          </div>

          {resultPerPage < filteredProductCount && (
            <div className="paginationBox">
              <Stack spacing={2}>
                <Pagination
                  defaultPage={1}
                  page={currentPage}
                  onChange={setCurrentPageNo}
                  size="large"
                  color={"primary"}
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
