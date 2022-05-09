import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../Components/Loading';
import RecipeHeader from '../../Components/RecipeHeader';
import RecipeInProgress from '../../Components/RecipeInProgress';
import RecipeInstructions from '../../Components/RecipeInstructions';
import AppContext from '../../context/AppContext';
import { fetchCocktailByIdAPI } from '../../services/requestsCocktailApi';

const HALF_SECOND = 500;

function DrinkRecipeInProgress({ match }) {
  const { recipe, setRecipe } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = match.params;

  useEffect(() => {
    const getCocktailById = async () => {
      const { drinks } = await fetchCocktailByIdAPI(id);
      setRecipe(drinks[0]);
    };
    getCocktailById();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [id, setRecipe]);

  if (isLoading) {
    return <Loading />;
  }

  const { strDrinkThumb, strDrink } = recipe;
  return (
    <>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />

      <RecipeHeader type="Drink" />
      <RecipeInProgress type="Drink" />
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

DrinkRecipeInProgress.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkRecipeInProgress;
