import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageSlider from "../Slider/ImageSlider"
import ProductSlider from "../Product Slider/ProductSlider"
import { addToCart } from "../Cart/cartUtils";
// import CatNav from "../GlassyNav/GlassyNav";

function FetchProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seeMore, setSeeMore] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);

        const url = search
          ? `https://dummyjson.com/products/search?q=${search}`
          : "https://dummyjson.com/products";

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [search]);

  const handleSeeMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setSeeMore((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <div className="main-container">
      {!search && (
        <section className="hero">
          <div className="overlay"></div>

          {/* <CatNav /> */}

          <div className="hero-content">
            <span className="tag">New Collection 2026</span>

            <h1 className="tag_title">
              <span>Shop Smarter.</span>
              <span>Live Better.</span>
            </h1>

            <p>Discover premium products and fast delivery.</p>

            <div className="buttons">
              <Link to="/Category" className="main_btn primary">
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="product-container">
        {products.slice(0, seeMore).map((product) => (
          <Link
            to={`/product-details/${product.id}`}
            key={product.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="product-card">
              <img
                className="product-image"
                src={product.images[0]}
                alt={product.title}
              />

              <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                  <span className="product-price">
                    ${product.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="buy-button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="View_more">
        <button onClick={handleSeeMore} className="View_more_btn">
          View More
        </button>
      </div>

      <ImageSlider />
      <ProductSlider />
    </div>
  );
}

export default FetchProduct;