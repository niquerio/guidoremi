import dispatcher from '../dispatcher';
import $ from 'jquery'
import * as TokenActions from './TokenActions'
import Cookies from 'js-cookie'

export function checkAnswer(q_id, choice){
  dispatcher.dispatch({type: 'FETCHING_ANSWER'});
  $.ajax({
    url: '/api/v1/questions/'+q_id+'/answer',
    type: 'PUT',
    dataType: 'json',
    data: { answer: {'user_answer': choice} },
    success: function(resp, status, request) { 
      TokenActions.updateCookie(request)
      dispatcher.dispatch({type: "RECEIVE_ANSWER",
        answer: resp
      })
    },
    headers: Cookies.getJSON('authHeaders'),
  });
}
export function clear(){
    dispatcher.dispatch({type: "CLEAR_ANSWER"});
}

