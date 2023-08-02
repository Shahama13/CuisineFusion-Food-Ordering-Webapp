import React from "react";
import "../styles/footer.css";
import a from "../Assets/logo.png"

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
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About Us</a></li>
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
