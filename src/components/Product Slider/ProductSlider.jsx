import React, { useEffect, useState } from "react";
import "./ProductSlider.css";
import { Link } from "react-router-dom";
import { addToCart } from "../Cart/cartUtils";

const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price * 80);

function ProductSlider() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=10")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
            });
    }, []);

    const scrollLeft = () => {
        document.getElementById("slider").scrollLeft -= 250;
    };

    const scrollRight = () => {
        document.getElementById("slider").scrollLeft += 250;
    };

    return (
        <div className="product_slider_container">
            <h2 className="slider_title">Popular Products</h2>

            <div className="product_slider_child">
                <button onClick={scrollLeft} className="btn_left">
                    <i className="fa-solid fa-angle-left"></i>
                </button>

                <button onClick={scrollRight} className="btn_right">
                    <i className="fa-solid fa-angle-right"></i>
                </button>

                <div className="slider_wrapper" id="slider">
                    {products.map((item) => (
                        <Link
                            to={`/product-details/${item.id}`}
                            key={item.id}
                            className="product_slider"
                        >
                            <div className="product_Slider_card">
                                <img
                                    className="product_slider_img"
                                    src={item.thumbnail}
                                    alt={item.title}
                                />
                                <p className="slider-product-title">{item.title}</p>
                                <p className="product-price">{formatPrice(item.price)}</p>
                                <button>View</button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductSlider;
