import dispatcher from '../dispatcher';
import Axios from '../utilities/Axios';

export function getNewQuestion(qg){
  dispatcher.dispatch({type: 'FETCHING_QUESTION'});
  Axios.post('/api/v1/question_generators/'+qg)
    .then(function(resp){
      dispatcher.dispatch({type: "RECEIVE_QUESTION",
        question: resp.data
      })
    })
}

export function clear(){
    dispatcher.dispatch({type: "CLEAR_QUESTION"});
}

