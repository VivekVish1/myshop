import React from 'react'
import { useState, useEffect, } from 'react'
import './search.css'
import { Link } from 'react-router-dom';

function Search() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState(search)


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search)
    }, 2000);

    return () => clearTimeout(timer)
  }, [search])


  // useEffect(() => {
  //   const fetchProducts = async () => {

  //     if (search === "") {
  //       setProducts([])
  //       return
  //     }

  //     setLoading(true);

  //     try {
  //       const res = await fetch('https://dummyjson.com/products')
  //       const data = await res.json();
  //       setProducts(data.products)
  //       setFilteredProducts(data.products)
  //       console.log(data)
  //     } catch {
  //       setError("failed to load products")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchProducts();
  // }, [debounceSearch])

  useEffect(() => {
    const searchProducts = async () => {
      if (!debounceSearch) {
        setProducts([])
        return
      }

      if (searchProducts === "") {
        setFilteredProducts([])
        return
      }

      setLoading(true)

      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
        const data = await res.json();
        setFilteredProducts(data.products)
        console.log(data)
      } catch {
        setError("Search failed")
      } finally {
        setLoading(false)
      }
    }
    searchProducts();
  }, [search, debounceSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value)
    }
  }


  return (
    <div className='container'>
      <h1 className='search_title'>Search</h1>

      <div className='search-box'>
        <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
        <button>Search</button>
      </div>

      {loading && <p className='loading'>Loading <span>...</span></p>}
      {error && <p>{error}</p>}

      {/* <div className='product-card'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product?.id}>
              <div>
                <img className='product-image' src={product?.images[0]} alt="product?.title" />
              </div>
              <h4>{product?.title}</h4>
              <p className='price'>Price: ₹{product?.price}</p>
            </div>
          ))
        ) : (
          <p>No product found</p>
        )}
      </div> */}

      <div className='product-container'>
        {filteredProducts.map((product) => {
          return (
            <Link to={`/product-details/${product?.id}`} style={{ textDecoration: "none", color: "inherit" }} >
              <div className="product-card">
                <img className="product-image" src={product?.images[0]} alt="{Product.title}" />


                <div className="product-details">
                  <h3 className="product-title">{product?.title}</h3>
                  <p className="product-description">{product?.description}</p>

                  <div className="product-footer">
                    <span className="product-price">${product?.price}</span>
                    <button to={`/product-details/${product?.id}`} className="buy-button"> Buy Now </button>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Search