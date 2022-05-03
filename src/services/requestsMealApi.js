export const fetchMealApi = async (radio, inputName) => {
  let request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');

  if (radio === 'Ingredient') {
    request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputName}`);
  }
  if (radio === 'Name') {
    request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputName}`);
  }
  if (radio === 'First letter') {
    request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputName}`);
  }
  const data = await request.json();
  return data;
};

export const mealCategoryRequest = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await request.json();
  return data.meals;
};

export const mealRequestForCategoryBtn = async (category) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await request.json();
  return data;
};

export const fetchMealByIdAPI = async (id) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await request.json();
  return data;
};

export const mealFetchRandom = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await request.json();
  return data.meals;
};

export const mealIngredientsApi = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await request.json();
  return data.meals;
};

export const filterByIngredient = async (ingredient) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await request.json();
  return data;
};
