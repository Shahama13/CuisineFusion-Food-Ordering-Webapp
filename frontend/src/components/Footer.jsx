import React from "react";
import "../styles/footer.css";
import a from "../Assets/logo.png"
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
    <div className="containers">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={a} alt="Your Logo"/>
          <h3 id="heading">CuisineFusion</h3>
        </div>
        <div className="footer-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Browse Menu</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-contact">
        <h4>Contact Us</h4>
        <p>Email: info@example.com</p>
        <p>Phone: +1 123-456-7890</p>
        <p>Address: 1234 Street, City, Country</p>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
