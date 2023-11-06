import React, { useEffect, useState } from 'react'
import { Slider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearErrors } from "../Reducers/product";
import { getProduct } from "../Actions/product";

const categories = ["Indian", "Chinese", "Italian", "Burgers", "Pizza"];


const FilterSection = React.memo(() => {
    const dispatch = useDispatch()
    const params = useParams()
   const [price, setPrice] = useState([0, 5000]);
   const [ratings, setRatings] = useState(0);
   const [category, setCategory] = useState("");
     const priceHandler = (event, value) => {
       setPrice(value);
       setCurrentPage(1);
     };
       const { products, loading, error, filteredProductCount, resultPerPage } =
         useSelector((state) => state.products);
     const [currentPage, setCurrentPage] = useState(1);

      const keyword = params.keyword;

    //  useEffect(() => {
    //    if (error) {
    //      toast.error(error);
    //      dispatch(clearErrors());
    //    }
    //    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    //  }, [dispatch, error, keyword, currentPage, price, category, ratings]);

  return (
    <div className="w-[220px] max-w-[220px] min-w-[220px] pl-4 mt-2">
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
          <p className="cursor-pointer" onClick={() => setCategory("")}>
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
                backgroundColor: "#e2e8f0",
              },
            }}
            valueLabelDisplay="on"
            step={1}
            marks
            min={0}
            max={5}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
});


export default FilterSection