import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/logo/logo.jpg';
import cart_icon from '../../../assets/icons/cart_icon.png';

const Navbar = () => {
  const [menu, setMenu] = useState("event");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-logo" onClick={() => navigate('/home')}>
        <img src={logo} alt="" />
        <p>EKQA</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("event")}>
          <Link style={{ textDecoration: 'none' }} to="/event">EVENT</Link> {menu === "event" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("about_us")}>
          <Link style={{ textDecoration: 'none' }} to="/about_us">ABOUT US</Link> {menu === "about_us" ? <hr /> : <></>}
        </li>
        <li onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} className="shop-dropdown">
          <Link style={{ textDecoration: 'none' }} to="/shop">SHOP</Link>
          {menu === "shop" ? <hr /> : <></>}
          {showDropdown && (
            <div className="dropdown">
              <Link to="/physical" onClick={() => setMenu("shop")}>Physical Products</Link>
              <Link to="/digital" onClick={() => setMenu("shop")}>Digital Products</Link>
            </div>
          )}
        </li>
        <li onClick={() => setMenu("resource")}>
          <Link style={{ textDecoration: 'none' }} to="/resource">RESOURCE</Link> {menu === "resource" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("our_team")}>
          <Link style={{ textDecoration: 'none' }} to="/our_team">TEAM</Link> {menu === "our_team" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("contact")}>
          <Link style={{ textDecoration: 'none' }} to="/contact">CONTACT</Link> {menu === "contact" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/cart"><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
