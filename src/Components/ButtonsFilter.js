/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { mealCategoryRequest,
  cookTailCategoryRequest,
  mealRequestForCategoryBtn,
  cookTailRequestForCategoryBtn } from '../services/requestsApi';

function ButtonsFilter({ title }) {
  const {
    arrayBtns,
    setArrayBtns,
    setMealsRecipes,
    setDrinksRecipes,
  } = useContext(AppContext);

  const MAX_BTNS = 5;

  const apiPicker = async () => {
    if (title === 'Foods') {
      const apiReturn = await mealCategoryRequest();
      setArrayBtns(apiReturn);
    }
    if (title === 'Drinks') {
      const apiReturn = await cookTailCategoryRequest();
      setArrayBtns(apiReturn);
    }
  };

  useEffect(() => {
    apiPicker();
  }, []);

  const targetValueBtnCategory = async ({ target }) => {
    if (title === 'Foods') {
      const btnCategory = await mealRequestForCategoryBtn(target.value);
      setMealsRecipes(btnCategory);
    }

    if (title === 'Drinks') {
      console.log('oi');
      const btnCategory = await cookTailRequestForCategoryBtn(target.value);
      setDrinksRecipes(btnCategory);
    }
  };

  return (
    <div>
      {
        arrayBtns.map((el, index) => (
          index < MAX_BTNS
            && (
              <button
                key={ index }
                type="button"
                data-testid={ `${el.strCategory}-category-filter` }
                onClick={ targetValueBtnCategory }
                value={ el.strCategory }
              >
                { el.strCategory }
              </button>
            )
        ))
      }
    </div>
  );
}

ButtonsFilter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ButtonsFilter;
