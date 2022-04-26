import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/food" component={ Login } />
        <Route exact path="/drinks" component={ Login } />
        <Route exact path="/explore" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
