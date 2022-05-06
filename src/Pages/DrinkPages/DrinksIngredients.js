import React, { useContext, useEffect } from 'react';
import Proptypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { cocktailIngredientList } from '../../services/requestsCocktailApi';
import AppContext from '../../context/AppContext';

function DrinksIngredients({ history }) {
  const {
    arrayIngredientsDrinks,
    setArrayIngredientsDrinks,
    setAccessDrinks,
    setIngredientDrinks,
  } = useContext(AppContext);

  const MAX_LENGTH = 12;

  useEffect(() => {
    const apiRequest = async () => {
      const apiIngredientDrinks = await cocktailIngredientList();
      setArrayIngredientsDrinks(apiIngredientDrinks);
    };
    apiRequest();
  }, [setArrayIngredientsDrinks]);

  const redirectFromDrinks = (param) => {
    setIngredientDrinks(param);
    setAccessDrinks(true);
    history.push('/drinks');
  };

  return (
    <>
      <Header title="Explore Ingredients" />
      { arrayIngredientsDrinks.map((el, index) => (
        index < MAX_LENGTH
        && (
          <button
            type="button"
            className="btn-ingredient-drinks"
            key={ el.strIngredient1 }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => redirectFromDrinks(el.strIngredient1) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `
              https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
              alt={ el.strIngredient1 }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { el.strIngredient1 }
            </p>
          </button>
        )
      ))}
      <Footer />
    </>
  );
}

DrinksIngredients.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default DrinksIngredients;
