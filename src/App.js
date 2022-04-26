import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Food from './Pages/Food';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/food" component={ Food } />
        <Route exact path="/drinks" component={ Header } />
        <Route exact path="/explore" component={ Header } />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
