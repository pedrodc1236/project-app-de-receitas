import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile({ history }) {
  const HandleLocalStorage = () => {
    if (localStorage.getItem('user') === null) {
      return 'Email não fornecido :(';
    }
    return JSON.parse(localStorage.getItem('user')).email;
  };

  const onClickLogout = () => {
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <h1 data-testid="profile-email">{HandleLocalStorage()}</h1>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => onClickLogout() }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Profile;
