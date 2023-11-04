import React from "react";
import "../styles/productCard.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    precision: 0.5,
    readOnly: true,
    value: product.ratings,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardDIv">({product.numOfReviews} reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
