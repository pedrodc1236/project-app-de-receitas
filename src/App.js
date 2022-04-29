import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import DoneRecipes from './Pages/DoneRecipes';
import DrinkRecipeDetail from './Pages/DrinkPages/DrinkRecipeDetail';
import DrinkRecipeInProgress from './Pages/DrinkPages/DrinkRecipeInProgress';
import Drinks from './Pages/DrinkPages/Drinks';
import DrinksIngredients from './Pages/DrinkPages/DrinksIngredients';
import Explore from './Pages/Explore';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExploreFoods from './Pages/ExploreFoods';
import Favorites from './Pages/Favorites';
import FoodRecipeDetail from './Pages/FoodPages/FoodRecipeDetail';
import FoodRecipeInProgress from './Pages/FoodPages/FoodRecipeInProgress';
import Foods from './Pages/FoodPages/Foods';
import FoodsIngredients from './Pages/FoodPages/FoodsIngredients';
import FoodsNationalities from './Pages/FoodPages/FoodsNationalities';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods/:id/in-progress" component={ FoodRecipeInProgress } />
          <Route path="/foods/:id" component={ FoodRecipeDetail } />
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks/:id/in-progress" component={ DrinkRecipeInProgress } />
          <Route path="/drinks/:id" component={ DrinkRecipeDetail } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/explore/foods/ingredients" component={ FoodsIngredients } />
          <Route path="/explore/foods/nationalities" component={ FoodsNationalities } />
          <Route path="/explore/foods" component={ ExploreFoods } />
          <Route path="/explore/drinks/ingredients" component={ DrinksIngredients } />
          <Route path="/explore/drinks" component={ ExploreDrinks } />
          <Route path="/explore" component={ Explore } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ Favorites } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
