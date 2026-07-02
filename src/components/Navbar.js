import { Link, NavLink } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function Navbar() {
  const { cartCount } = useShop();

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">G</span>
        <span>Green Basket</span>
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>

      <Link className="cart-link" to="/cart">
        Cart <span>{cartCount}</span>
      </Link>
    </header>
  );
}

export default Navbar;
