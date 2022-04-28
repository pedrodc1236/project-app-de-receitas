import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile({ history }) {
  const HandleLocalStorage = () => JSON.parse(localStorage.getItem('user')).email;
  const onClickLogout = () => {
    localStorage.setItem('mealsToken', JSON.stringify(''));
    localStorage.setItem('cocktailsToken', JSON.stringify(''));
    localStorage.setItem('user', JSON.stringify(''));
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
