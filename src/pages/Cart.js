import { useState } from "react";
import API from "../api/api";
import { useShop } from "../context/ShopContext";

function Cart() {

  const { cart, cartTotal, removeFromCart, updateQuantity } = useShop();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const shopkeeperPhone = "917538824959";

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  // Save Order + Open WhatsApp
  const placeOrder = async () => {

    if (
      !customer.name ||
      !customer.phone ||
      !customer.address
    ) {
      alert("Please fill all customer details.");
      return;
    }

    const products = cart
      .map(
        (item) =>
          `${item.productName} (Qty:${item.quantity})`
      )
      .join(", ");

    const customerOrder = {
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      products: products,
      totalAmount: cartTotal
    };

    try {

      await API.post("/customers", customerOrder);

      const orderLines = cart.map(
        (item, index) =>
          `${index + 1}. ${item.productName}
Qty : ${item.quantity}
Price : Rs.${item.price}`
      );

      const message = encodeURIComponent(
        [
          "🛒 New Grocery Order",
          "",
          ...orderLines,
          "",
          `Total : Rs.${cartTotal}`,
          "",
          `Customer : ${customer.name}`,
          `Phone : ${customer.phone}`,
          `Address : ${customer.address}`
        ].join("\n")
      );

      window.open(
        `https://wa.me/${shopkeeperPhone}?text=${message}`,
        "_blank"
      );

      alert("Order Placed Successfully");

    } catch (error) {

  console.error("Full Error :", error);

  if (error.response) {

    console.log("Status :", error.response.status);
    console.log("Response :", error.response.data);

    alert("Order Failed\nStatus : " + error.response.status);

  } else {

    alert("Cannot connect to Spring Boot Server");

  }

}

  };

  return (
    <section className="section">

      <div className="section-heading">
        <p className="eyebrow">Cart</p>
        <h2>Your Grocery Basket</h2>
      </div>

      {cart.length === 0 ? (
        <p className="empty">
          Your cart is empty.
        </p>
      ) : (
        <div className="cart-layout">

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.productId}
              >

                <img
                  src={item.imageUrl}
                  alt={item.productName}
                />

                <div>

                  <h3>{item.productName}</h3>

                  <p>Rs.{item.price}</p>

                </div>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.productId,
                      Number(e.target.value)
                    )
                  }
                />

                <strong>
                  Rs.{item.price * item.quantity}
                </strong>

                <button
                  onClick={() =>
                    removeFromCart(item.productId)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <aside className="cart-summary">

            <h3>Order Summary</h3>

            <p>
              Total :
              <strong> Rs.{cartTotal}</strong>
            </p>

            <div className="customer-details">

              <h4>Customer Details</h4>

              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                value={customer.name}
                onChange={handleCustomerChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={customer.phone}
                onChange={handleCustomerChange}
              />

              <textarea
                name="address"
                rows="4"
                placeholder="Address"
                value={customer.address}
                onChange={handleCustomerChange}
              />

            </div>

            <button
              className="checkout-whatsapp"
              onClick={placeOrder}
            >
              Place Order
            </button>

          </aside>

        </div>
      )}

    </section>
  );
}

export default Cart;