import dispatcher from '../dispatcher';
import $ from 'jquery'
import * as TokenActions from './TokenActions'
import Cookies from 'js-cookie'

export function getSkills(){
 // dispatcher.dispatch({type: 'FETCH_SKILLS'});
  $.ajax({
    url: '/api/v1/skills',
    type: 'GET',
    dataType: 'json',
    success: function(resp, status, request) { 
      TokenActions.updateCookie(request)
      dispatcher.dispatch({type: "RECEIVE_SKILLS",
        skills: resp
      })
    },
    headers: Cookies.getJSON('authHeaders')
  });
}
