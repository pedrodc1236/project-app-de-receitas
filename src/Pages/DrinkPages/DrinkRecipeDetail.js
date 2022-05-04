import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import RecomendationRecipeCard from '../../Components/RecomendationRecipeCard';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { fetchCocktailByIdAPI } from '../../services/requestsCocktailApi';
import { fetchMealApi } from '../../services/requestsMealApi';
import '../RecipeDetails.css';
import arrowIcon from '../../images/arrowIcon.svg';
import Snackbar from '../../Components/Snackbar';

const MAX_RECOMENDATIONS_INDEX = 6;
const THREE_SECONDS = 3000;

function DrinkRecipeDetail({ match }) {
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const { id } = match.params;
  const history = useHistory();
  const carouselRef = useRef(null);

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
    };
    const getMealRecomendations = async () => {
      const { meals } = await fetchMealApi();
      setRecomendations(meals);
    };
    getCocktailById();
    getMealRecomendations();
  }, [id]);

  const handleScroll = (direction) => {
    if (direction === 'right') {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    } else {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

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
      console.log('entrou no if');
      return false;
    }

    const inProgressRecipes = Object.keys(
      JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails,
    );

    return inProgressRecipes.some((inProgressRecipe) => inProgressRecipe === id);
  };

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipe;

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
              src={ WhiteHeartIcon }
              alt="White Heart Icon"
              data-testid="favorite-btn"
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
            onClick={ () => handleScroll('left') }
          />
          <input
            type="image"
            src={ arrowIcon }
            alt="Scroll to right"
            onClick={ () => handleScroll('right') }
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
