import PropTypes from 'prop-types';
import React, { useEffect, useState,
  useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { checkFavoriteButton,
  // removeEqualFavorite,
  // favoriteLocalStorage,
} from '../../Functions/handleFavoriteButton';
// import { fetchCocktailApi } from '../../services/requestsCocktailApi';
import { fetchMealByIdAPI } from '../../services/requestsMealApi';
import '../RecipeDetails.css';

import RecipeHeader from '../../Components/RecipeHeader';
import RecipeDetailsIngredients from '../../Components/RecipeDetailsIngredients';
import Loading from '../../Components/Loading';

import AppContext from '../../context/AppContext';
import RecipeInstructions from '../../Components/RecipeInstructions';
import RecipeCarousel from '../../Components/RecipeCarousel';

const HALF_SECOND = 500;

function FoodRecipeDetail({ match }) {
  const { recipe, setRecipe } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const { id } = match.params;
  const history = useHistory();

  useEffect(() => {
    const getMealById = async () => {
      const { meals } = await fetchMealByIdAPI(id);
      setRecipe(meals[0]);
      getRecipeIngredients(meals[0]);
      setIsFavorite(checkFavoriteButton(meals[0], 'Meal'));
    };
    // const getCocktailRecomendations = async () => {
    //   const { drinks } = await fetchCocktailApi();
    //   setRecomendations(drinks);
    // };
    getMealById();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [id, setRecipe]);

  const handleStartRecipeButton = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      return false;
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    return doneRecipes.some((doneRecipe) => doneRecipe.id === id);
  };

  const changeButtonName = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      return false;
    }

    const inProgressRecipes = Object.keys(
      JSON.parse(localStorage.getItem('inProgressRecipes')).meals,
    );

    return inProgressRecipes.some((inProgressRecipe) => inProgressRecipe === id);
  };

  // const handleFavoriteButton = () => {
  //   if (isFavorite) {
  //     removeEqualFavorite(id);
  //   } else {
  //     favoriteLocalStorage(recipe, 'Meal');
  //   }
  //   setIsFavorite((prevState) => !prevState);
  // };
  if (isLoading) {
    return <Loading />;
  }
  const { strMealThumb,
    strMeal,
    strYoutube } = recipe;

  const videoYouTube = strYoutube?.split('=')[1];

  return (
    <>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        className="recipe-details-photo"
      />

      <RecipeHeader type="Meal" />
      <RecipeDetailsIngredients />
      <RecipeInstructions />

      <iframe
        width="100%"
        height="280"
        data-testid="video"
        src={ `https://www.youtube.com/embed/${videoYouTube}` }
        title="Recipe YouTube video player"
        frameBorder="0"
        allowFullScreen
      />

      <RecipeCarousel type="Drink" />

      {handleStartRecipeButton() ? null : (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="recipe-details-button"
          onClick={ () => history.push(`/foods/${id}/in-progress`) }
        >
          { changeButtonName() ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}
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
