import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { fetchMealByIdAPI } from '../../services/requestsApi';

function FoodRecipeDetail({ match }) {
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const { id } = match.params;

  const getRecipeIngredients = (recipeData) => {
    const recipeArray = Object.entries(recipeData);

    const recipeIngredients = recipeArray
      .filter((element) => element[0].includes('strIngredient') && element[1]);
    setIngredients(recipeIngredients.length);
  };

  useEffect(() => {
    const getMealById = async () => {
      const { meals } = await fetchMealByIdAPI(id);
      setRecipe(meals[0]);
      getRecipeIngredients(meals[0]);
    };
    getMealById();
  }, [id]);

  const { strMealThumb, strMeal, strCategory, strInstructions, strYouTube } = recipe;

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
        <h3>Ingredients</h3>
        <ul>
          {Array(ingredients).fill().map((_, index) => {
            const recipeMeasure = recipe[`strMeasure${index + 1}`];
            const recipeIngredient = recipe[`strIngredient${index + 1}`];

            return (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${recipeMeasure} ${recipeIngredient}`}
              </li>
            );
          })}
        </ul>
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
