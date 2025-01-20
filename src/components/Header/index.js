import { Link } from "react-router-dom";
import "./index.css";

const Header = () => (
  <div className="header">
    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
      <h2>
        Covid<span>India</span>
      </h2>
    </Link>
    <div className="header-links">
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        Home
      </Link>
      <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
        About
      </Link>
    </div>
  </div>
);

export default Header;
