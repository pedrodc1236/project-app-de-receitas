import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { cocktailFetchRandom } from '../services/requestsCocktailApi';
import Loading from '../Components/Loading';

const HALF_SECOND = 500;

function ExploreDrinks({ history }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, []);

  const redirectForIngredientExplore = () => {
    history.push('/explore/drinks/ingredients');
  };

  const surprise = async () => {
    const api = await cocktailFetchRandom();
    const id = api[0].idDrink;
    history.push(`/drinks/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header title="Explore Drinks" />
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
