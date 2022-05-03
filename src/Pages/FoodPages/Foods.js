import React, { useContext, useEffect } from 'react';
import ButtonsFilter from '../../Components/ButtonsFilter';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import RecipeCard from '../../Components/RecipeCard';
import AppContext from '../../context/AppContext';
import { fetchMealApi, filterByIngredient } from '../../services/requestsMealApi';

const MAX_RECIPES_INDEX = 12;

function Foods() {
  const {
    mealsRecipes,
    setMealsRecipes,
    accessFoods,
    ingredientFoods,
  } = useContext(AppContext);

  useEffect(() => {
    const getMealsRecipes = async () => {
      const response = await fetchMealApi();
      setMealsRecipes(response);
    };
    const getByFilterIngredient = async () => {
      const response = await filterByIngredient(ingredientFoods);
      setMealsRecipes(response);
    };
    if (accessFoods) {
      getByFilterIngredient();
    } else {
      getMealsRecipes();
    }
  }, [setMealsRecipes, accessFoods, ingredientFoods]);

  return (
    <>
      <Header title="Foods" />
      <ButtonsFilter title="Foods" />
      {mealsRecipes?.meals.filter((_, index) => index < MAX_RECIPES_INDEX)
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
