import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ShareIcon from '../images/shareIcon.svg';
import Snackbar from '../Components/Snackbar';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
// import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../services/Favorites.css';

const THREE_SECONDS = 3000;

function Favorites() {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteRecipes);

  if (favoriteRecipes === null) {
    return (
      <>
        <Header title="Favorite Recipes" />
        <h4>Você ainda não favoritou nenhuma receita</h4>
      </>

    );
  }

  return (
    <>
      <Header title="Favorite Recipes" />
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

        const handleShareButton = () => {
          navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
          setShowSnackbar(true);
          setTimeout(() => {
            setShowSnackbar(false);
          }, THREE_SECONDS);
        };
        return (
          <div key={ index }>
            <Link to={ `/${type}s/${id}` }>
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
              </div>
            </Link>
            <div className="fav-page-icons">
              <input
                type="image"
                src={ ShareIcon }
                alt="Share Icon"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ handleShareButton }
              />
              <Snackbar
                open={ showSnackbar }
                onClose={ () => setShowSnackbar(false) }
              >
                Link copied!
              </Snackbar>
              <input
                type="image"
                src={ BlackHeartIcon }
                alt="Black Heart Icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </div>
          </div>

        );
      }) }
    </>
  );
}

export default Favorites;
