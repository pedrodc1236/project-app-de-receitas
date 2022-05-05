export const foodFavoriteLocalStorage = (recipe) => {
  const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;

  let favoriteRecipes;
  if (localStorage.getItem('favoriteRecipes') === null) {
    favoriteRecipes = [];
  } else {
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  }
  const favoriteRecipe = {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  favoriteRecipes.push(favoriteRecipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

export const drinkFavoriteLocalStorage = (recipe) => {
  console.log(recipe);
  const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = recipe;

  let favoriteRecipes;
  if (localStorage.getItem('favoriteRecipes') === null) {
    favoriteRecipes = [];
  } else {
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  }
  const favoriteRecipe = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  favoriteRecipes.push(favoriteRecipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

export const checkFoodFavoriteButton = (recipe) => {
  const { idMeal } = recipe;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return favoriteRecipes?.some((favRecipe) => favRecipe.id === idMeal);
};

export const checkDrinkFavoriteButton = (recipe) => {
  const { idDrink } = recipe;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return favoriteRecipes?.some((favRecipe) => favRecipe.id === idDrink);
};
