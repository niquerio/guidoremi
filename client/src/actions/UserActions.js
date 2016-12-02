import dispatcher from '../dispatcher';
import * as TokenActions from './TokenActions';
import $ from 'jquery'
import Cookies from 'js-cookie';

export function validateToken(){
  dispatcher.dispatch({type: 'VALIDATE_TOKEN'});
  var promise = $.ajax({
    url: '/auth/validate_token',
    type: 'GET',
    dataType: 'json',
    success: function(resp, status, request) { 
      TokenActions.updateCookie(request)
      dispatcher.dispatch({type: "RECEIVE_USER",
        user: resp.data
      })
    },
    headers: Cookies.getJSON('authHeaders')
  });
  return promise;
}

export function emailSignIn(login){
  dispatcher.dispatch({type: 'SIGNING_IN_USER'});
  var promise = $.ajax({
    url: '/auth/sign_in',
    type: 'POST',
    dataType: 'json',
    data: login,
    success: function(resp, status, request) { 
      TokenActions.updateCookie(request)
      dispatcher.dispatch({type: "RECEIVE_USER",
        user: resp.data
      })
    },
  });
  return promise
}

export function signOutUser(){
  var promise = $.ajax({
    url: '/auth/sign_out',
    type: 'DELETE',
    dataType: 'json',
    success: function(resp, status, request) { 
      TokenActions.updateCookie(request)
      dispatcher.dispatch({type: "SIGN_OUT_USER" })
    },
    headers: Cookies.getJSON('authHeaders')
  });
  return promise
}
