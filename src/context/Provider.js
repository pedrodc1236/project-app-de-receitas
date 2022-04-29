import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState();
  const [drinksRecipes, setDrinksRecipes] = useState();
  const [arrayBtns, setArrayBtns] = useState([]);

  const contextValue = {
    mealsRecipes,
    setMealsRecipes,
    drinksRecipes,
    setDrinksRecipes,
    arrayBtns,
    setArrayBtns,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
