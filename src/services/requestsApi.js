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
  console.log(data);
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
