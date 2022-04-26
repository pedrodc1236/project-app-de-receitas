import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link data-testid="drinks-bottom-btn" to="/drinks">drinks</Link>
      <Link data-testid="explore-bottom-btn" to="/explore">explore</Link>
      <Link data-testid="food-bottom-btn" to="/food">food</Link>
    </footer>
  );
}

export default Footer;
