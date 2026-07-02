import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Fresh groceries delivered daily</p>
        <h1>Your neighborhood grocery shop online</h1>
        <p>
          Order fruits, vegetables, dairy, grains, bakery items, and kitchen
          essentials from one simple store.
        </p>
        <div className="hero-actions">
          <Link className="primary-btn" to="/products">Shop Products</Link>
          <Link className="secondary-btn" to="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
