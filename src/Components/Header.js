import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ title }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const history = useHistory();

  const profileRedirect = () => {
    history.push('/profile');
  };

  return (
    <header>
      <input
        type="image"
        alt="Profile Icon"
        data-testid="profile-top-btn"
        src="../images/profileIcon.svg"
        onClick={ profileRedirect }
      />

      <h1 data-testid="page-title">{ title }</h1>

      <input
        type="image"
        alt="Search Icon"
        data-testid="search-top-btn"
        src="../images/searchIcon.svg"
        onClick={ () => setShowSearchInput(!showSearchInput) }
      />

      { showSearchInput
        ? <input type="search" data-testid="search-input" />
        : null }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
