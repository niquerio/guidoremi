import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from './components/Layout.js'
import Home from './pages/Home';
import Tree from './pages/Tree';
import SignIn from './pages/SignIn';
import Skills from './pages/Skills';
import IntervalQuestion from './pages/IntervalQuestion';

import UserStore from './stores/UserStore';
import * as UserActions from './actions/UserActions'; 

import Axios from './utilities/Axios'
import './index.css';

window.Axios = Axios;
UserActions.validateToken().then(function(resp){
    window.MIDI.loadPlugin({
      onsuccess: function(){
        renderDom();
      }
    });
}).catch(function(){
    renderDom();
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
          <Route path="/skills/:skill/:qg" name="qg" component={IntervalQuestion} onEnter={requireAuth}></Route>
          <Route path="/tree" name="tree" component={Tree} onEnter={requireAuth}></Route>
          
        </Route>
    </Router>,
    document.getElementById('root')
  );
}
