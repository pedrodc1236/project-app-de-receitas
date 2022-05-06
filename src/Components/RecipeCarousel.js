import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RecomendationRecipeCard from './RecomendationRecipeCard';
import arrowIcon from '../images/arrowIcon.svg';
import { fetchCocktailApi } from '../services/requestsCocktailApi';
import { fetchMealApi } from '../services/requestsMealApi';

const MAX_RECOMENDATIONS_INDEX = 6;

function RecipeCarousel({ type }) {
  const [recomendations, setRecomendations] = useState();
  const carouselRef = useRef(null);

  useEffect(() => {
    const getRecomendations = async () => {
      if (type === 'Drink') {
        const { drinks } = await fetchCocktailApi();
        setRecomendations(drinks);
      } else {
        const { meals } = await fetchMealApi();
        setRecomendations(meals);
      }
    };
    getRecomendations();
  }, [type]);

  const handleScroll = (direction, ref) => {
    if (direction === 'right') {
      ref.current.scrollLeft += ref.current.offsetWidth;
    } else {
      ref.current.scrollLeft -= ref.current.offsetWidth;
    }
  };

  return (
    <section>
      <h3>Recommended</h3>
      <div className="carousel" ref={ carouselRef }>
        {recomendations?.filter((_, index) => index < MAX_RECOMENDATIONS_INDEX)
          .map((recomendation, index) => {
            const { strDrink, strDrinkThumb, idDrink } = recomendation;
            return (
              <RecomendationRecipeCard
                key={ index }
                name={ strDrink }
                thumb={ strDrinkThumb }
                id={ idDrink }
                index={ index }
                pageTitle="drinks"
              />
            );
          })}
      </div>
      <div className="carousel-buttons">
        <input
          type="image"
          src={ arrowIcon }
          alt="Scroll to left"
          onClick={ () => handleScroll('left', carouselRef) }
        />
        <input
          type="image"
          src={ arrowIcon }
          alt="Scroll to right"
          onClick={ () => handleScroll('right', carouselRef) }
        />
      </div>
    </section>
  );
}

RecipeCarousel.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeCarousel;
