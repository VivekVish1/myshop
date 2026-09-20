import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="elite-footer">
      <div className="elite-footer__glow" />

      <div className="elite-footer__content">
        <div className="elite-footer__brand">
          <h2 style={{color:"#fff"}}>Shipzy</h2>
          <p>
            India’s most trusted online shopping platform delivering
            seamless, secure and reliable experiences to millions of users.
          </p>
        </div>

        <div className="elite-footer__stats">
          <div className="stat">
            <h3>24×7</h3>
            <span>Customer Support</span>
          </div>
          <div className="stat">
            <h3>10M+</h3>
            <span>Happy Customers</span>
          </div>
          <div className="stat">
            <h3>100%</h3>
            <span>Secure Payments</span>
          </div>
        </div>
      </div>

      <div className="elite-footer__divider" />

      <div className="elite-footer__bottom">
        <span>© {year} Shipzy Pvt Ltd. All rights reserved.</span>
        <span className="elite-footer__tagline">
          Engineered with precision • Built for scale
        </span>
      </div>
    </footer>
  );
}

export default Footer;
