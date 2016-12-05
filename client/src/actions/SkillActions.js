import dispatcher from '../dispatcher';
import Axios from '../utilities/Axios';

export function getSkills(){
 // dispatcher.dispatch({type: 'FETCH_SKILLS'});
  Axios.get('/api/v1/skills').then(function(resp){
    dispatcher.dispatch({type: "RECEIVE_SKILLS",
      skills: resp.data
    })
  });
}

export function updateScore(skill_index,qg_index,score){
  dispatcher.dispatch({
    type: "UPDATE_SCORE",
    skill_index: skill_index,
    qg_index: qg_index,
    score: score,
  });
}
