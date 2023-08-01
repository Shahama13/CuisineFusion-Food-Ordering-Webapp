import React from "react";
import "../styles/home.css";
import { BiSolidMouse } from "react-icons/bi";

const Home = () => {
  return (
    <>
      <div class="banner">
        
        <div class="overlay"></div>
        <p id="heading">CuisineFusion</p>
        <h2>"Savor Exquisite Meals at Your Fingertips"</h2>
        <a href="#container">
          <button>
            Scroll <BiSolidMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Top Rated Products</h2>
    </>
  );
};

export default Home;
