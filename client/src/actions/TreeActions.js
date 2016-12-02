import dispatcher from '../dispatcher';
import $ from 'jquery'
import * as TokenActions from './TokenActions'
import Cookies from 'js-cookie'

export function getTree(){
  $.ajax({
    url: '/api/v1/tree',
    type: 'GET',
    dataType: 'json',
    success: function(resp, status, request) { 
      TokenActions.updateCookie(request)
      dispatcher.dispatch({type: "RECEIVE_TREE",
        tree: resp
      })
    },
    headers: Cookies.getJSON('authHeaders')
  });
  
}
