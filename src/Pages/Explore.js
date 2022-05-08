import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';

const HALF_SECOND = 500;

function Explore({ history }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, []);

  const redirectForFoodsExplore = () => {
    history.push('/explore/foods');
  };

  const redirectForDrinksExplore = () => {
    history.push('/explore/drinks');
  };

  if (isLoading) {
    return <Loading />;
  }
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
