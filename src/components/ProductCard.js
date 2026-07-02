import { useShop } from "../context/ShopContext";

function ProductCard({ product }) {

  const { addToCart } = useShop();

  const isInStock = Number(product.stock) > 0;

  return (
    <article className="product-card">

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
            disabled={!isInStock}
            onClick={() => addToCart(product)}
          >
            {isInStock ? "Add to Cart" : "Unavailable"}
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;