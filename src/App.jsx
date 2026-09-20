import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/main/Main";

import Navbar from "./components/navbar/navbar";
import ProductDetails from "./components/productDetails/product-details";
import About from "./components/About/About";
import Category from "./components/Category/Category";
import ImageSlider from "./components/Slider/ImageSlider";
import Form from "./components/Login/form";
import Cart from "./components/Cart/cart";
import ProductSlider from "./components/Product Slider/ProductSlider";
import Contact from "./components/Contact/contact";
import FAQ from "./components/Help Center/FAQ";
import AddNewProduct from "./components/Add Product/AddNewProduct";
import Dashboard from "./components/Dashboard/Dashboard";


// import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
import GlassyNav from "./components/GlassyNav/GlassyNav";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

function App() {

  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/category" element={<Category />} />
          <Route path="/About" element={<About />} />
          <Route path="/ImageSlider" element={<ImageSlider />} />
          <Route path="/ProductSlider" element={<ProductSlider />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/GlassyNav" element={<GlassyNav />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddNewProduct" element={<AddNewProduct />} />


          {/* <Route path="/search" element={<Search />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
