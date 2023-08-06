import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "../styles/productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../Actions/product";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import ReactStars from "react-rating-stars-component";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import { clearError } from "../Reducers/product";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(params.id));
    window.scrollTo(0, 0);
    if(error){
      toast.error(error);
      dispatch(clearError())
    }
  }, [dispatch, params.id, error]);

  const options = {
    edit: false,
    count: 5,
    size: 30,
    // size: window.innerWidth < 670 ? 25 : 25,
    isHalf: true,
    value: product?.ratings,
    activeColor: "tomato",
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
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
                <ReactStars {...options} />
                <span>({product?.numOfReviews} reviews)</span>
                {/* <span>({product?.ratings} reviews)</span> */}
              </div>
              <div className="details-Block3">
                <h1> {`₹${product?.price}`}</h1>
                <div className="details-Block3-1">
                  <div className="details-Block3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
                  <button>Add To Cart</button>
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
