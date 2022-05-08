import React, { useContext, useEffect, useState } from 'react';
import ButtonsFilter from '../../Components/ButtonsFilter';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import RecipeCard from '../../Components/RecipeCard';
import AppContext from '../../context/AppContext';
import { fetchMealApi, filterByIngredient } from '../../services/requestsMealApi';
import Loading from '../../Components/Loading';

const MAX_RECIPES_INDEX = 12;
const HALF_SECOND = 500;

function Foods() {
  const {
    mealsRecipes,
    setMealsRecipes,
    accessFoods,
    ingredientFoods,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

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
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [setMealsRecipes, accessFoods, ingredientFoods]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header title="Foods" />
      <ButtonsFilter title="Foods" />
      <div className="recipes-container">
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
      </div>
      <Footer />
    </>
  );
}

export default Foods;
