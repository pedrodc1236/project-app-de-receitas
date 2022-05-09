import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';

const HALF_SECOND = 500;

function Profile({ history }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, []);

  const HandleLocalStorage = () => {
    if (localStorage.getItem('user') === null) {
      return 'Email não fornecido :(';
    }
    return JSON.parse(localStorage.getItem('user')).email;
  };

  const onClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  if (isLoading) {
    return <Loading />;
  }
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
