import React, { useState } from "react";
import "../styles/productCard.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/solid";

const ProductCard = ({ product }) => {
  
  const [heart, setHeart] = useState(false);
  const toggleHeart = (e) => {
     e.preventDefault(); 
    setHeart((prev) => !prev);
  };

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
        {heart ? (
          <HeartOutline
            className="h-6 w-6 text-red-500"
            onClick={toggleHeart}
          />
        ) : (
          <HeartIcon className="h-6 w-6 text-black" onClick={toggleHeart} />
        )}
      </div>
      <div>
        <Rating {...options} />
        <span className="productCardDiv">({product.numOfReviews} reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
