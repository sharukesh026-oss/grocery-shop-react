import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Navbar.css";

function Navbar() {
  const { cart, cartCount } = useShop();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cart.length === 0) return; // Prevent initial bounce on mount when cart is empty
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 400);
    return () => clearTimeout(timer);
  }, [cart.length]);

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">G</span>
        <span>Kani's Green Basket</span>
      </Link>

      <nav className="nav-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {/* Redesigned modern e-commerce Cart button */}
        <Link className={`navbar-cart-btn ${animate ? "animate" : ""}`} to="/cart">
          <div className="cart-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="cart-svg-icon"
            >
              {/* Orange Handle */}
              <path
                d="M1 2h4"
                stroke="#FF9800"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="cart-handle"
              />
              {/* Trolley Basket (Dark Gray) */}
              <path
                d="M5 2l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                stroke="#4A4A4A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cart-basket"
              />
              {/* Wheels (Dark Gray) */}
              <circle cx="9" cy="20" r="1.5" fill="#4A4A4A" className="cart-wheel" />
              <circle cx="20" cy="20" r="1.5" fill="#4A4A4A" className="cart-wheel" />
            </svg>
            {/* Circular orange badge */}
            <span className="cart-badge-orange">{cartCount}</span>
          </div>
          <span className="cart-text-label">Cart</span>
        </Link>

        {/* Thin white divider between Cart and Admin */}
        <span className="nav-divider"></span>

        <NavLink to="/admin">Admin</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
