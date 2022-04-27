import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import FoodsRecipe from './Pages/FoodsRecipe';
import DrinksRecipe from './Pages/DrinksRecipe';
import FoodsProgess from './Pages/FoodsProgress';
import DrinksProgress from './Pages/DrinksProgress';
import Explore from './Pages/Explore';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinks from './Pages/ExploreDrinks';
import FoodsIngredients from './Pages/FoodsIngredients';
import DrinksIngredients from './Pages/DrinksIngredients';
import FoodsNationalities from './Pages/FoodsNationalities';
import DoneRecipes from './Pages/DoneRecipes';
import Favorites from './Pages/Favorites';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/explore" component={ Explore } />
          <Route path="/profile" component={ Profile } />
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks/:id" component={ FoodsRecipe } />
          <Route path="/drinks/:id" component={ DrinksRecipe } />
          <Route path="/drinks/:id/in-progress" component={ FoodsProgess } />
          <Route path="/drinks/:id/in-progress" component={ DrinksProgress } />
          <Route path="/explore" component={ Explore } />
          <Route path="/explore/foods" component={ ExploreFoods } />
          <Route path="/explore/drinks" component={ ExploreDrinks } />
          <Route path="/explore/foods/ingredients" component={ FoodsIngredients } />
          <Route path="/explore/drinks/ingredients" component={ DrinksIngredients } />
          <Route path="/explore/foods/nationalities" component={ FoodsNationalities } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ Favorites } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
