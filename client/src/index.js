import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Auth from 'j-toker'

import Layout from './components/Layout.js'
import Home from './pages/Home';
import Tree from './pages/Tree';
import './index.css';

Auth.configure({
  apiUrl: 'http://192.168.56.101:3001'
});

ReactDOM.render(
  <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="tree" name="tree" component={Tree}></Route>
      </Route>
  </Router>,
  document.getElementById('root')
);
