import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";

function Cart() {

  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((data) => {
        setDiscount(data.discountPercentage || 0);
      })
      .catch(() => {
        setDiscount(0);
      });
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = getTotalPrice();
  const discountAmount = (totalPrice * discount) / 100;
  const finalAmount = totalPrice - discountAmount;

  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty!</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="shop-now-btn">
          Explore Now
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-items">

        <div className="cart-products">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">

              <img src={item.images[0]} alt={item.title} />

              <div className="item-details">
                <h3>{item.title}</h3>

                <p>Price: ${item.price}</p>

                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span className="quantity-number">
                    {item.quantity}
                  </span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <p>
                  Subtotal: $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">

          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{getCartCount()}</span>
          </div>

          <div className="summary-row">
            <span>Discount ({discount}%)</span>
            <span>- ${discountAmount.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Final Amount</span>
            <span>${finalAmount.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">
            Checkout
          </button>

          <button
            className="clear-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default Cart;