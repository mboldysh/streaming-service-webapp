import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import About from '../containers/About';
import Login from '../containers/Login';
import PrivateRoute from './PrivateRoute';

export default () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);
