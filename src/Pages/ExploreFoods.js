import React from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { mealFetchRandom } from '../services/requestsMealApi';

function ExploreFoods({ history }) {
  const redirectForIngredientExplore = () => {
    history.push('/explore/foods/ingredients');
  };

  const redirectForNationalityExplore = () => {
    history.push('/explore/foods/nationalities');
  };

  const surprise = async () => {
    const api = await mealFetchRandom();
    const id = api[0].idMeal;
    history.push(`/foods/${id}`);
  };

  return (
    <>
      <Header title="ExploreFoods" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ redirectForIngredientExplore }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ redirectForNationalityExplore }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ surprise }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

ExploreFoods.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoods;
