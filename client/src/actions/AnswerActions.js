import dispatcher from '../dispatcher';
import Axios from '../utilities/Axios';

export function checkAnswer(q_id, choice){
  var params = { answer: {'user_answer': choice} };

  dispatcher.dispatch({type: 'FETCHING_ANSWER'});

  Axios.put('/api/v1/questions/'+q_id+'/answer', params)
    .then(function(resp){
       dispatcher.dispatch({type: "RECEIVE_ANSWER",
         answer: resp.data.answer
       })
       dispatcher.dispatch({type: "UPDATE_SCORE",
         score: resp.data.score,
         skill_slug: resp.data.skill_slug,
         qg_slug: resp.data.qg_slug,
       })
       dispatcher.dispatch({ type: "UPDATE_LEAF",
         skill_score: resp.data.skill_score, 
         slug: resp.data.skill_slug,
       });
      
    });
}
export function clear(){
    dispatcher.dispatch({type: "CLEAR_ANSWER"});
}

