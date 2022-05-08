import React, { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { mealIngredientsApi } from '../../services/requestsMealApi';
import AppContext from '../../context/AppContext';
import Loading from '../../Components/Loading';

const HALF_SECOND = 500;
const MAX_LENGTH = 12;

function FoodsIngredients({ history }) {
  const {
    arrayIngredientsFoods,
    setArrayIngredientsFoods,
    setAccessFoods,
    setIngredientFoods,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiRequest = async () => {
      const apiIngredientFoods = await mealIngredientsApi();
      setArrayIngredientsFoods(apiIngredientFoods);
    };
    apiRequest();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [setArrayIngredientsFoods]);

  const redirectFromFoods = (param) => {
    setIngredientFoods(param);
    setAccessFoods(true);
    history.push('/foods');
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header title="Explore Ingredients" />
      { arrayIngredientsFoods.map((el, index) => (
        index < MAX_LENGTH
        && (
          <button
            type="button"
            className="btn-ingredient"
            key={ el.strIngredient }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => redirectFromFoods(el.strIngredient) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
              alt={ el.strIngredient }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { el.strIngredient }
            </p>
          </button>
        )
      ))}
      <Footer />
    </>
  );
}

FoodsIngredients.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default FoodsIngredients;
