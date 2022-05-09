import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { removeEqualIngredient,
  checkStepsCheckbox,
  inProgressLocalStorage } from '../Functions/handleInProgressCheckbox';
import Loading from './Loading';

const HALF_SECOND = 500;

function RecipeInProgress({ type }) {
  const { recipe } = useContext(AppContext);

  const [ingredients, setIngredients] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getIngredients = () => {
      const recipeArray = Object.entries(recipe);

      const recipeIngredients = recipeArray
        .filter((element) => element[0].includes('strIngredient') && element[1]);
      setIngredients(recipeIngredients.length);
    };

    const setArrayChecked = () => {
      if (localStorage.getItem('inProgressRecipes') !== null) {
        setIsChecked(checkStepsCheckbox(type, recipe[`id${type}`]));
      }
    };
    getIngredients();
    setArrayChecked();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [recipe, type]);

  const handleCheckbox = (pageType, id, index, event) => {
    const { checked } = event.target;

    if (!checked) {
      removeEqualIngredient(pageType, id, index);
    } else {
      inProgressLocalStorage(pageType, id, index);
    }
  };

  if (isChecked.length === 0 && isLoading) {
    return (
      <section>
        <h3>Ingredients</h3>
        <div>
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3>Ingredients</h3>
      <div className="in-progress-ingredients-container">
        {Array(ingredients).fill().map((_, index) => {
          const recipeMeasure = recipe[`strMeasure${index + 1}`];
          const recipeIngredient = recipe[`strIngredient${index + 1}`];
          const recipeId = recipe[`id${type}`];
          const stepIndex = index + 1;
          return (
            <label
              htmlFor={ `${index}-ingredient-step` }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                name={ `${index}-ingredient-step` }
                type="checkbox"
                className="input-ingredient"
                value={ recipeMeasure }
                onChange={
                  (event) => handleCheckbox(type, recipeId, stepIndex, event)
                }
                // defaultChecked={ isChecked.includes(index) }
                defaultChecked={ isChecked.includes(stepIndex) }
              />
              {`${recipeMeasure} ${recipeIngredient}`}
            </label>
          );
        })}
      </div>
    </section>
  );
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
