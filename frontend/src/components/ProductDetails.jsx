import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "../styles/productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../Actions/product";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const options = {
    count: 5,
    size: 25,
    // size: window.innerWidth < 670 ? 25 : 25,
    edit: false,
    isHalf: true,
    value: 3,
    activeColor: "#ffd700",
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="productDetails">
      <div className="carousel-container">
        <Carousel animation="fade">
          {product?.images?.map((item, i) => (
            <img
              className="carousel-image"
              key={item.url}
              src={item.url}
              alt={`${i}slide`}
            />
          ))}
        </Carousel>
      </div>
      <div>
        <div className="details-Block1">
          <h2>{product?.name}</h2>
          <p> Product {product?._id}</p>
        </div>
        <div className="details-Block2">
          <ReactStars />
          <span>({product?.numOfReviews} reviews)</span>
        </div>
        <div className="details-Block3">
          <h1> {`₹${product?.price}`}</h1>
          <div className="details-Block3.1">
            <div className="details-Block3.1.1">
              <button>-</button>
              <input type="number" value="1" />
              <button>+</button>
            </div>
            <button>Add To Cart</button>
          </div>
        </div>
        <div className="details-Block4">
          Description: <p>{product?.description}</p>
        </div>
        <button>Submit Review</button>
      </div>
    </div>
  );
};

export default ProductDetails;
