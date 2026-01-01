import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

import logo from "../../../assets/logo/logo.jpg";
import cart_icon from "../../../assets/icons/cart_icon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem("user_token"));

useEffect(() => {
  const onStorage = () => setUserLoggedIn(!!localStorage.getItem("user_token"));
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, []);

useEffect(() => {
  // also update on route change (covers same-tab changes)
  setUserLoggedIn(!!localStorage.getItem("user_token"));
}, [pathname]);

const logoutUser = () => {
  localStorage.removeItem("user_token");
  setUserLoggedIn(false);
  setMobileOpen(false);
  navigate("/home");
};

  const isActive = (path) => pathname === path;

  // close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // allow ESC to close menu
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="navbar">
      {/* Only logo clickable (not the EKQA text) */}
      <div
        className="nav-logo"
        role="button"
        tabIndex={0}
        onClick={() => navigate("/home")}
        onKeyDown={(e) => e.key === "Enter" && navigate("/home")}
      >
        <img src={logo} alt="EKQA logo" />
        <p className="nav-brand">EKQA</p>
      </div>

      <button
        className={`nav-toggle ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        ☰
      </button>

      {/* Desktop nav links */}
      <nav className="nav-menu">
        <Link className={`nav-link ${isActive("/event") ? "active" : ""}`} to="/event">
          EVENT
        </Link>

        <Link className={`nav-link ${isActive("/about_us") ? "active" : ""}`} to="/about_us">
          ABOUT US
        </Link>

        {/* renamed SHOP -> SUPPORT, no dropdown */}
        <Link className={`nav-link ${isActive("/support") ? "active" : ""}`} to="/support">
          SUPPORT
        </Link>

        <Link className={`nav-link ${isActive("/resource") ? "active" : ""}`} to="/resource">
          RESOURCE
        </Link>

        <Link className={`nav-link ${isActive("/our_team") ? "active" : ""}`} to="/our_team">
          TEAM
        </Link>

        <Link className={`nav-link ${isActive("/contact") ? "active" : ""}`} to="/contact">
          CONTACT
        </Link>
      </nav>

      {/* Desktop actions: hide cart for now, keep login normal */}
      <div className="nav-actions desktop-actions">
        {userLoggedIn ? (
          <div className="nav-user">
            <button
              className="nav-userIcon"
              type="button"
              onClick={() => navigate("/home")}
              aria-label="Account"
              title="Account"
            >
              👤
            </button>
            <button className="nav-logout" type="button" onClick={logoutUser}>
              Log out
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-login">
            Login
          </Link>
        )}
      </div>
      

      {/* Backdrop (click to close) */}
      <div
        className={`mobile-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile slide-in drawer */}
      <aside
        className={`mobile-panel ${mobileOpen ? "open" : ""}`}
        aria-hidden={!mobileOpen}
        inert={mobileOpen ? undefined : ""}
      >

        <div className="mobile-panel-inner">
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* top row: Login + Cart same line */}
          <div className="mobile-top-actions">
          {userLoggedIn ? (
            <button type="button" className="nav-login mobile-login" onClick={logoutUser}>
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="nav-login mobile-login"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          )}
            <Link to="/cart" className="mobile-cart" aria-label="Cart">
              <img src={cart_icon} alt="Cart" />
              <span className="nav-cart-count">0</span>
            </Link>
          </div>

          <div className="mobile-links">
            <Link className={`nav-link ${isActive("/event") ? "active" : ""}`} to="/event">
              EVENT
            </Link>
            <Link className={`nav-link ${isActive("/about_us") ? "active" : ""}`} to="/about_us">
              ABOUT US
            </Link>
            <Link className={`nav-link ${isActive("/support") ? "active" : ""}`} to="/support">
              SUPPORT
            </Link>
            <Link className={`nav-link ${isActive("/resource") ? "active" : ""}`} to="/resource">
              RESOURCE
            </Link>
            <Link className={`nav-link ${isActive("/our_team") ? "active" : ""}`} to="/our_team">
              TEAM
            </Link>
            <Link className={`nav-link ${isActive("/contact") ? "active" : ""}`} to="/contact">
              CONTACT
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
