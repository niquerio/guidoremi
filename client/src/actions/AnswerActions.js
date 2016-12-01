import dispatcher from '../dispatcher';
import $ from 'jquery'
import Auth from 'j-toker'

export function checkAnswer(q_id, choice){
  dispatcher.dispatch({type: 'FETCHING_ANSWER'});
  $.ajax({
    url: '/api/v1/questions/'+q_id+'/answer',
    type: 'PUT',
    dataType: 'json',
    data: { answer: {'user_answer': choice} },
    success: function(resp) { 
      dispatcher.dispatch({type: "RECEIVE_ANSWER",
        answer: resp
      })
    },
    headers: Auth.retrieveData('authHeaders')
  });
}
