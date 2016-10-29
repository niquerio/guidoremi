import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Auth from 'j-toker'

import Layout from './components/Layout.js'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Skills from './pages/Skills';
import './index.css';

Auth.configure({
  apiUrl: 'http://192.168.56.101:3001'
});

function requireAuth(nextState, replace){
  if(!Auth.user.signedIn){    
    replace({
      pathname: '/sign_in',
      state: {nextPathname: nextState.location.pathname }
    })
  };
}


ReactDOM.render(
  <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/sign_in" name="sign_in" component={SignIn} />
        <Route path="/skills/:skill" name="skills" component={Skills} onEnter={requireAuth}></Route>
        
      </Route>
  </Router>,
  document.getElementById('root')
);
