import React, { useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import AppContext from '../../context/AppContext';
import { fetchMealApi } from '../../services/requestsApi';
import RecipeCard from '../../Components/RecipeCard';
import ButtonsFilter from '../../Components/ButtonsFilter';

const MAX_INDEX = 12;

function Foods() {
  const { mealsRecipes, setMealsRecipes } = useContext(AppContext);

  useEffect(() => {
    const getMealsRecipes = async () => {
      const response = await fetchMealApi();
      setMealsRecipes(response);
    };
    getMealsRecipes();
  }, [setMealsRecipes]);

  return (
    <>
      <Header title="Foods" />
      <ButtonsFilter title="Foods" />
      {mealsRecipes?.meals.filter((recipe, index) => index < MAX_INDEX)
        .map((recipe, index) => {
          const { strMeal, strMealThumb, idMeal } = recipe;
          return (
            <RecipeCard
              pageTitle="foods"
              key={ index }
              name={ strMeal }
              thumb={ strMealThumb }
              id={ idMeal }
              index={ index }
            />
          );
        })}
      <Footer />
    </>
  );
}

export default Foods;
