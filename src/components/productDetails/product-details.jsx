import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../Cart/cartUtils";
import "./product-details.css";


function FetchSingleProduct() {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    const getSingleProduct = async (setProduct) => {
        const response = await fetch("https://dummyjson.com/products/" + id);
        const data = await response.json();
        setProduct(data);
    };

    useEffect(() => {
        getSingleProduct(setProduct);
    }, []);

    // const addToCart = (product) => {
    //   const cart = JSON.parse(localStorage.getItem("cart"));

    //   const existingProduct = cart.find((item) => item.id === product.id);

    //   if (existingProduct) {
    //     existingProduct.quantity += 1;
    //   } else {
    //     cart.push({ ...product, quantity: 1 });
    //   }

    //   localStorage.setItem("cart", JSON.stringify(cart));
    //   alert("Product added successfully!");

    //   console.log("Cart:", cart);
    // };

    // const [selectedQty, setSelectedQty] = useState([]);
    // const quantities = ["15 ml", "30 ml", "45 ml"];


    const [dimensions, setDimensions] = useState(null);
    useEffect(() => {
        if (product && product.dimensions) {
            setDimensions(product.dimensions);
        }
    }, [product]);

    const [showBuyNow, setShowBuyNow] = useState(false);

    const handleBuyNow = () => {
        setShowBuyNow(true);
    };

    const closePopup = () => {
        setShowBuyNow(false);
    };
    return (

        <div className="details-container">
            <div className="left">
                <img src={product?.images?.[0]} alt={product?.title} />
                <span className="badge">
                    {product?.discountPercentage} % extra off
                </span>
            </div>

            <div className="border"></div>

            <div className="right">
                <h2>{product?.title}</h2>
                <p className="description">{product?.description}</p>

                <div className="border-bottom"></div>

                <div className="Rating-stars">
                    <p>Rating:</p>
                    <span className="rating">
                        {product?.rating} <span className="star">☆</span>
                    </span>
                </div>

                <div className="price">
                    <div className="original-price">Special Price</div>
                    <div className="special-price">$ {product?.price}</div>
                </div>

                <div className="available-offers">
                    <h3>Available Offers</h3>
                    <ul>
                        <li>
                            🏷️special price get {product?.discountPercentage}% extra off{" "}
                            <a href="#">T&C</a>
                        </li>
                    </ul>
                </div>

                {/* Product Quantity */}
                {/* <div className="quantity-selector">
          <p>Quantity: {selectedQty}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            {quantities.map((qty) => (
              <button
                className="quantity-value"
                key={qty}
                onClick={() => setSelectedQty(qty)}
              >
                {qty}
              </button>
            ))}
          </div>
        </div> */}

                <div className="dimensions">
                    <p>Dimensions:</p>
                    {dimensions ? (
                        <ul>
                            <li>
                                <span className="dot"></span>height:
                                <span className="dimensions-value">{dimensions.height}</span>
                            </li>
                            <li>
                                <span className="dot"></span>width:
                                <span className="dimensions-value">{dimensions.width}</span>
                            </li>
                            <li>
                                <span className="dot"></span>depth:
                                <span className="dimensions-value">{dimensions.depth}</span>
                            </li>
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <div className="btn-group">
                    <button
                        className="buy-button"
                        onClick={(e) => {
                            e.preventDefault()
                            addToCart(product)
                        }}>
                        add to cart
                    </button>
                    <button
                        className="buy-button"
                        onClick={handleBuyNow}
                    >
                        Buy Now
                    </button>

                    {showBuyNow && (
                        <div className="popup-overlay">
                            <div className="buy-popup">

                                <h2>Confirm Purchase</h2>

                                <img src={product?.images?.[0]} alt={product?.title} />

                                <p className="popup-title">{product?.title}</p>
                                <p className="product-description">{product?.description}</p>
                                <p className="popup-price">$ {product?.price}</p>

                                <div className="popup-buttons">
                                    <button onClick={() => addToCart(product)}>
                                        Add To Cart
                                    </button>

                                    <button onClick={() => alert("Proceed to Payment")}>
                                        Proceed
                                    </button>

                                    <button onClick={closePopup}>
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                </div>

                <div className="reviews-section">
                    {product?.reviews?.map((review, index) => (
                        <div key={index} className="review">
                            <h4>{review.reviewerName}</h4>
                            <p>Rating: {review.rating}</p>
                            <p>{review.comment}</p>
                            <div className="review-date">
                                <small>{new Date(review.date).toLocaleDateString()}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FetchSingleProduct;
