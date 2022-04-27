import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Foods from './Pages/Foods';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/profile" component={ Profile } />
        <Route path="/foods" component={ Foods } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
