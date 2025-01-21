import { Link } from "react-router-dom";
import notFound from "../assets/notFound.png";
import "./index.css";

const NotFound = () => (
  <div className="not-found-container">
    <img className="not-found-image" src={notFound} alt="not-found" />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-description">
      we’re sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="not-found-button">Homes</button>
    </Link>
  </div>
);

export default NotFound;
