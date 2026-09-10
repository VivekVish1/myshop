import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addToCart } from "../Cart/cartUtils";
import './Category.css'

function Category() {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState([null])

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('https://dummyjson.com/products/category-list');
      const data = await res.json();
      setCategories(data)
      console.log(data)

      const prodRes = await fetch('https://dummyjson.com/products');
      const prodData = await prodRes.json();

      const shuffled = prodData.products.sort(() => 0.5 - Math.random());

      const randomTen = shuffled.slice(0, 10);

      setProducts(randomTen);
      setSelected(null);
    }

    getCategories()
  }, [])

  const handleCategoryClick = async (cat) => {
    setSelected(cat)

    try {
      const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
      const data = await res.json()
      setProducts(data.products);
    } catch (error) {
      console.error("Fetch error:", error)
      setProducts([])

    }

  }

  return (
    <div className='category_container'>
      <div className='category_panel'>
        <div className='category_panel__header'>
          <h1 className='category_panel__title'>
            {selected ? selected : 'Category'}
          </h1>
        </div>

        {categories.map((cat) => (
          <div key={cat}>
            {/* <div>
              <img src={cat.thumbnail} alt={cat.title} />
            </div> */}
            <div className='category_panel__btn'>
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`cat-btn ${selected === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="product-panel">
        <h2 className="product-panel__title">
          Products {selected && `: ${selected}`}
        </h2>


        {products.length === 0 && (
          <p className="no-products">Select a category to show products.</p>
        )}

        {products.map((prod) => (
          <Link to={`/product-details/${prod?.id}`} key={prod?.id} style={{ textDecoration: "none", color: "inherit" }} >
            <div className='category_product_card' key={prod.id}>
              <div>
                <img src={prod.thumbnail} alt={prod.title} />
              </div>
              <div>
                <h3>{prod.title}</h3>
                <p>{prod.description}</p>
                <p>Price: ${prod.price}</p>
                <div className="buttons-container">
                  <button className="buttons">Buy Now</button>
                  <button
                    className="buttons"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(prod)
                    }}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default Category