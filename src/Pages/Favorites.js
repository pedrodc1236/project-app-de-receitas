import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
// import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../services/Favorites.css';

function Favorites() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteRecipes);

  return (
    <>
      <Header title="Favorites" />
      <h2>Your Favorite Recipes</h2>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </div>
      { favoriteRecipes.map((favRecipe, index) => {
        const { image,
          name,
          type,
          id,
          category,
          nationality,
          alcoholicOrNot } = favRecipe;
        return (
          <Link to={ `/${type}s/${id}` } key={ index }>
            <div>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
                className="fav-recipe-img"
              />
              <div className="fav-recipe-info">
                <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { type === 'food'
                    ? `${nationality} - ${category}`
                    : `${alcoholicOrNot}`}
                </p>
              </div>
              <div className="fav-page-icons">
                <input
                  type="image"
                  src={ ShareIcon }
                  alt="Share Icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                <input
                  type="image"
                  src={ BlackHeartIcon }
                  alt="Black Heart Icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </div>
            </div>
          </Link>
        );
      }) }
    </>
  );
}

export default Favorites;
