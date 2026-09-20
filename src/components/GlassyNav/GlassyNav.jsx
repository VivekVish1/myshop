import React from 'react'
import { useNavigate } from "react-router-dom";
import "./GlassyNav.css"

const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Toys",
    "Books",
    "Beauty",
    "Automotive",
    "Garden",
];

const GlassyNav = () => {

    const navigate = useNavigate();

    const handleClick = (category) => {
        if (category === "All") {
            navigate("/Category");
        } else {
            navigate(`/Category?category=${category.toLowerCase()}`);
        }
    };

    return (
        <div className="category-wrapper">
            <nav className="category-navbar">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="category-item"
                        onClick={() => handleClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default GlassyNav