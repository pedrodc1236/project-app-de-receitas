import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ name, thumb, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        className="recipe-img"
        src={ thumb }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
    </div>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
