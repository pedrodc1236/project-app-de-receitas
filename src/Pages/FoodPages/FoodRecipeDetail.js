import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { fetchMealByIdAPI } from '../../services/requestsApi';

function FoodRecipeDetail({ match }) {
  const [recipe, setRecipe] = useState('');

  const { id } = match.params;

  useEffect(() => {
    const getMealById = async () => {
      const { meals } = await fetchMealByIdAPI(id);
      setRecipe(meals[0]);
    };
    getMealById();
  }, [id]);

  const { strMealThumb, strMeal, strCategory, strInstructions, strYouTube } = recipe;

  console.log(recipe);

  return (
    <>
      <header>
        <div>
          <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
        </div>

        <div>
          <h1 data-testid="recipe-title">{ strMeal }</h1>
          <h5 data-testid="recipe-category">{ strCategory}</h5>
          <input
            type="image"
            src={ ShareIcon }
            alt="Share Icon"
            data-testid="share-btn"
          />
          <input
            type="image"
            src={ WhiteHeartIcon }
            alt="White Heart Icon"
            data-testid="favorite-btn"
          />
        </div>
      </header>

      <section>
        <h1 data-testid="0-ingredient-name-and-measure">Ingredients</h1>
      </section>

      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ strInstructions }</p>
      </section>

      <section>
        <iframe
          src={ strYouTube }
          title="Recipe Video"
          width="300"
          height="200"
          data-testid="video"
        />
      </section>

      <section>
        <h3 data-testid="0-recomendation-card">RECOMENDATION CARD</h3>
      </section>

      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </>
  );
}

FoodRecipeDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodRecipeDetail;
