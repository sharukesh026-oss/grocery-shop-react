import { useShop } from "../context/ShopContext";

function ProductCard({ product }) {

  const { addToCart, cart } = useShop();

  const isInStock = Number(product.stock) > 0;
  
  // Check if this product is already in the cart
  const isAdded = cart.some((item) => item.productId === product.productId);

  return (
    <article className={`product-card ${isAdded ? "added-to-cart" : ""}`}>

      <img
        src={product.imageUrl}
        alt={product.productName}
      />

      <div className="product-content">

        <span className="category">
          {product.category}
        </span>

        <h3>{product.productName}</h3>

        <span
          className={`stock-badge ${
            isInStock ? "in-stock" : "out-of-stock"
          }`}
        >
          {isInStock ? "In Stock" : "Out of Stock"}
        </span>

        <p>{product.description}</p>

        <div className="product-footer">

          <strong>Rs. {product.price}</strong>

          <button
            className="add-to-cart-btn"
            disabled={!isInStock}
            onClick={() => addToCart(product)}
          >
            {isInStock ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cart-btn-icon"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Add to Cart</span>
              </>
            ) : (
              "Unavailable"
            )}
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;