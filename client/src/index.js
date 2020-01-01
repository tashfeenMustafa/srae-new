import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import SignIn from './views/SignIn';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path='/sign-in' component={SignIn} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
