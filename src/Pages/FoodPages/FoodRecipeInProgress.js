import PropTypes from 'prop-types';
import React, { useEffect, useState,
  useContext } from 'react';
import { fetchMealByIdAPI } from '../../services/requestsMealApi';
import '../RecipeDetails.css';
import RecipeHeader from '../../Components/RecipeHeader';
import Loading from '../../Components/Loading';
import AppContext from '../../context/AppContext';
import RecipeInstructions from '../../Components/RecipeInstructions';
import RecipeInProgress from '../../Components/RecipeInProgress';

const HALF_SECOND = 500;

function FoodRecipeInProgressTest({ match }) {
  const { recipe, setRecipe } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = match.params;

  useEffect(() => {
    const getMealById = async () => {
      const { meals } = await fetchMealByIdAPI(id);
      setRecipe(meals[0]);
    };
    getMealById();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [id, setRecipe]);

  if (isLoading) {
    return <Loading />;
  }

  const { strMealThumb, strMeal } = recipe;

  return (
    <>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />

      <RecipeHeader type="Meal" />
      <RecipeInProgress type="Meal" />
      <RecipeInstructions />

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}

FoodRecipeInProgressTest.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodRecipeInProgressTest;
