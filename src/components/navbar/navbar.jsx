import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [input, setInput] = useState("");
    const [cartCount, setCartCount] = useState(0);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (input.trim() === "") {
            navigate("/");
        } else {
            navigate(`/?search=${input}`);
        }
        setMenuOpen(false);
    };

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
    };

    useEffect(() => {
        updateCartCount();

        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    return (
        <header>
            <div className="navbar-container">
                <Link to="/" className="logo">Shipzy</Link>

                <div
                    className={`hamburger ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                <div className={`navbar ${menuOpen ? "active" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link to="/About" onClick={() => setMenuOpen(false)}>About</Link>
                        </li>
                        <li>
                            <Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                        </li>
                        <li>
                            <Link to="/FAQ" onClick={() => setMenuOpen(false)}>FAQ</Link>
                        </li>
                    </ul>
                </div>

                <form className="search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (e.target.value === "") {
                                navigate("/");
                            }
                        }}
                    />
                    <button type="submit">Search</button>
                </form>

                <div className="btn">
                    <Link to="/Form" className="login-link">Login</Link>
                </div>

                <Link to="/cart" className="cart">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="cart-count">{cartCount}</span>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;