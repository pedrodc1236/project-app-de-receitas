import React, { useContext, useEffect } from 'react';
import ButtonsFilter from '../../Components/ButtonsFilter';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import RecipeCard from '../../Components/RecipeCard';
import AppContext from '../../context/AppContext';
import { fetchCocktailApi } from '../../services/requestsCocktailApi';

const MAX_RECIPES_INDEX = 12;

function Drinks() {
  const { drinksRecipes, setDrinksRecipes } = useContext(AppContext);

  useEffect(() => {
    const getDrinksRecipes = async () => {
      const response = await fetchCocktailApi();
      setDrinksRecipes(response);
    };
    getDrinksRecipes();
  }, [setDrinksRecipes]);

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
