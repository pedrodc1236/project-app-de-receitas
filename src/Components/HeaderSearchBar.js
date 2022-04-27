import React, { useState } from 'react';
// import fetchMealApi from '../services/requestsApi';

function HeaderSearchBar() {
  const [inputName, setInputName] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeRadioBtn = ({ target }) => {
    setSelectedRadio(target.value);
    setIsDisabled(false);
  };

  const handleSearchInput = ({ target }) => {
    setInputName(target.value);
  };

  const validation = async () => {
    if (selectedRadio === 'First letter' && inputName.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  return (
    <form>
      <input
        type="search"
        data-testid="search-input"
        value={ inputName }
        onChange={ handleSearchInput }
      />

      <label htmlFor="ingredient">
        <input
          type="radio"
          name="searchRadio"
          id="ingredient"
          value="Ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleChangeRadioBtn }
        />
        Ingredient
      </label>

      <label htmlFor="name">
        <input
          type="radio"
          name="searchRadio"
          id="name"
          value="Name"
          data-testid="name-search-radio"
          onChange={ handleChangeRadioBtn }
        />
        Name
      </label>

      <label htmlFor="firstLetter">
        <input
          type="radio"
          name="searchRadio"
          id="firstLetter"
          value="First letter"
          data-testid="first-letter-search-radio"
          onChange={ handleChangeRadioBtn }
        />
        First letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ validation }
        disabled={ isDisabled }
      >
        Search
      </button>
    </form>
  );
}

export default HeaderSearchBar;
