import PropTypes from 'prop-types';
import React from 'react';

function RecomendationRecipeCard({ name, thumb, index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` } className="item">
      <img
        className="recomendation-img"
        src={ thumb }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ `${index}-recomendation-title` }>{name}</h3>
    </div>
  );
}

RecomendationRecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationRecipeCard;
