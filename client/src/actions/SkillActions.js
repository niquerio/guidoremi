import dispatcher from '../dispatcher';
import $ from 'jquery'

export function getSkills(){
  dispatcher.dispatch({type: 'FETCH_SKILLS'});
  $.getJSON('./api/v1/skills').done(function(resp){
    dispatcher.dispatch({type: "RECEIVE_SKILLS",
      skills: resp
    })
  });
  
}
