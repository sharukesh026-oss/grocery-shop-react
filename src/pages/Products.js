import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

function Products() {

  const { products } = useShop();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const matchesSearch =
        product.productName
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;

    });

  }, [products, search, category]);

  return (
    <section className="section">

      <div className="section-heading">
        <p className="eyebrow">Shop</p>
        <h2>All Grocery Products</h2>
      </div>

      <div className="filters">

        <input
          type="search"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}

        </select>

      </div>

      <div className="product-grid">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default Products;