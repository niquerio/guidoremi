import dispatcher from '../dispatcher';
import $ from 'jquery'
import Auth from 'j-toker'

export function getSkills(){
  dispatcher.dispatch({type: 'FETCH_SKILLS'});
  $.ajax({
    url: '/api/v1/skills',
    type: 'GET',
    dataType: 'json',
    success: function(resp) { 
      dispatcher.dispatch({type: "RECEIVE_SKILLS",
        skills: resp
      })
    },
    headers: Auth.retrieveData('authHeaders')
  });
}
