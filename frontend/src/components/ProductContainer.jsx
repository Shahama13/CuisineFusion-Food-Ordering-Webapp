import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductContainer = () => {
  const { products } = useSelector((state) => state.products);

  return products && products.length >= 1 ? (
    <div className="flex flex-row flex-wrap items-center m-1">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <div className="self-center ml-[30%] font-serif text-3xl text-slate-500">
      No Items Found
    </div>
  );
};

export default ProductContainer;
