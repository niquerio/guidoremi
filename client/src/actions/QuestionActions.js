import dispatcher from '../dispatcher';
import $ from 'jquery'
import * as TokenActions from './TokenActions'
//import TokenStore from '../stores/TokenStore'
import Cookies from 'js-cookie'

export function getNewQuestion(qg){
  dispatcher.dispatch({type: 'FETCHING_QUESTION'});
  $.ajax({
    url: '/api/v1/question_generators/'+qg,
    type: 'POST',
    dataType: 'json',
    success: function(resp, status, request) { 
      TokenActions.updateCookie(request);
      dispatcher.dispatch({type: "RECEIVE_QUESTION",
        question: resp
      })
    },
    headers: Cookies.getJSON('authHeaders'),
  });
}

export function clear(){
    dispatcher.dispatch({type: "CLEAR_QUESTION"});
}

