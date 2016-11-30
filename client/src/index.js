import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Auth from 'j-toker'
import PubSub from 'pubsub-js'

import Layout from './components/Layout.js'
import Home from './pages/Home';
import Tree from './pages/Tree';
import SignIn from './pages/SignIn';
import Skills from './pages/Skills';

import UserStore from './stores/UserStore';
import './index.css';

Auth.configure({
  apiUrl: 'http://192.168.56.101:3001'
});



var firstValidate = false;
PubSub.subscribe('auth.validation.success',function(ev, user){
  if(!firstValidate){
    firstValidate = true;
    renderDom();
  }
});

PubSub.subscribe('auth.validation.error',function(ev, error){
  if(!firstValidate){
    firstValidate = true;
    renderDom();
  }
});

function requireAuth(nextState, replace){
  if(!UserStore.signedIn()){    
    replace({
      pathname: '/sign_in',
      state: {nextPathname: nextState.location.pathname }
    })
  };
}

function homeAuth(nextState, replace){
  if(UserStore.signedIn()){    
    replace({
      pathname: '/tree',
      state: {nextPathname: nextState.location.pathname }
    })
  };
}


function renderDom(){
  ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} onEnter={homeAuth}></IndexRoute>
          <Route path="/sign_in" name="sign_in" component={SignIn} onEnter={homeAuth} />
          <Route path="/skills/:skill" name="skills" component={Skills} onEnter={requireAuth}></Route>
          <Route path="/tree" name="tree" component={Tree} onEnter={requireAuth}></Route>
          
        </Route>
    </Router>,
    document.getElementById('root')
  );
}
