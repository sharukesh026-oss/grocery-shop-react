import { createContext, useContext, useEffect, useMemo, useState } from "react";
import API from "../api/api";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load Products from Backend
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error Loading Products", error);
    }
  };

  // Add To Cart
  const addToCart = (product) => {

    if (product.stock <= 0) {
      alert("Product Out Of Stock");
      return;
    }

    setCart((items) => {

      const exist = items.find(
        (item) => item.productId === product.productId
      );

      if (exist) {

        return items.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

      }

      return [...items, { ...product, quantity: 1 }];

    });

  };

  // Remove Cart
  const removeFromCart = (productId) => {

    setCart((items) =>
      items.filter(
        (item) => item.productId !== productId
      )
    );

  };

  // Update Quantity
  const updateQuantity = (productId, quantity) => {

    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );

  };

  // Reload after Product CRUD
  const addProduct = () => {
    loadProducts();
  };

  const editProduct = () => {
    loadProducts();
  };

  const deleteProduct = () => {
    loadProducts();
  };

  // Cart Total
  const cartTotal = useMemo(() => {

    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

  }, [cart]);

  // Cart Count
  const cartCount = useMemo(() => {

    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  }, [cart]);

  return (

    <ShopContext.Provider
      value={{

        products,
        cart,

        cartTotal,
        cartCount,

        loadProducts,

        addToCart,
        removeFromCart,
        updateQuantity,

        addProduct,
        editProduct,
        deleteProduct

      }}
    >

      {children}

    </ShopContext.Provider>

  );

}

export function useShop() {
  return useContext(ShopContext);
}