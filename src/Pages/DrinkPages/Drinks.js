import React, { useContext } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import AppContext from '../../context/AppContext';

function Drinks() {
  const {
    teste,
  } = useContext(AppContext);
  return (
    <>
      <h1>{ teste }</h1>
      <Header title="Drinks" />
      <Footer />
    </>
  );
}

export default Drinks;
