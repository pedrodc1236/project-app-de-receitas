import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';

const HALF_SECOND = 500;

function DrinkRecipeInProgress() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, HALF_SECOND);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <h2>Tela de Drink In Progress</h2>
  );
}

export default DrinkRecipeInProgress;
