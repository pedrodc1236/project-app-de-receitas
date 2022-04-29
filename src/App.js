import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Foods from './Pages/FoodPages/Foods';
import Drinks from './Pages/DrinkPages/Drinks';
import FoodRecipeDetail from './Pages/FoodPages/FoodRecipeDetail';
import DrinkRecipeDetail from './Pages/DrinkPages/DrinkRecipeDetail';
import FoodRecipeInProgress from './Pages/FoodPages/FoodRecipeInProgress';
import DrinkRecipeInProgress from './Pages/DrinkPages/DrinkRecipeInProgress';
import Explore from './Pages/Explore';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinks from './Pages/ExploreDrinks';
import FoodsIngredients from './Pages/FoodPages/FoodsIngredients';
import DrinksIngredients from './Pages/DrinkPages/DrinksIngredients';
import FoodsNationalities from './Pages/FoodPages/FoodsNationalities';
import DoneRecipes from './Pages/DoneRecipes';
import Profile from './Pages/Profile';
import Favorites from './Pages/Favorites';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods/:id" component={ FoodRecipeDetail } />
          <Route path="/drinks/:id" component={ DrinkRecipeDetail } />
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/foods/:id/in-progress" component={ FoodRecipeInProgress } />
          <Route path="/drinks/:id/in-progress" component={ DrinkRecipeInProgress } />
          <Route path="/explore" component={ Explore } />
          <Route path="/explore/foods" component={ ExploreFoods } />
          <Route path="/explore/drinks" component={ ExploreDrinks } />
          <Route path="/explore/foods/ingredients" component={ FoodsIngredients } />
          <Route path="/explore/drinks/ingredients" component={ DrinksIngredients } />
          <Route path="/explore/foods/nationalities" component={ FoodsNationalities } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ Favorites } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
