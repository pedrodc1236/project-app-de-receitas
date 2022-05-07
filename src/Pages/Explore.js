import React from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Explore({ history }) {
  const redirectForFoodsExplore = () => {
    history.push('/explore/foods');
  };

  const redirectForDrinksExplore = () => {
    history.push('/explore/drinks');
  };

  return (
    <>
      <Header title="Explore" />
      <div>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ redirectForFoodsExplore }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ redirectForDrinksExplore }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default Explore;
