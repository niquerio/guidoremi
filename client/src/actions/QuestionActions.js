import dispatcher from '../dispatcher';
import $ from 'jquery'
import Auth from 'j-toker'

export function getNewQuestion(qg){
  dispatcher.dispatch({type: 'FETCHING_QUESTION'});
  $.ajax({
    url: '/api/v1/question_generators/'+qg,
    type: 'POST',
    dataType: 'json',
    success: function(resp) { 
      dispatcher.dispatch({type: "RECEIVE_QUESTION",
        question: resp
      })
    },
    headers: Auth.retrieveData('authHeaders')
  });
}
