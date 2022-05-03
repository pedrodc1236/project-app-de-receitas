import React from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { cocktailFetchRandom } from '../services/requestsCocktailApi';

function ExploreDrinks({ history }) {
  const redirectForIngredientExplore = () => {
    history.push('/explore/drinks/ingredients');
  };

  const surprise = async () => {
    const api = await cocktailFetchRandom();
    const id = api[0].idDrink;
    history.push(`/drinks/${id}`);
  };

  return (
    <>
      <Header title="ExploreDrinks" />
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

ExploreDrinks.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
