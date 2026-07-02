import { useEffect, useState } from "react";
import API from "../../api/api";
import "./ProductManagement.css";

function ProductManagement() {

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
    description: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId == null) {

        await API.post("/products", product);

        alert("Product Added Successfully");

      } else {

        await API.put(`/products/${editId}`, product);

        alert("Product Updated Successfully");

      }

      loadProducts();

      setEditId(null);

      setProduct({
        productName: "",
        category: "",
        price: "",
        stock: "",
        imageUrl: "",
        description: ""
      });

    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }

  };

  const handleEdit = (item) => {

    setEditId(item.productId);

    setProduct({
      productName: item.productName,
      category: item.category,
      price: item.price,
      stock: item.stock,
      imageUrl: item.imageUrl,
      description: item.description
    });

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await API.delete(`/products/${id}`);

      loadProducts();

      alert("Product Deleted");

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="admin-container">

      <h2>Product Management</h2>

      <form className="product-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={product.productName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt="Preview"
            width="120"
            height="120"
            style={{
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />
        )}

        <button type="submit">
          {editId == null ? "Add Product" : "Update Product"}
        </button>

      </form>

      <hr />

      <h3>Product List</h3>

      <table className="product-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {products.length === 0 ? (

            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Products Available
              </td>
            </tr>

          ) : (

            products.map((item) => (

              <tr key={item.productId}>

                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    width="70"
                    height="70"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />
                </td>

                <td>{item.productName}</td>

                <td>{item.category}</td>

                <td>₹ {item.price}</td>

                <td>{item.stock}</td>

                <td>{item.description}</td>

                <td>

                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      marginRight: "10px",
                      background: "green",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.productId)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ProductManagement;