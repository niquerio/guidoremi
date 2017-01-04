import {ReduceStore} from 'flux/utils';
import dispatcher from '../dispatcher';
import Immutable from 'immutable';

class AnswerStore extends ReduceStore{
  constructor(){
    super(dispatcher);
  }

  getInitialState(){
    return Immutable.Map();
  }

  reduce(state, action){
    switch(action.type){
      case "RECEIVE_ANSWER": {
        return Immutable.fromJS(action.answer)
      }
      case "CLEAR_ANSWER": {
        return state.clear();
      }
      default: {
        return state;
      }
    }
  }
}

const answerStore = new AnswerStore()
export default answerStore;
