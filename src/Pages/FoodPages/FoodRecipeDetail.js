import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecomendationRecipeCard from '../../Components/RecomendationRecipeCard';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { fetchCocktailApi } from '../../services/requestsCocktailApi';
import { fetchMealByIdAPI } from '../../services/requestsMealApi';

const MAX_RECOMENDATIONS_INDEX = 6;

function FoodRecipeDetail({ match, history }) {
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState();

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
    const getCocktailRecomendations = async () => {
      const { drinks } = await fetchCocktailApi();
      setRecomendations(drinks);
    };
    getMealById();
    getCocktailRecomendations();
  }, [id]);

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipe;

  const videoYouTube = strYoutube?.split('=')[1];

  const onRedirectRecipesProgress = () => {
    history.push(`/foods/${id}/in-progress`);
  };

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
          width="300"
          height="200"
          data-testid="video"
          src={ `https://www.youtube.com/embed/${videoYouTube}` }
          title="Recipe YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      </section>

      <section>
        <h3>Recommended</h3>
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
              />
            );
          })}
      </section>

      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ onRedirectRecipesProgress }
      >
        Start Recipe
      </button>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FoodRecipeDetail;
