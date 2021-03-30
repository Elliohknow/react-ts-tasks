import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to="/about">About</Link>
      <p>&copy; 2021 Elliott Jones</p>
    </footer>
  );
};

export default Footer;
