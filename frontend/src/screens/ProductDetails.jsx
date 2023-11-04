import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "../styles/productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../Actions/product";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import Rating from "@mui/material/Rating";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { clearError } from "../Reducers/product";
import MetaData from "../MetaData";
import {addItemsToCart} from "../Actions/cart"

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const addtoCartHandler = async() => {
   await dispatch(addItemsToCart(params.id,quantity))
   toast.success("Item added to cart")
    setQuantity(1)
  };
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
    window.scrollTo(0, 0);
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, params.id, error]);

  const options = {
    size: "large",
    value: product?.ratings,
    readOnly: true,
    precision:0.5
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Item Details" />
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
                <Rating {...options} />
                <span>({product?.numOfReviews} reviews)</span>
                {/* <span>({product?.ratings} reviews)</span> */}
              </div>
              <div className="details-Block3">
                <h1> {`₹${product?.price}`}</h1>
                <div className="details-Block3-1">
                  <div className="details-Block3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addtoCartHandler}>Add To Cart</button>
                </div>
              </div>
              <div className="details-Block4">
                Description:<p>{product?.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading"> Reviews</h3>
          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product?.reviews?.map((review) => (
                <ReviewCard review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
