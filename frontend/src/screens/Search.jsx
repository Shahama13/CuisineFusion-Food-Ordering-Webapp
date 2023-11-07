import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <>
        <MetaData title="Searchpage" />
      <form onSubmit={submitHandler} className="searchBox">
        <input
          type="text"
          placeholder="Search for a dish"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
