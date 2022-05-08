import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import RecomendationRecipeCard from '../../Components/RecomendationRecipeCard';
import Snackbar from '../../Components/Snackbar';
import { checkFavoriteButton,
  removeEqualFavorite,
  favoriteLocalStorage } from '../../Functions/handleFavoriteButton';
import handleScroll from '../../Functions/handleScroll';
import arrowIcon from '../../images/arrowIcon.svg';
import ShareIcon from '../../images/shareIcon.svg';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { fetchCocktailByIdAPI } from '../../services/requestsCocktailApi';
import { fetchMealApi } from '../../services/requestsMealApi';
import '../RecipeDetails.css';
import Loading from '../../Components/Loading';

const MAX_RECOMENDATIONS_INDEX = 6;
const THREE_SECONDS = 3000;
const HALF_SECOND = 500;

function DrinkRecipeDetail({ match }) {
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = match.params;
  const history = useHistory();
  const carouselRef = useRef(null);

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipe;

  const getRecipeIngredients = (recipeData) => {
    const recipeArray = Object.entries(recipeData);

    const recipeIngredients = recipeArray
      .filter((element) => element[0].includes('strIngredient') && element[1]);
    setIngredients(recipeIngredients.length);
  };

  useEffect(() => {
    const getCocktailById = async () => {
      const { drinks } = await fetchCocktailByIdAPI(id);
      setRecipe(drinks[0]);
      getRecipeIngredients(drinks[0]);
      setIsFavorite(checkFavoriteButton(drinks[0], 'Drink'));
    };
    const getMealRecomendations = async () => {
      const { meals } = await fetchMealApi();
      setRecomendations(meals);
    };
    getCocktailById();
    getMealRecomendations();
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, [id]);

  const handleShareButton = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, THREE_SECONDS);
  };

  const handleStartRecipeButton = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      return false;
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    return doneRecipes.some((doneRecipe) => doneRecipe.id === id);
  };

  const changeButtonName = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      return false;
    }

    const inProgressRecipes = Object.keys(
      JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails,
    );

    return inProgressRecipes.some((inProgressRecipe) => inProgressRecipe === id);
  };

  const handleFavoriteButton = () => {
    if (isFavorite) {
      removeEqualFavorite(id);
    } else {
      favoriteLocalStorage(recipe, 'Drink');
    }
    setIsFavorite((prevState) => !prevState);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
        className="recipe-details-photo"
      />

      <header className="recipe-details-header">
        <h1 data-testid="recipe-title">{ strDrink }</h1>

        <div className="recipe-details-info">
          <h5 data-testid="recipe-category">{ strAlcoholic}</h5>

          <div className="recipe-details-icons">
            <input
              type="image"
              src={ ShareIcon }
              alt="Share Icon"
              data-testid="share-btn"
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
              src={ isFavorite ? BlackHeartIcon : WhiteHeartIcon }
              alt={ isFavorite ? 'Black Heart Icon' : 'White Heart Icon' }
              data-testid="favorite-btn"
              onClick={ handleFavoriteButton }
            />
          </div>
        </div>
      </header>

      <section className="recipe-details-ingredients">
        <h3>Ingredients</h3>
        <ul>
          {Array(ingredients).fill().map((_, index) => {
            const recipeMeasure = recipe[`strMeasure${index + 1}`];
            const recipeIngredient = recipe[`strIngredient${index + 1}`];

            return (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${recipeMeasure} ${recipeIngredient}`}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="recipe-details-instructions">
        <h3>Instructions</h3>
        <p data-testid="instructions">{ strInstructions }</p>
      </section>

      <section>
        <h3>Recommended</h3>
        <div className="carousel" ref={ carouselRef }>
          {recomendations?.filter((_, index) => index < MAX_RECOMENDATIONS_INDEX)
            .map((recomendation, index) => {
              const { strMeal, strMealThumb, idMeal } = recomendation;
              return (
                <RecomendationRecipeCard
                  key={ index }
                  name={ strMeal }
                  thumb={ strMealThumb }
                  id={ idMeal }
                  index={ index }
                  pageTitle="foods"
                />
              );
            })}
        </div>
        <div className="carousel-buttons">
          <input
            type="image"
            src={ arrowIcon }
            alt="Scroll to left"
            onClick={ () => handleScroll('left', carouselRef) }
          />
          <input
            type="image"
            src={ arrowIcon }
            alt="Scroll to right"
            onClick={ () => handleScroll('right', carouselRef) }
          />
        </div>
      </section>

      {handleStartRecipeButton() ? null : (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="recipe-details-button"
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          { changeButtonName() ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}
    </>
  );
}

DrinkRecipeDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkRecipeDetail;
