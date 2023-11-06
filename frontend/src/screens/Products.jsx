import React, { useEffect, useState } from "react";
import "../styles/products.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { toast } from "react-hot-toast";
import { clearErrors } from "../Reducers/product";
import { getProduct } from "../Actions/product";
import { useParams } from "react-router-dom";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import { Slider } from "@mui/material";

const categories = ["Indian", "Chinese", "Italian", "Burgers", "Pizza"];

const Products = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(true);
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
        <div className="mt-5">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-center space-x-2 bg-slate-200 text-sm text-black ml-3 px-2 py-1 rounded-md border-1 border-gray-500"
          >
            {showFilter ? "HIDE FILTERS " : "SHOW FILTERS"}
            <AdjustmentsHorizontalIcon class="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex">
            {showFilter && (
              <div className="w-[390px] pl-4 mt-2">
                <Accordion className="w-full ">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <p className="">PRICE</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="on"
                      sx={{
                        "& .css-nnid7-MuiSlider-valueLabel": {
                          color: "black",
                          backgroundColor: "#e2e8f0",
                        },
                      }}
                      step={1000}
                      marks
                      min={0}
                      max={5000}
                    />
                  </AccordionDetails>
                </Accordion>

                <Accordion className="w-full ">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <p
                      className="cursor-pointer"
                      onClick={() => setCategory("")}
                    >
                      CATEGORIES
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li
                          className=""
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
                  </AccordionDetails>
                </Accordion>

                <Accordion className="w-full ">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <p onClick={() => setRatings(0)}>RATINGS</p>
                  </AccordionSummary>
                  <AccordionDetails>
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
                  </AccordionDetails>
                </Accordion>
              </div>
            )}

            {products && products.length >= 1 ? (
              <div className="flex flex-row flex-wrap items-center m-1">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="self-center ml-[30%] font-serif text-3xl text-slate-500">No Items Found</div>
            )}
          </div>

          {/* {resultPerPage < filteredProductCount && (
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
          )} */}
        </div>
      )}
    </>
  );
};

export default Products;
