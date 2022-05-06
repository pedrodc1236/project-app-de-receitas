import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ name, thumb, index, id, pageTitle }) {
  return (
    <Link to={ `/${pageTitle}/${id}` } className="recipe-link">
      <div
        data-testid={ `${index}-recipe-card` }
        className="recipe-card"
      >
        <img
          className="recipe-img"
          src={ thumb }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default RecipeCard;
