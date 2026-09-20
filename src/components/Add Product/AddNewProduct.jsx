import React, { useState, useEffect } from 'react'
import './AddNewProduct.css'

const AddNewProduct = () => {

    const [products, setProducts] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem("customProducts")) || []
        setProducts(savedProducts)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!image) return

        const reader = new FileReader()

        reader.onloadend = () => {
            const newProduct = {
                id: Date.now(),
                name,
                description,
                price,
                image: reader.result
            }

            const updatedProducts = [...products, newProduct]

            setProducts(updatedProducts)
            localStorage.setItem("customProducts", JSON.stringify(updatedProducts))

            setName("")
            setDescription("")
            setPrice("")
            setImage(null)
        }

        reader.readAsDataURL(image)
    }

    const handleDelete = (id) => {
        const filteredProducts = products.filter((p) => p.id !== id)
        setProducts(filteredProducts)
        localStorage.setItem("customProducts", JSON.stringify(filteredProducts))
    }

    return (
        <div className="add-product-container">

            <h2 className="title">Add New Product</h2>

            <form className="product-form" onSubmit={handleSubmit}>

                <input
                    className="input-field"
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    className="input-field"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <input
                    className="input-field"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <input
                    className="input-file"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />

                <button className="submit-btn" type="submit">
                    Add Product
                </button>

            </form>

            <div className="product-list">

                <h2 className="list-title">My Products</h2>

                {products.length === 0 ? (
                    <p className="empty-text">No products added yet</p>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="product-card">

                            <div className="product-left">
                                <img
                                    className="product-image"
                                    src={product.image}
                                    alt={product.name}
                                />
                            </div>

                            <div className="product-right">

                                <div className="product-top">
                                    <h4 className="product-name">{product.name}</h4>
                                </div>

                                <div className="product-middle">
                                    <p className="product-description">
                                        {product.description}
                                    </p>

                                    <p className="product-price">
                                        ₹{product.price}
                                    </p>
                                </div>

                                <div className="product-bottom">
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                )}

            </div>

        </div>
    )
}

export default AddNewProduct