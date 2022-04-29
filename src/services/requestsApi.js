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

export const fetchCooktailApi = async (radio, inputName) => {
  let request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  if (radio === 'Ingredient') {
    request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputName}`);
  }
  if (radio === 'Name') {
    request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputName}`);
  }
  if (radio === 'First letter') {
    request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputName}`);
  }
  const data = await request.json();
  return data;
};

export const mealCategoryRequest = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await request.json();
  return data.meals;
};

export const cookTailCategoryRequest = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await request.json();
  return data.drinks;
};

export const mealRequestForCategoryBtn = async (category) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await request.json();
  return data;
};

export const cookTailRequestForCategoryBtn = async (category) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await request.json();
  return data;
};
