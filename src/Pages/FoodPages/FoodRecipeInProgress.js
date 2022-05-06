/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealByIdAPI } from '../../services/requestsMealApi';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FoodRecipeInProgress({ match }) {
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [mealsLS, setMealsLS] = useState([]);

  const { id } = match.params;

  const getRecipeIngredients = (recipeData) => {
    const recipeArray = Object.entries(recipeData);

    const recipeIngredients = recipeArray
      .filter((element) => element[0].includes('strIngredient') && element[1]);
    setIngredients(recipeIngredients.length);
  };

  const progressLocalStorage = () => {
    let recipeInProgress;
    if (localStorage.getItem('inProgressRecipes') === null) {
      recipeInProgress = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
    } else {
      const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const result = getLocalStorage.meals[id];
      setMealsLS(result || []);
    }
  };

  const getLocalStorage = () => {
    console.log(mealsLS);
  };

  useEffect(() => {
    getLocalStorage();
  }, [mealsLS]);

  useEffect(() => {
    progressLocalStorage();
  }, []);

  useEffect(() => {
    const getMealById = async () => {
      const { meals } = await fetchMealByIdAPI(id);
      setRecipe(meals[0]);
      getRecipeIngredients(meals[0]);
    };
    getMealById();
  }, [id]);

  const { strMealThumb, strMeal, strCategory, strInstructions } = recipe;

  const localStorageChecked = ({ target }, param) => {
    const localStorageMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const array2 = [...mealsLS, param];
    console.log(array2);
    setMealsLS((prevState) => [...prevState, param]);
    if (target.checked === true) {
      const objSave = {
        meals: {
          [id]: array2,
        },
      };
      objSave.meals = { ...localStorageMeals.meals, [id]: array2 };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objSave));
    }
    if (target.checked === false) {
      const array3 = array2.filter((el) => el !== param);
      const objSave = {
        meals: {
          [id]: array3,
        },
      };
      setMealsLS(array3);

      objSave.meals = { ...localStorageMeals.meals, [id]: array3 };

      localStorage.setItem('inProgressRecipes', JSON.stringify(objSave));
    }
  };

  return (
    <>
      <section>
        <div>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid="recipe-photo"
          />
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
      </section>

      <section>
        <h3>Ingredients</h3>
        <ul>
          {Array(ingredients).fill().map((_, index) => {
            const recipeMeasure = recipe[`strMeasure${index + 1}`];
            const recipeIngredient = recipe[`strIngredient${index + 1}`];
            return (
              <li
                key={ index }
                className="li-ingredient"
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  className="input-ingredient"
                  value={ `strMeasure${index + 1}` }
                  onChange={ (event) => localStorageChecked(event, Number(index + 1)) }
                  defaultChecked={ mealsLS.includes(index + 1) }
                />
                <span>{`${recipeMeasure} ${recipeIngredient}`}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ strInstructions }</p>
      </section>

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}

FoodRecipeInProgress.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodRecipeInProgress;
