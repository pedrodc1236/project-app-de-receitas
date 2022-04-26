import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link data-testid="drinks-bottom-btn" to="/drinks">
        <img src={ drinkIcon } alt="teste" />
      </Link>
      <Link data-testid="explore-bottom-btn" to="/explore">
        <img src={ exploreIcon } alt="teste" />
      </Link>
      <Link data-testid="food-bottom-btn" to="/food">
        <img src={ mealIcon } alt="teste" />
      </Link>
    </footer>
  );
}

export default Footer;
