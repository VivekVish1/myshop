import React from 'react'
import './ImageSlider.css'
import { useState, useEffect } from 'react'

const images = [
  "/src/Images/Image1.jpg",
  "/src/Images/Image2.jpg",
  "/src/Images/Image3.jpg",
  "/src/Images/Image4.jpg",
]
function ImageSlider() {

  const [currentImage, setCurrentImage] = useState(0);


  const nextSlide = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='imageSlider_container'>
      <div className="slider">
        
        <button onClick={prevSlide} className='slider_btn_left'><i className="fa-solid fa-angle-left"></i></button>

        <img key={currentImage} src={images[currentImage]} alt="slide" className='imageSlider' />

        <button onClick={nextSlide} className='slider_btn_right'><i className="fa-solid fa-angle-right"></i></button>

        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentImage === index ? "active" : ""}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>

      </div>

    </div>
  )
}

export default ImageSlider