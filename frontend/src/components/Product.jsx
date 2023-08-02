import React from "react";
import "../styles/product.css";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const options = {
    count: 5,
    size: 25,
    // size: window.innerWidth < 670 ? 25 : 25,
    edit: false,
    isHalf: true,
    value: product.ratings,
    activeColor: "#ffd700",
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>({product.numOfReviews} reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default Product;
