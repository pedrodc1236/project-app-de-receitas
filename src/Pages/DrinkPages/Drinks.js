import React, { useContext, useEffect, useState } from 'react';
import ButtonsFilter from '../../Components/ButtonsFilter';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import RecipeCard from '../../Components/RecipeCard';
import AppContext from '../../context/AppContext';
import { fetchCocktailApi,
  FilterByIngredientDrinks } from '../../services/requestsCocktailApi';
import Loading from '../../Components/Loading';

const MAX_RECIPES_INDEX = 12;
const HALF_SECOND = 500;

function Drinks() {
  const {
    drinksRecipes,
    setDrinksRecipes,
    accessDrinks,
    ingredientDrinks,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDrinksRecipes = async () => {
      const response = await fetchCocktailApi();
      setDrinksRecipes(response);
    };
    const getByFilterIngredientDrinks = async () => {
      const response = await FilterByIngredientDrinks(ingredientDrinks);
      setDrinksRecipes(response);
    };
    if (accessDrinks) {
      getByFilterIngredientDrinks();
    } else {
      getDrinksRecipes();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [setDrinksRecipes, accessDrinks, ingredientDrinks]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header title="Drinks" />
      <ButtonsFilter title="Drinks" />
      <div className="recipes-container">
        {drinksRecipes?.drinks.filter((_, index) => index < MAX_RECIPES_INDEX)
          .map((recipe, index) => {
            const { strDrink, strDrinkThumb, idDrink } = recipe;
            return (
              <RecipeCard
                pageTitle="drinks"
                key={ index }
                name={ strDrink }
                thumb={ strDrinkThumb }
                id={ idDrink }
                index={ index }
              />
            );
          })}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
