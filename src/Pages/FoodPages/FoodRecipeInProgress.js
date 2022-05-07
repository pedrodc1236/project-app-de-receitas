/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState,
  useContext } from 'react';
import { fetchMealByIdAPI } from '../../services/requestsMealApi';
import '../RecipeDetails.css';
import RecipeHeader from '../../Components/RecipeHeader';
import Loading from '../../Components/Loading';
import AppContext from '../../context/AppContext';
import RecipeInstructions from '../../Components/RecipeInstructions';

const HALF_SECOND = 500;

function FoodRecipeInProgress({ match }) {
  const { recipe, setRecipe } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);
  const [mealsLS, setMealsLS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = match.params;

  const getRecipeIngredients = (recipeData) => {
    const recipeArray = Object.entries(recipeData);

    const recipeIngredients = recipeArray
      .filter((element) => element[0].includes('strIngredient') && element[1]);
    setIngredients(recipeIngredients.length);
  };

  /* const getLocalStorage = () => {
    console.log(mealsLS);
  };

  useEffect(() => {
    getLocalStorage();
  }, [mealsLS]); */

  useEffect(() => {
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
    progressLocalStorage();
  }, [id]);

  useEffect(() => {
    const getMealById = async () => {
      const { meals } = await fetchMealByIdAPI(id);
      setRecipe(meals[0]);
      getRecipeIngredients(meals[0]);
    };
    getMealById();
    // getRecipeIngredients(recipe);
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [id]);

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

FoodRecipeInProgress.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodRecipeInProgress;
