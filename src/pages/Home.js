import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

function Home() {

  const { products } = useShop();

  return (
    <>
      <Hero />

      <section className="section">

        <div className="section-heading">
          <p className="eyebrow">Popular Items</p>
          <h2>Fresh Picks For Today</h2>
        </div>

        <div className="product-grid">

          {products.slice(0, 4).map((product) => (

            <ProductCard
              key={product.productId}
              product={product}
            />

          ))}

        </div>

      </section>
    </>
  );
}

export default Home;